import React, { useContext } from "react";
import style from "../Scss/Checkout.module.scss";
import { MyContext } from "./ProductContext";
function Payment({ setPayment }) {
  const { cart, addToCart, removeFromCart } = useContext(MyContext);
  const payment = [
    {
      id: "stripe",
      label: "Continue with",
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1200px-Stripe_Logo%2C_revised_2016.svg.png",
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      img: null, // no image needed
    },
  ];
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
        <div>
          {payment.map((option, index) => (
            <div key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="payment"
                required={index === payment.length - 1} // only last one required
              />
              <label htmlFor={option.id}>
                <div>
                  <h2>{option.label}</h2>
                  {option.img && (
                    <p>
                      <img src={option.img} alt={option.label} />
                    </p>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Payment;
