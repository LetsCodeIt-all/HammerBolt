import React from "react";
// import { CheckCircleOutlined } from "react-icons/ai";
import SmallComponent from "./SmallComponent";
import style from "../Scss/Checkout.module.scss";
function Finish({ delivery, payment }) {
  return (
    <div className={style.Finish}>
      {/* <CheckCircleOutlined /> */}

      <h1>Order SuccesFul</h1>
      <SmallComponent />
      <div className={style.DeliveryLoCM}>
        <h2>Delivery Address & Method</h2>
        <h4>
          <p>{delivery[0] ? delivery[0].delivery : delivery.delivery}</p>
          <p>{delivery[0] ? delivery[0].price : delivery.price}</p>
        </h4>

        {delivery[0] ? delivery[0].address : delivery.address}
        <p>Delivery Date:- {delivery[1] ? delivery[1] : delivery.date}</p>
      </div>
    </div>
  );
}

export default Finish;
