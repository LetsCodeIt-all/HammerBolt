import React from "react";
import style from "../Scss/Checkout.module.scss";
function Delivery({ setDelivery }) {
  const ShipingMethods = [
    {
      delivery: "Standard Delivery",
      date: "after 2 days delivery",
      price: "Free",
    },
    {
      delivery: "Express Delivery",
      date: "same day delivery",
      price: "$10",
    },
    {
      delivery: "Scheduled delivery",
      price: "$20",
    },
  ];

  return (
    <div className={style.Delivery}>
      <div className={style.Address}>
        <h1>Delivery Address</h1>
        <div>
          <p> Gala no. 1 Waghral pada, Bhoida Pada, Sativali,Vasai E 401208</p>
          <button>Change</button>
        </div>
      </div>
      <div className={style.dateOfDelivery}>
        <h2>Shipping Method</h2>
        {/* <form> */}
        {ShipingMethods?.map((method, i) => {
          return (
            <div className={style.Divein}>
              <p>
                <input
                  type="radio"
                  name="method"
                  id={i}
                  required={i === 1}
                  onChange={(e) => {
                    setDelivery(method);
                  }}
                />
              </p>

              <label htmlFor={i}>
                <div className={style.innerBx}>
                  <div className={style.innerMost}>
                    <h3>{method.delivery}</h3>
                    <p>
                      {method.date ? (
                        method.date
                      ) : (
                        <input
                          type="date"
                          required={i == 2}
                          onChange={(e) => {
                            setDelivery([method, e.target.value]);
                          }}
                        ></input>
                      )}
                    </p>
                  </div>
                  <h3>{method.price}</h3>
                </div>
              </label>
            </div>
          );
        })}
        {/* </form> */}
      </div>
    </div>
  );
}

export default Delivery;
