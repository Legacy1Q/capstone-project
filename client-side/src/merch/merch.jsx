import "./Merch.css";
import { MyContext } from "../MyContext";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

function Merch() {
  const { cart, updateCart, updateIsAddedToCart } = useContext(MyContext);

  const [favoriteStatus, setFavoriteStatus] = useState({});
  const [loading, setLoading] = useState(true);
  const [merch, setMerch] = useState([]);

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

  const handleFavoriteStatus = (id) => {
    const newIsFavorite = !favoriteStatus[id];
    setFavoriteStatus((prevFavoriteStatus) => ({
      ...prevFavoriteStatus,
      [id]: newIsFavorite,
    }));
  };

  const handleAddToCart = (id, quantity, type) => {
    updateCart(cart + quantity);
    updateIsAddedToCart(id, quantity, type);
    // setLocalQuantities((prevQuantities) => ({
    //   ...prevQuantities,
    //   [id]: 0,
    // }));
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
                              // value={localQuantities[m.id]}
                              // onChange={(e) => {
                              //   const newQuantity = parseInt(e.target.value, 10);
                              //   setLocalQuantities((prevQuantities) => ({
                              //     ...prevQuantities,
                              //     [m.id]: newQuantity,
                              //   }));
                              // }}
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
                                  // localQuantities[m.id],
                                  "add"
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
