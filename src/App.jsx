import React from "react";
import Navbar from "../src/Components/Navbar.jsx";
import { Routes, Route } from "react-router";
import Home from "./Components/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";
import Checkout from "./pages/Checkout.jsx";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      hii
    </div>
  );
}

export default App;
