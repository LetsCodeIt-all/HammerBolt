import React, { useContext } from "react";
import style from "../Scss/Checkout.module.scss";
import { MyContext } from "./ProductContext";

function SmallComponent() {
  const { cart } = useContext(MyContext);

  return (
    <div className={style.PriceDetails}>
      <div>
        <p>Product</p>
        <p>Price</p>
      </div>
      {cart?.map((e) => {
        // console.log(e);
        return (
          <div>
            <p>{e.title}</p>
            <p>${e.price}</p>
          </div>
        );
      })}
      <div>
        <p>Total Price</p>
        <p>
          ${" "}
          {Math.round(
            cart?.reduce(
              (sum, product) => sum + product.price * (product.quantity || 1),
              0
            )
          )}
        </p>
      </div>
    </div>
  );
}

export default SmallComponent;
