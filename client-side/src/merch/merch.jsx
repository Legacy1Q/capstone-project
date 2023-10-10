import "./Merch.css";
import { MyContext } from "../MyContext";
import { useContext, useState } from "react";

function Merch() {
  const { cart, updateCart, merch, updateIsAddedToCart } =
    useContext(MyContext);
  const handleAddToCart = (id, quantity) => {
    updateCart(cart + quantity);
    updateIsAddedToCart(id, quantity);
  };

  const [localQuantities, setLocalQuantities] = useState(
    merch.reduce((quantities, item) => {
      quantities[item.id] = item.quantity;
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
                    <label htmlFor={`quantity-${m.id}`}>Qty:</label>
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
                      {[0, 1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>
                          {quantity}
                        </option>
                      ))}
                    </select>
                    <button
                      className="add-to-cart-button"
                      onClick={() => {
                        handleAddToCart(m.id, localQuantities[m.id]);
                      }}
                    >
                      Add to Cart
                    </button>
                    <button className="favorite-button">
                      <img src="./merchImages/heart.png" alt="Button Image" />
                    </button>
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
