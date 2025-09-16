import React, { useContext } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Search, Heart, CircleUserRound, ShoppingCart } from "lucide-react";
import "../Scss/Navbar.scss";
import { MyContext } from "./ProductContext";

function Navbar() {
  const { Cart: CartProduct } = useContext(MyContext);
  return (
    <>
      <div className="Navbar">
        <div className="part1">
          <img src={logo} alt="BrandLogo" height="70px" />
        </div>
        <div className="part2">
          <div>
            <Search style={{ cursor: "pointer" }} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <CircleUserRound />
            <h4>Log in</h4>
          </div>
          <div id="Heart">
            <Heart style={{ cursor: "pointer" }} />
          </div>
          <div id="Cart">
            <ShoppingCart style={{ cursor: "pointer" }} />
            {CartProduct.length}
          </div>
        </div>
      </div>
      <div className="ShopOptions">
        <div>
          <Link to="/" className="Links">
            Shop All{" "}
          </Link>
          <Link to="/shop/beauty" className="Links">
            Beauty
          </Link>
          <Link to="/shop/tablets" className="Links">
            Tablets
          </Link>
          <Link to="/shop/fragrances" className="Links">
            Fragrances
          </Link>
          <Link to="/shop/sunglasses" className="Links">
            Sunglasses
          </Link>
          <Link to="/shop/smartphones" className="Links">
            Mobile
          </Link>
          <Link to="/shop/laptops" className="Links">
            laptops
          </Link>
          <Link to="/shop/sports-accessories" className="Links">
            Sports
          </Link>
          <Link to="/shop/mens-watches" className="Links">
            Watches
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
