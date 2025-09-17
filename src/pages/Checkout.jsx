import React, { useState } from "react";
import style from "../Scss/Checkout.module.scss";
import ProgressBar from "../Components/ProgressBar";
import Delivery from "../Components/Delivery";
function Checkout() {
  const [progress, setProgress] = useState(0);
  return (
    <div className={style.Checkout}>
      <ProgressBar prop={progress} />
      <Delivery />
      <button
        onClick={() => {
          if (progress < 100) {
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
  );
}

export default Checkout;
