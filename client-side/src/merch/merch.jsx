import "./Merch.css";
import { MyContext } from "../MyContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Merch() {
  const { currentUser, fetchCartTotal, guestCart, updateGuestCart } =
    useContext(MyContext);
  const navigate = useNavigate();

  const [favoriteStatus, setFavoriteStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [merch, setMerch] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/merch")
      .then((response) => response.json())
      .then((data) => {
        setMerch(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  function revertQuantityValue() {
    const initialQuantities = merch.reduce((quantities, item) => {
      quantities[item.id] = 1;
      return quantities;
    }, {});
    setQuantity(initialQuantities);
  }

  useEffect(() => {
    revertQuantityValue();
  }, [merch]);

  const isItemExisting = (merchId) => {
    const filteredCart = guestCart.filter((x) => x.id === merchId);
    return filteredCart.length > 0;
  };

  async function addToCart(quantity, merchId) {
    const userId = currentUser ? currentUser.id : null;
    if (userId !== null) {
      try {
        const response = await fetch("http://localhost:8080/cart");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const doesCartExist = data.filter(
          (c) => c.admin.id === userId && c.merch.id === merchId
        );
        if (doesCartExist.length === 0) {
          const response = await fetch("http://localhost:8080/addCart", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
              quantity: quantity,
              merch: {
                id: merchId,
              },
              admin: {
                id: userId,
              },
            }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          const response = await fetch(
            `http://localhost:8080/updateCart/${doesCartExist[0].id}`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-type": "application/json; charset=UTF-8",
              },
              body: JSON.stringify({
                quantity: doesCartExist[0].quantity + quantity,
              }),
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
      fetchCartTotal();
    } else {
      try {
        const response = await fetch(`http://localhost:8080/merch/${merchId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (!isItemExisting(merchId)) {
          const newItem = { data };
          updateGuestCart(quantity, [...guestCart, newItem]);
          // console.log(guestCart);
        } else {
          const updatedCart = guestCart.map((item) =>
            item.id === data.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          updateGuestCart(quantity, updatedCart);
          // console.log(guestCart);
        }
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
  }

  const handleFavoriteStatus = (id) => {
    const newIsFavorite = !favoriteStatus[id];
    setFavoriteStatus((prevFavoriteStatus) => ({
      ...prevFavoriteStatus,
      [id]: newIsFavorite,
    }));
  };

  const handleAddToCart = (id, qty) => {
    if (currentUser === null) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please login first!",
        showConfirmButton: true,
        timer: 15000,
      });
      return navigate("/login");
    }
    addToCart(qty, id);
    revertQuantityValue();

    fetchCartTotal();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Successfully added to cart!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="merch">
      <h1>Cinematic Loot & Game Swag: Shop Movie, TV, and Video Game Gear</h1>
      <div className="merch__body">
        <div className="merch__container">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              {merch
                .sort((a, b) => b.id - a.id)
                .map((m) => (
                  <div className="col-6 col-md-3" key={m.id}>
                    <div className="merch-card">
                      <div className="merch__container__1">
                        <div className="merch-poster-container">
                          <img
                            src={m.imageFilename}
                            onDoubleClick={() => handleFavoriteStatus(m.id)}
                            alt=""
                          />
                          <p>{m.name}</p>
                          <p>${m.price}</p>
                          <div className="text-div">
                            <select
                              id={`quantity-${m.id}`}
                              value={quantity[m.id]}
                              onChange={(e) => {
                                const newQuantity = parseInt(
                                  e.target.value,
                                  10
                                );
                                setQuantity(newQuantity);
                              }}
                            >
                              {[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                15,
                              ].map((quantity) => (
                                <option key={quantity} value={quantity}>
                                  {quantity}
                                </option>
                              ))}
                            </select>
                            <button
                              className="add-to-cart-button float-end"
                              onClick={() => {
                                handleAddToCart(
                                  m.id,
                                  quantity[m.id] === 1
                                    ? quantity[m.id]
                                    : quantity
                                );
                              }}
                            >
                              Add to Cart
                            </button>
                            <button
                              className="favorite-button"
                              onClick={() => {
                                handleFavoriteStatus(m.id);
                              }}
                            >
                              {favoriteStatus[m.id] ? (
                                <img
                                  src="./merchImages/clicked-heart.jpg"
                                  alt="Button Image"
                                />
                              ) : (
                                <img
                                  src="./merchImages/heart.png"
                                  alt="Button Image"
                                />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Merch;
