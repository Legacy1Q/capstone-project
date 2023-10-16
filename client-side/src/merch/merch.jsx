import "./Merch.css";
import { MyContext } from "../MyContext";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

function Merch() {
  // const { cart, updateCart, updateIsAddedToCart } = useContext(MyContext);

  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [merch, setMerch] = useState([]);
  const [quantity, setQuantity] = useState(Array(merch.length).fill(1));

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

  async function addToCart(quantity, merchId) {
    try {
      const response = await fetch("http://localhost:8080/cart");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const doesCartExist = data.filter(
        (c) => c.admin.id === 1 && c.merch.id === merchId
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
              id: 1,
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
  }

  const handleFavoriteStatus = (id) => {
    const newIsFavorite = !favoriteStatus[id];
    setFavoriteStatus((prevFavoriteStatus) => ({
      ...prevFavoriteStatus,
      [id]: newIsFavorite,
    }));
  };

  const handleAddToCart = (id, quantity, type) => {
    // updateCart(cart + quantity);
    // updateIsAddedToCart(id, quantity, type);
    setQuantity((prevQuantities) => {
      const updatedQuantities = [...prevQuantities];
      updatedQuantities[id - 1] = 1; // Reset the quantity to 1
      return updatedQuantities;
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Successfully added to cart!",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // const [localQuantities, setLocalQuantities] = useState(
  //   merch.reduce((quantities, item) => {
  //     quantities[item.id] = 1;
  //     return quantities;
  //   }, {})
  // );

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
                              value={quantity[m.id - 1]}
                              onChange={(e) => {
                                const newQuantity = parseInt(
                                  e.target.value,
                                  10
                                );
                                setQuantity((prevQuantities) => {
                                  const updatedQuantities = [...prevQuantities];
                                  updatedQuantities[m.id - 1] = newQuantity; // Update the specific merch item's quantity
                                  return updatedQuantities;
                                });
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
                              className="add-to-cart-button"
                              onClick={() => {
                                handleAddToCart(
                                  m.id,
                                  quantity[m.id - 1],
                                  "add"
                                );
                                addToCart(quantity[m.id - 1], m.id);
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
