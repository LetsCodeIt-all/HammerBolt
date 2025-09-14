import React, { useState } from "react";
import "../Scss/Category.scss";
import Slider from "@mui/material/Slider";
// import product from "../product.js";
import { Link, useParams } from "react-router";
import ProductCard from "../Components/ProductCard";
import { useEffect } from "react";
import { useContext } from "react";
import { MyContext } from "../Components/ProductContext";

const CategoryPage = () => {
  const { category } = useParams();
  // const [ArrProducts, setArrProducts] = useState([]);

  const { value: ArrProducts, setValue: setArrProducts } =
    useContext(MyContext);
  const Categorylinks = [
    "Beauty",
    "Tablets",
    "Fragrances",
    "Sunglasses",
    "Smartphones",
    "laptops",
    "Sports-accessories",
    "Mens-watches",
  ];
  // const filtered = product.filter(
  //   (item) => item.category.toLowerCase() === category.toLowerCase()
  // );
  const [range, setRange] = useState([70, 100]);
  const handleSliderChange = (e, newValue) => {
    setRange(newValue); // newValue is an array: [min, max]
  };
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}?limit=10`
        );
        const data = await res.json();
        setArrProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProduct();
  }, [category]);

  return (
    <div className="categoryPage">
      <aside>
        <div className="BrowseFilter">
          <h2> Browse by</h2>
          <hr />
        </div>
        <div className="categoryLink">
          {Categorylinks.map((e) => {
            console.log(e, category);
            if (e.toLowerCase() == category) {
              return (
                <p
                  style={{
                    fontWeight: "bold",
                    opacity: "0.8",
                    fontSize: "18px",
                  }}
                >
                  {e}
                </p>
              );
            }
            return <p>{e}</p>;
          })}
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
            <p>{ArrProducts.length} Products</p>
            <p>Sort by Latetes</p>
          </span>
          <div className="productsDiv">
            {ArrProducts.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
