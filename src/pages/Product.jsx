import React from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { MyContext } from "../Components/ProductContext";
import "../Scss/Product.scss";
import { ChevronsRight, ShoppingCart, CircleUser } from "lucide-react";
function Product() {
  const { id } = useParams();
  const { value: ArrProducts } = useContext(MyContext);
  // console.log(ArrProducts, id);
  const filterd = ArrProducts.filter((e) => {
    return e.id == parseInt(id);
  });
  console.log(filterd);
  return (
    <div>
      {filterd.map((product) => {
        console.log(product);
        return (
          <div key={product.id} className="ProductDetails">
            <div className="images">
              <img src={product.images[1]} alt="" />
            </div>

            <div className="details">
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <h2>${product.price}</h2>
              <div id="return">
                <span>{product.rating}/5</span>
                <b>{product.returnPolicy}</b>
              </div>

              <i>{product.warrantyInformation}</i>
              <div id="BtnS">
                <button>
                  <ShoppingCart />
                  Add to Cart
                </button>
                <button>
                  <ChevronsRight />
                  Buy
                </button>
              </div>
              <div className="Reviews">
                <h3>Reviews</h3>
                {product.reviews.map((rev) => {
                  return (
                    <div>
                      <p>
                        <CircleUser />
                        {rev.reviewerName}
                      </p>
                      <span style={{ display: "flex", gap: "10px" }}>
                        {rev.rating}
                        <h5>
                          Post on
                          {" " + new Date(Date.parse(rev.date)).toDateString()}
                        </h5>
                      </span>
                      <u>{rev.comment}</u>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Product;
