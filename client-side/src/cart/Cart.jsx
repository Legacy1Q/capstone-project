import Button from "react-bootstrap/Button";
import "./Cart.css";
import { Link } from "react-router-dom";
import { MyContext } from "../MyContext";
import { useContext, useState } from "react";

function Cart() {
  const { cart, updateCart, merch, updateIsAddedToCart } =
    useContext(MyContext);
  const filteredMerch = merch.filter((item) => item.isAddedToCart === true);
  const [localQuantities, setLocalQuantities] = useState(
    filteredMerch.reduce((quantities, item) => {
      quantities[item.id] = item.quantity;
      return quantities;
    }, {})
  );
  const [difference, setDifference] = useState(0);
  const handleRemoveToCart = (id, quantity) => {
    updateIsAddedToCart(id, quantity);
    updateCart(
      filteredMerch.reduce((sum, item) => sum + item.quantity, 0) - difference
    );
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
                    <label htmlFor={`quantity-${item.id}`}>Qty:</label>
                    <select
                      id={`quantity-${item.id}`}
                      value={localQuantities[item.id] || 0}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        const oldQuantity = localQuantities[item.id] || 0;
                        setLocalQuantities((prevQuantities) => ({
                          ...prevQuantities,
                          [item.id]: newQuantity,
                        }));
                        setDifference(oldQuantity - newQuantity);
                      }}
                    >
                      {[0, 1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>
                          {quantity}
                        </option>
                      ))}
                    </select>
                    <button
                      className="add-to-cart-button"
                      onClick={() => {
                        handleRemoveToCart(item.id, localQuantities[item.id]);
                      }}
                    >
                      Update Cart
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
