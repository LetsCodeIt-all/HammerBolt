import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router";

function ProductCard({ product }) {
  return (
    <div id="product">
      <img src={product.images[0]} alt="" />
      <p id="title">{product.title}</p>
      <p id="price">${product.price}</p>
      <button>Free delivery</button>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "grey",
        }}
      >
        <p id="rating">
          {product.rating} <Star style={{ fontSize: "5px" }} size="15px" />
        </p>
        {product.reviews.length} Reviews
      </div>
      <Link to={`/product/${product.id}`} style={{}}>
        view Details
      </Link>
    </div>
  );
}

export default ProductCard;
