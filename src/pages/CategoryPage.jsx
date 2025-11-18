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
  const [TempProducts, setTempProducts] = useState([]);
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
      return Math.min(...ArrProducts.map((p) => p.price));
    } else {
      return Math.max(...ArrProducts.map((p) => p.price));
    }
  }
  const [range, setRange] = useState([
    rangeSet("min") || 0,
    rangeSet("max") || 0,
  ]);
  const handleSliderChange = (e, newValue) => {
    setRange(newValue);
  };
  function ApplyChange(newValue) {
    const filtered = ArrProducts?.filter((item) => {
      return newValue[0] <= item?.price && item?.price <= newValue[1];
    });

    setTempProducts(filtered);
  }
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `https://dummyjson.com/products/category/${category}?limit=10`
        );
        const data = await res.json();

        setArrProducts(data.products); // save original

        setTempProducts(data.products); // displayable array
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProduct();
  }, [category]);

  useEffect(() => {
    ApplyChange(range);
  }, [range]);
  function Sorting(params) {
    if (params.target.value == "price") {
      let newArr = [...TempProducts];
      newArr.sort((a, b) => b.price - a.price);
      console.log(newArr);
      // setTempProducts(newArr);
    } else if (params.target.value == "ASC") {
      let newArr = [...TempProducts];
      newArr.sort((a, b) => {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
      });
      setTempProducts(newArr);
    } else {
      let newArr = [...TempProducts];
      newArr.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
  }
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
            <p>{TempProducts?.length} Products</p>
            <p>
              Sort by{" "}
              <select onChange={Sorting}>
                <option value="Latest">Latest</option>
                <option value="ASC">ASC</option>
                <option value="price">Price</option>
              </select>
            </p>
          </span>
          <div className="productsDiv">
            {TempProducts?.map((product) => {
              return <ProductCard key={product?.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
