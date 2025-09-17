import React from "react";
import style from "../Scss/Checkout.module.scss";
function Delivery() {
  return (
    <div className={style.Delivery}>
      <div className={style.Address}>
        <h1>Delivery Address</h1>
        <div>
          <p> Gala no. 1 waghral pada, Bhoida Pada, Sativali,Vasai E 401208</p>
          <button>Change</button>
        </div>
      </div>
      <div className={style.dateOfDelivery}>
        <h2>Shipping Method</h2>
        <form>
          <div className={style.Divein}>
            <input type="radio" name="" id="Standard" />

            <label htmlFor="Standard">
              <div className={style.innerBx}>
                <div className={style.innerMost}>
                  <h3>Standard Delivery</h3>
                  <p> after 2 days delivery</p>
                </div>
                <h3>Free</h3>
              </div>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Delivery;
