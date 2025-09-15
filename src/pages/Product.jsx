import React from "react";
import { Link, useParams } from "react-router";
import { useContext } from "react";
import { MyContext } from "../Components/ProductContext";
import "../Scss/Product.scss";
import { ChevronsRight, ShoppingCart, CircleUser } from "lucide-react";
function Product() {
  const { id } = useParams();
  const { value: ArrProducts } = useContext(MyContext);
  // const [CartProduct, setCartProduct] = useState([]);
  const { Cart: CartProduct, setCart: SetCartProduct } = useContext(MyContext); // console.log(ArrProducts, id);
  const filterd = ArrProducts.filter((e) => {
    return e.id == parseInt(id);
  });
  // CartProduct.current = [...CartProduct.current,filterd[0]];
  function Duplicateitem() {
    const productToAdd = filterd[0];

    // Check if the item is already in the cart
    const existingProduct = CartProduct.find(
      (item) => item.id === productToAdd.id
    );

    if (existingProduct) {
      // Map over cart and update quantity
      const updatedCart = CartProduct.map((item) => {
        if (item.id === productToAdd.id) {
          return { ...item, quantity: (item.quantity || 1) + 1 };
        }
        return item;
      });
      SetCartProduct(updatedCart);
    } else {
      // Add new item with quantity: 1
      SetCartProduct([...CartProduct, { ...productToAdd, quantity: 1 }]);
    }
  }

  return (
    <div>
      {filterd.map((product) => {
        return (
          <div key={product.id} className="ProductDetails">
            <div className="images">
              <img src={product.images[0]} alt="" />
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
                <Link to="/cart">
                  <button onClick={Duplicateitem}>
                    <ShoppingCart />
                    Add to Cart
                  </button>
                </Link>

                <button>
                  <ChevronsRight />
                  Buy
                </button>
              </div>
              <div className="Reviews">
                <h3>Reviews</h3>
                {product.reviews.map((rev, idx) => {
                  return (
                    <div key={idx}>
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
