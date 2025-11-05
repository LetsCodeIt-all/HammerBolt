import React, { useContext } from "react";
import { MapPin, Heart, CircleX } from "lucide-react";
import "../Scss/Cart.scss";
import { MyContext } from "../Components/ProductContext";
import { Link } from "react-router";

function Cart() {
  // const { Cart: CartProduct, setCart: SetCartProduct } = useContext(MyContext);
  const { cart, addToCart, removeFromCart } = useContext(MyContext);

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
      <div className="Products">
        {cart?.map((product, idx) => {
          return (
            <div className="AddedProduct" key={idx}>
              <img src={product?.images?.[2]} alt="" />
              <div className="otherDetails">
                <p>Quantity: {product?.quantity || 1}</p>

                <h1>{product?.title}</h1>
                <h2>{product?.price}</h2>

                <p>Delivery by 8 Jan 2035</p>
                <div>
                  <button>
                    <Heart />
                    Move to Wishlist
                  </button>
                  <button
                    onClick={() => {
                      // SetCartProduct(CartProduct.filter((__, i) => i !== idx));
                      removeFromCart(product?.meta?.barcode);
                    }}
                  >
                    <CircleX />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="Total">
        <div className="Calculations">
          <h1>Price Details</h1>
          <div>
            <p>Product Title</p>
            <p>Price</p>
            <p>Quantity</p>
          </div>
          {cart?.map((product) => {
            return (
              <div className="PriceDetails">
                <p>{product?.title}</p>
                <p>+${product?.price * (product?.quantity || 1)}</p>
                <p>{product?.quantity || 1}</p>
              </div>
            );
          })}
        </div>
        <div className="GateWay">
          <h2>
            Total Price $
            {cart?.reduce((sum, product) => sum + product?.price, 0)}
          </h2>
          <Link
            to={cart?.length !== 0 ? `/checkout` : "/"}
            className="Continuebtn"
          >
            <button onClick={() => {}}>Continue</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
