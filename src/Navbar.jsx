import React from "react";
import logo from "../src/assets/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Navbar.scss";
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
            <SearchIcon style={{ cursor: "pointer" }} />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <AccountCircleIcon />
            <h4>Log in</h4>
          </div>
          <div id="Heart">
            <FavoriteBorderIcon style={{ cursor: "pointer" }} />
          </div>
          <div id="Cart">
            <ShoppingCartIcon style={{ cursor: "pointer" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
