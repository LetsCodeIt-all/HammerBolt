import React from "react";

function ProductCard({ product }) {
  return (
    <div style={{ backgroundColor: "red" }}>
      <img src={product.image} alt="" />
      <p>{product.title}</p>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}

export default ProductCard;
