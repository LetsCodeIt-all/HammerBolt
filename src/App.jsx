import React from "react";
import Navbar from "../src/Components/Navbar.jsx";
import { Routes, Route } from "react-router";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import Product from "./pages/Product.jsx";
import Checkout from "./pages/Checkout.jsx";
import Footer from "./Components/Footer.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/shop/:category" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
