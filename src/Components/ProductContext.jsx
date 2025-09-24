import { createContext, useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";

// 1. Create the context
export const MyContext = createContext();

// 2. Create the provider
export const MyProvider = ({ children }) => {
  const [value, setValue] = useState([]); // Start with empty array
  const [user, setUser] = useState(null);
  const [Cart, setCart] = useState(() => {
    const StoredCart = localStorage.getItem("Cart");
    return StoredCart ? JSON.parse(StoredCart) : [];
  });
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(Cart));
    getUser();
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, [Cart]);
  return (
    <MyContext.Provider
      value={{ value, setValue, Cart, setCart, user, setUser }}
    >
      {children}
    </MyContext.Provider>
  );
};
