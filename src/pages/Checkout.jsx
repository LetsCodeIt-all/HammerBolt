import React, { useState } from "react";
import style from "../Scss/Checkout.module.scss";
import ProgressBar from "../Components/ProgressBar";
import Delivery from "../Components/Delivery";
import Payment from "../Components/Payment";
import Finish from "../Components/Finish";
function Checkout() {
  const [progress, setProgress] = useState(0);
  const [delivery, setDelivery] = useState("");
  const [payment, setPayment] = useState("");
  console.log(delivery);
  console.log(payment);
  // function DeliverySelected(params) {
  //   console.log(params);
  // }
  function handleSubmit(e) {
    e.preventDefault();
    // if (!delivery) {
    //   alert("Please select a delivery option");
    //   return;
    // }
  }
  return (
    <div className={style.Checkout}>
      <form onSubmit={handleSubmit}>
        {" "}
        <ProgressBar prop={progress} />
        {progress == 0 && (
          <Delivery delivery={delivery} setDelivery={setDelivery} />
        )}
        {progress == 50 && (
          <Payment payment={payment} setPayment={setPayment} />
        )}
        {progress == 100 && <Finish payment={payment} delivery={delivery} />}
        <div className={style.Btns}>
          <button
            type="submit"
            onClick={() => {
              if (progress == 0 && delivery) {
                setProgress(progress + 50);
              }
              if (progress == 50 && payment) {
                setProgress(progress + 50);
              }
              if (progress == 50 && !payment) {
                alert("pls select a payment option");
              }
            }}
          >
            {payment ? (payment.id === "cod" ? "Place Order" : "Pay") : "Next"}
          </button>
          <button
            onClick={() => {
              if (progress > 0) {
                setProgress(progress - 50);
              }
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
