import Button from "react-bootstrap/Button";
import "./Cart.css";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div className="cart">
      <h1>Cart</h1>

      <div className="cart__container">
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
