import React, { useContext } from "react";
import style from "../Scss/Checkout.module.scss";
import { MyContext } from "./ProductContext";
function Payment() {
  const { cart, addToCart, removeFromCart } = useContext(MyContext);
  return (
    <div className={style.Payment}>
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
            $
            {cart?.reduce(
              (sum, product) => sum + product.price * (product.quantity || 1),
              0
            )}
          </p>
        </div>
      </div>
      <div className={style.PaymentMethods}>
        <h1>Payment Methods</h1>
        <input type="radio" id="radio" name="radio" required />
        <label htmlFor="radio">
          <div>
            <h2>Continue with</h2>
            <p>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png"
                alt=""
              />
              <img
                src="https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png"
                alt=""
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png"
                alt=""
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/cb/Rupay-Logo.png"
                alt=""
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1280px-PayPal.svg.png"
                alt=""
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Navi_New_Logo.png/960px-Navi_New_Logo.png"
                alt=""
              />
            </p>
          </div>
        </label>
        <input type="radio" id="radio1" name="radio" required />
        <label htmlFor="radio1">
          <div>
            <h2>Cash on Delivery</h2>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Payment;
