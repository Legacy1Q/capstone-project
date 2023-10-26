import Button from "react-bootstrap/Button";
import "./Cart.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { MyContext } from "../MyContext";

function Cart() {
  const {
    currentUser,
    fetchCartTotal,
    guestCart,
    updateGuestCart,
    removeGuestCart,
  } = useContext(MyContext);
  const [cart, setCart] = useState([]);

  const handleQuantityChange = (merch, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === merch.id ? { ...item, quantity: newQuantity } : item
    );
    if (newQuantity === 0) {
      const isConfirmed = removeFromCart(merch.id);
      if (!isConfirmed) {
        return;
      }
    } else {
      updateCart(merch, newQuantity);
    }
    // const idToRemove = updatedCart.id;
    const newCart = updatedCart.filter((item) => item.quantity > 0);
    setCart(newCart);
    fetchCartTotal();
  };

  async function updateCart(merch, newQuantity) {
    if (currentUser) {
      const response = await fetch(
        `http://localhost:8080/updateCart/${merch.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            quantity: newQuantity,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchCartTotal();
    } else {
      updateGuestCart(newQuantity, merch, true);
    }
  }

  const removeFromCart = (itemId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (currentUser) {
          const apiUrl = "http://localhost:8080/deleteCart" + "/" + itemId;
          fetch(apiUrl, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
            })
            .then(() => {
              fetchCart();
              fetchCartTotal();
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          // Swal.fire("Removed!", "Item has been removed.", "success");
        } else {
          removeGuestCart(itemId);
        }
        Swal.fire("Removed!", "Item has been removed.", "success");
      } else {
        return false;
      }
    });
  };

  function fetchCart() {
    let userId;
    currentUser === null ? (userId = 0) : (userId = currentUser.id);
    if (userId === 0) {
      return;
    }
    fetch("http://localhost:8080/cart")
      .then((response) => response.json())
      .then((data) => {
        setCart(data.filter((x) => x.admin?.id === userId));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="cart">
      <h1>Cart</h1>
      <div className="merch__body">
        <div className="merch__container">
          <div className="row">
            {currentUser
              ? cart
              : guestCart.map((item) => (
                  <div className="col-6 col-md-3" key={item.id}>
                    <div className="merch__container__1">
                      <div>
                        <img
                          src={
                            currentUser
                              ? item.merch.imageFilename
                              : item.imageFilename
                          }
                          alt=""
                        />
                        <p className="text-div">
                          {currentUser ? item.merch.name : item.name}
                        </p>
                        <p className="text-div">
                          Total: $
                          {currentUser
                            ? item.merch.price * item.quantity
                            : item.price * item.quantity}
                        </p>
                        <div className="text-div">
                          <select
                            id={`quantity-${item.id}`}
                            className="cart-select"
                            value={item.quantity || 0}
                            onChange={(e) => {
                              const newQuantity = Number(e.target.value);
                              handleQuantityChange(item, newQuantity);
                            }}
                          >
                            {[
                              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                              15,
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
      <div className={cart.length === 0 ? "cart__container" : "hide"}>
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
