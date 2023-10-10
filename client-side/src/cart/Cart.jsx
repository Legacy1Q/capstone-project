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
                    <p className="text-div">{item.name}</p>
                    <p className="text-div">${item.price}</p>
                    <div className="text-div">
                      <select
                        id={`quantity-${item.id}`}
                        className="cart-select"
                        value={localQuantities[item.id] || 0}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          const itemId = item.id;
                          setLocalQuantities((prevQuantities) => ({
                            ...prevQuantities,
                            [itemId]: newQuantity,
                          }));
                          updateIsAddedToCart(itemId, newQuantity, "update");
                          const totalQuantity = merch.reduce(
                            (sum, merchItem) =>
                              sum +
                              (merchItem.id === itemId
                                ? newQuantity
                                : merchItem.quantity),
                            0
                          );
                          updateCart(totalQuantity);
                        }}
                      >
                        {[
                          0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
                        ].map((quantity) => (
                          <option key={quantity} value={quantity}>
                            {quantity}
                          </option>
                        ))}
                      </select>
                    </div>
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
