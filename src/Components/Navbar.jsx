import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Search, Heart, CircleUserRound, ShoppingCart } from "lucide-react";
import "../Scss/Navbar.scss";

function Navbar() {
  return (
    <>
      <div className="Navbar">
        <div className="part1">
          <img src={logo} alt="BrandLogo" height="70px" />
        </div>
        <div className="part2">
          <div>
            {" "}
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
          </div>
        </div>
      </div>
      <div className="ShopOptions">
        <div>
          <p>Shop All</p>
          <Link to="/shop/computers">Computers</Link>
          <Link to="/shop/tablets">Tablets</Link>
          <Link to="/shop/drones&Camera">Drones & Cameras</Link>
          <Link to="/shop/audio">Audio</Link>
          <Link to="/shop/mobile">Mobile</Link>
          <Link to="/shop/tv&HomeCinema">T.V & Home Cinema</Link>
          <Link to="/shop/wearableTechs">Wearable Tech</Link>
          <Link to="/shop/sale">Sale</Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
