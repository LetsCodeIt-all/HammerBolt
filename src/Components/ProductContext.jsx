import { createContext, useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

// 1. Create the context
export const MyContext = createContext();

// 2. Create the provider
export const MyProvider = ({ children }) => {
  const [ProductsByCategory, setProductsByCategory] = useState([]); // Start with empty array
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };
  useEffect(() => {
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/auth/cart/${user.id}`)
        .then((res) => res.json())
        .then((data) => setCart(data));
    } else {
      setCart([]);
    }
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return alert("Login first!");
    const res = await fetch("http://localhost:5000/auth/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        productId: product.id,
        product: product,
      }),
    });

    const newItem = await res.json();

    const existingProduct = cart.find((item) => item.productId === product.id);

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.productId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart((prev) => [...prev, newItem]);
    }
  };

  // Remove from cart
  const removeFromCart = async (id) => {
    await fetch(`http://localhost:5000/cart/${id}`, { method: "DELETE" });
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MyContext.Provider
      value={{
        ProductsByCategory,
        setProductsByCategory,
        cart,
        addToCart,
        removeFromCart,
        setCart,
        user,
        setUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
