import { createContext, useState, useEffect } from "react";

// 1. Create the context
export const MyContext = createContext();

// 2. Create the provider
export const MyProvider = ({ children }) => {
  const [value, setValue] = useState([]); // Start with empty array
  // const Cart = useRef([]);
  const [Cart, setCart] = useState(() => {
    const StoredCart = localStorage.getItem("Cart");
    return StoredCart ? JSON.parse(StoredCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(Cart));
  }, [Cart]);
  return (
    <MyContext.Provider value={{ value, setValue, Cart, setCart }}>
      {children}
    </MyContext.Provider>
  );
};
