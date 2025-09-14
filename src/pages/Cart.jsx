import React from "react";
import { MapPin, Heart, CircleX } from "lucide-react";
import "../Scss/Cart.scss";
function Cart() {
  return (
    <div className="Cart">
      <div className="delivery">
        <MapPin size={40} />
        <p>
          Delivery at S no 141 Om Sai Krupa chawl, Sonu devi Mandir, Waghral
          pada,Bhoidapada,Vasai (E) - 401208
        </p>
        <button>Change</button>
      </div>
      <div className="AddedProduct">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNu9uulWIgqP6ax8ikiM4eQUf2cNqGtOMkaQ&s"
          alt=""
        />
        <div className="otherDetails">
          <h1>Product Title</h1>
          <h2>Price</h2>
          <p>Delivery by </p>
          <div>
            <button>
              <Heart />
              Move to Wishlist
            </button>
            <button>
              <CircleX />
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="Total">
        <div className="Calculations">
          <h1>Price Details</h1>
          <div>
            <p>Product Title</p>
            <p>Price</p>
          </div>
        </div>
        <div className="GateWay">
          <h2>Total Price </h2>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
