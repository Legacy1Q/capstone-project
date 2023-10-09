import "./Merch.css";
import { MyContext } from "../MyContext";
import { useContext } from "react";

function Merch() {
  const { cart, updateCart, merch, updateIsAddedToCart } =
    useContext(MyContext);
  const handleAddToCart = (id, action) => {
    updateCart(cart + 1);
    updateIsAddedToCart(id, action);
  };

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
                    <button
                      className="add-to-cart-button"
                      onClick={() => {
                        handleAddToCart(m.id, "add");
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
