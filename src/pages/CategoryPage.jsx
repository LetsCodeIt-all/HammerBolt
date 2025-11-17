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
  const {
    ProductsByCategory: ArrProducts,
    setProductsByCategory: setArrProducts,
  } = useContext(MyContext);
  const Categorylinks = [
    { name: "Beauty", links: "/shop/beauty" },
    { name: "Tablets", links: "/shop/tablets" },
    { name: "Fragrances", links: "/shop/fragrances" },
    { name: "Sunglasses", links: "/shop/sunglasses" },
    { name: "Smartphones", links: "/shop/smartphones" },
    { name: "Laptops", links: "/shop/laptops" },
    { name: "Sports-accessories", links: "/shop/sports-accessories" },
    { name: "Mens-watches", links: "/shop/Mens-watches" },
  ];

  function rangeSet(prop) {
    if (prop == "min") {
      let least = ArrProducts?.[0]?.price;
      for (let index = 1; index < ArrProducts?.length; index++) {
        if (ArrProducts?.[index]?.price < least) {
          least = ArrProducts?.[index]?.price;
        }
      }
      return least;
    } else {
      let big = ArrProducts?.[0]?.price;
      for (let index = 1; index < ArrProducts?.length; index++) {
        if (ArrProducts?.[index]?.price > big) {
          big = ArrProducts?.[index]?.price;
        }
      }
      return big;
    }
  }
  const [range, setRange] = useState([
    rangeSet("min") || 0,
    rangeSet("max") || 0,
  ]);
  const handleSliderChange = (e, newValue) => {
    setRange(newValue); // newValue is an array: [min, max]
    setArrProducts(
      ArrProducts?.filter((a) => {
        return newValue[0] <= a?.price && a?.price <= newValue[1];
      })
    );

    // );
    console.log(newValue);
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
    ``;

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
          {Categorylinks.map(({ name, links }, idx) => {
            if (name.toLowerCase() == category) {
              return (
                <p
                  style={{
                    fontWeight: "bold",
                    opacity: "0.8",
                    fontSize: "18px",
                  }}
                >
                  {name}
                </p>
              );
            }
            return (
              <Link
                className="Links"
                to={links}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <p key={idx}>{name}</p>
              </Link>
            );
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
              min={rangeSet("min")}
              max={rangeSet("max")}
              className="Slider"
            />
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
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
            <p>{ArrProducts?.length} Products</p>
            <p>Sort by Latetes</p>
          </span>
          <div className="productsDiv">
            {ArrProducts?.map((product) => {
              return <ProductCard key={product?.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
