import React from "react";
import style from "../Scss/Checkout.module.scss";
import SmallComponent from "./SmallComponent";
function Payment({ setPayment }) {
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
      <SmallComponent />
      <div className={style.PaymentMethods}>
        <h1>Payment Methods</h1>
        <div>
          {payment.map((option, index) => (
            <div key={option.id} style={{ display: "flex" }}>
              <input
                type="radio"
                id={option.id}
                name="payment"
                required={index === payment.length - 1} // only last one required
                onChange={() => {
                  setPayment(option);
                }}
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
