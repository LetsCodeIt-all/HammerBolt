import { createContext, useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

// 1. Create the context
export const MyContext = createContext();

// 2. Create the provider
export const MyProvider = ({ children }) => {
  const [ProductsByCategory, setProductsByCategory] = useState([]);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [cart, setCart] = useState(() => {
    if (user) {
      return user?.Cart?.products;
    }
  }); // Changed to null to indicate loading/no cart initially
  const [token, setToken] = useState(null);
  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      console.log(data, "getting from prisma"); // ✅ Set the actual user data
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.clear();

      getUser();
    }
  }, [token]);

  useEffect(() => {
    if (user && Array.isArray(cart)) {
      setUser((prev) => ({
        ...prev,
        Cart: {
          ...prev.Cart,
          products: [...cart],
        },
      }));
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          Cart: { ...user.Cart, products: [...cart] },
        })
      );
    }
    if (user) postCartitem(cart);
  }, [cart]);
  async function postCartitem(Cart) {
    let data = {
      id: await user?.Cart?.id,
      userId: await user?.Cart?.userId,
      Products: Cart,
    };
    let res = await fetch("http://localhost:5000/auth/cartItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let resdata = await res.json();
  }

  // console.log(user?.Cart);
  const addToCart = (Product) => {
    console.log(Product);
    if (!user) return alert("Login first to use a cart!");

    setCart((prevCart) => {
      let existingCart = prevCart?.find((p) => {
        return p?.meta?.barcode == Product?.meta?.barcode;
      });
      console.log(existingCart, "existingCart");

      if (existingCart) {
        console.log(existingCart, "existingCart");
        return prevCart.map((p) => {
          return p.meta.barcode == Product.meta.barcode
            ? { ...p, quantity: (p.quantity || 0) + 1 }
            : p;
        });
      } else {
        return [...prevCart, Product];
      }
    });
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    if (!user) return alert("Login first!");

    setCart(cart.filter((product) => product?.meta?.barcode != productId));
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
        setToken,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
