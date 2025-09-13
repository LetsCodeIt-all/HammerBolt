import React, { useState } from "react";
import "../Scss/Category.scss";
import Slider from "@mui/material/Slider";
import product from "../product.js";
import { useParams } from "react-router";
import ProductCard from "../Components/ProductCard";
const CategoryPage = () => {
  const { category } = useParams();
  const filtered = product.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
  const [range, setRange] = useState([70, 100]);
  const handleSliderChange = (e, newValue) => {
    setRange(newValue); // newValue is an array: [min, max]
  };
  return (
    <div className="categoryPage">
      <aside>
        <div className="BrowseFilter">
          <h2> Browse by</h2>
          <hr />
        </div>
        <div className="categoryLink">
          <p> All Products</p>
          <p>Best Sellers</p>
          <p>Computers</p>
          <p>Drones & Cameras</p>
          <p>Headphones</p>
          <p>Home Page Best Sellers</p>
          <p>Home Page Sale</p>
          <p>Mobile</p>
          <p>Sale</p>
          <p>Speakers</p>
          <p>Tablets</p>
          <p>TV & Home Cinema</p>
          <p>Wearable Tech</p>
        </div>
        <div className="Filter">
          <div className="BrowseFilter">
            <h2> Filter by</h2>
            <hr />
          </div>
          <div className="SliderDiv">
            <Slider
              value={range}
              onChange={handleSliderChange}
              //   valueLabelDisplay="auto"
              min={70}
              max={100}
              className="Slider"
            />
            <span style={{ display: "flex", justifyContent: "space-between" }}>
              <p>Min: ${range[0]}</p>
              <p> Max: ${range[1]}</p>
            </span>
            <hr />
          </div>
        </div>
      </aside>

      <div className="CategoryProducts">
        <div className="Heading">
          <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
        </div>
        <div className="productPart">
          <span>
            <p>8 Products</p>
            <p>Sort by Latetes</p>
          </span>
          {filtered.map((product) => {
            console.log(product.id);
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
