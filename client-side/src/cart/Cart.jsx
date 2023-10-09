import Button from "react-bootstrap/Button";
import "./Cart.css";
import { Link } from "react-router-dom";
import { MyContext } from "../MyContext";
import { useContext } from "react";

function Cart() {
  const { cart, updateCart, merch, updateIsAddedToCart } =
    useContext(MyContext);
  const filteredMerch = merch.filter((item) => item.isAddedToCart === true);

  const handleRemoveToCart = (id, action) => {
    updateCart(cart - 1);
    updateIsAddedToCart(id, action);
  };
  return (
    <div className="cart">
      <h1>Cart</h1>
      <div className="merch__body">
        <div className="merch__container">
          <div className="row">
            {filteredMerch.map((item) => (
              <div className="col-6 col-md-3" key={item.id}>
                <div className="merch__container__1">
                  <div>
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <button
                      className="add-to-cart-button"
                      onClick={() => {
                        handleRemoveToCart(item.id, "remove");
                      }}
                    >
                      Remove to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={cart === 0 ? "cart__container" : "hide"}>
        <h2>Your Cart is Empty</h2>
        <div className="cart__buttons">
          <Link to="/">
            <Button variant="outline-secondary">See Whats Poppin</Button>{" "}
          </Link>
          <Link to="/login">
            <Button variant="outline-light">Sign In</Button>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
