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
      return user.Cart.products;
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
      setUser(data); // ✅ Set the actual user data
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

  // fetch(`http://localhost:5000/auth/cart/${user.id}`)
  // .then(async (res) => {
  // if (!res.ok) {
  //     if (res.status === 404) {
  //       console.log("No cart found, using empty cart");
  //       return { products: [] }; // fallback
  //     }
  //     const error = await res.json();
  //     throw new Error(error.error || "Failed to fetch cart");
  //   }
  //   return res.json();
  // })
  // .then((data) =>
  // )
  // .catch((err) => {
  //   console.error("Cart fetch failed:", err);
  //   setCart([]);
  // });
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
  }, [cart]);

  const addToCart = async (Product) => {
    console.log(Product);
    if (!user) return alert("Login first to use a cart!");
    // setCart([...cart, Product]);

    setCart([
      ...cart.map((product) => {
        return product.meta.barcode != Product.meta.barcode;
      }),
      (Product.quantity = parseInt(Product.quantity) + 1),
    ]);
  };

  // Remove from cart
  const removeFromCart = async (productId) => {
    if (!user) return alert("Login first!");
    // try {
    //   // ⚠️ UNSECURED: Include userId in the URL for the DELETE request
    //   const response = await fetch(
    //     `http://localhost:5000/auth/cart/${user.id}/${productId}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );

    //   if (!response.ok) throw new Error("Failed to remove product from cart");

    //   const updatedCartData = await response.json();

    //   // Update local state with the products array from the backend's response
    //   if (updatedCartData.cart && updatedCartData.cart.products) {
    //     setCart(updatedCartData.cart.products);
    //   }
    // } catch (error) {
    //   console.error("Remove from cart error:", error);
    // }
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
