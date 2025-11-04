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
  const [cart, setCart] = useState(null); // Changed to null to indicate loading/no cart initially
  const [token, setToken] = useState(null);

  const getUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res, "from get user");
      if (!res.ok) throw new Error("Failed to fetch user");

      const data = await res.json();
      setUser(data); // ✅ Set the actual user data
      localStorage.setItem("user", JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setUser(null); // optional: clear user on error
    }
  };

  useEffect(() => {
    if (token) getUser();

    // const { data: listener } = supabase.auth.onAuthStateChange(
    //   (_event, session) => {
    //     // setUser(session?.user || null);
    //   }
    // );
    // return () => {
    //   // listener.subscription.unsubscribe();
    // };
  }, [token]);

  // Fetch cart when user changes
  useEffect(() => {
    if (!user) {
      setCart([]);
      return;
    }
    fetch(`http://localhost:5000/auth/cart/${user.id}`)
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 404) {
            console.log("No cart found, using empty cart");
            return { products: [] }; // fallback
          }
          const error = await res.json();
          throw new Error(error.error || "Failed to fetch cart");
        }
        return res.json();
      })
      .then((data) => setCart(data.products || []))
      .catch((err) => {
        console.error("Cart fetch failed:", err);
        setCart([]);
      });
  }, [user]);

  const addToCart = async (product) => {
    if (!user) return alert("Login first to use a cart!"); // Still requires a logged-in user to have a userId

    try {
      // ⚠️ UNSECURED: Sending userId in the body for the POST request
      const response = await fetch("http://localhost:5000/auth/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, product }), // Send both userId and product
      });

      if (!response.ok) throw new Error("Failed to add product to cart");

      const updatedCart = await response.json();

      // Update local state (optional, can refetch cart instead)
      // The backend returns the full cart, assuming you want the product array:
      if (updatedCart && updatedCart.products) {
        setCart(updatedCart.products);
      }
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    if (!user) return alert("Login first!");

    try {
      // ⚠️ UNSECURED: Include userId in the URL for the DELETE request
      const response = await fetch(
        `http://localhost:5000/auth/cart/${user.id}/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) throw new Error("Failed to remove product from cart");

      const updatedCartData = await response.json();

      // Update local state with the products array from the backend's response
      if (updatedCartData.cart && updatedCartData.cart.products) {
        setCart(updatedCartData.cart.products);
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
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
