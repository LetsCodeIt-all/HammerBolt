import React from "react";
import style from "../Scss/Checkout.module.scss";

export default function ProgressBar({ prop }) {
  const Steps = ["Delivery", "Payment", "Finish"];
  return (
    <div>
      <div className={style.progressBar}>
        <div className={style.progressContainer}>
          <div className={style.progressFill} style={{ width: `${prop}%` }} />
        </div>

        <div className={style.Circle}>
          {Steps?.map((__, i) => {
            return (
              <div key={i}>
                <h1 />
              </div>
            );
          })}
        </div>
        <div className={style.Text}>
          {Steps?.map((step, i) => {
            return (
              <div key={i}>
                <p>{step}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
