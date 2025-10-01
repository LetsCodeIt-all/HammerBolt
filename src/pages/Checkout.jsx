import React, { useState } from "react";
import style from "../Scss/Checkout.module.scss";
import ProgressBar from "../Components/ProgressBar";
import Delivery from "../Components/Delivery";
import Payment from "../Components/Payment";
function Checkout() {
  const [progress, setProgress] = useState(0);
  const [delivery, setDelivery] = useState("");
  const [payment, setPayment] = useState("");
  console.log(delivery);
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
        {progress == 100 && <Review />}
        <div className={style.Btns}>
          <button
            type="submit"
            onClick={() => {
              if (progress < 100 && delivery) {
                setProgress(progress + 50);
              }
            }}
          >
            Next
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
