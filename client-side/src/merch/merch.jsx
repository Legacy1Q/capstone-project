import "./Merch.css";
import { MyContext } from "../MyContext";
import { useContext, useState } from "react";

function Merch() {
  const { cart, updateCart, merch, updateIsAddedToCart } =
    useContext(MyContext);

  const [favoriteStatus, setFavoriteStatus] = useState({});

  const handleAddToCart = (id, quantity, type) => {
    updateCart(cart + quantity);
    updateIsAddedToCart(id, quantity, type);
    setLocalQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: 0,
    }));
  };

  const [localQuantities, setLocalQuantities] = useState(
    merch.reduce((quantities, item) => {
      quantities[item.id] = 0;
      return quantities;
    }, {})
  );

  return (
    <div className="merch">
      <h1>Cinematic Loot & Game Swag: Shop Movie, TV, and Video Game Gear</h1>
      <div className="merch__body">
        <div className="merch__container">
          <div className="row">
            {merch.map((m) => (
              <div className="col-6 col-md-3" key={m.id}>
                <div className="merch__container__1">
                  <div>
                    <img src={m.image} alt="" />
                    <p>{m.name}</p>
                    <p>${m.price}</p>
                    <div className="text-div">
                      <select
                        id={`quantity-${m.id}`}
                        value={localQuantities[m.id]}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          setLocalQuantities((prevQuantities) => ({
                            ...prevQuantities,
                            [m.id]: newQuantity,
                          }));
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
                      <button
                        className="add-to-cart-button"
                        onClick={() => {
                          handleAddToCart(m.id, localQuantities[m.id], "add");
                        }}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="favorite-button"
                        onClick={() => {
                          const newIsFavorite = !favoriteStatus[m.id];
                          setFavoriteStatus((prevFavoriteStatus) => ({
                            ...prevFavoriteStatus,
                            [m.id]: newIsFavorite,
                          }));
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Merch;
