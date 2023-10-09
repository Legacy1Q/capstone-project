import "./Merch.css";
import { MyContext } from "../MyContext";
import { useContext } from "react";

function Merch() {
  const { cart, updateCart } = useContext(MyContext);
  const handleAddToCart = () => {
    updateCart(cart + 1);
  };
  const merch = [
    {
      id: 1,
      name: "White Hoodie Black Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt1.png",
    },
    {
      id: 2,
      name: "White T-Shirt Black Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt2.png",
    },
    {
      id: 3,
      name: "White Hoodie Classic Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt3.png",
    },
    {
      id: 4,
      name: "White T-shirt Classic Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt4.png",
    },
    {
      id: 5,
      name: "White Hoodie Black Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt5.png",
    },
    {
      id: 6,
      name: "White T-Shirt Black Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt6.png",
    },
    {
      id: 7,
      name: "White Hoodie Classic Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt7.png",
    },
    {
      id: 8,
      name: "White T-shirt Classic Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt8.png",
    },
    {
      id: 9,
      name: "Black Hoodie White Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt9.png",
    },
    {
      id: 10,
      name: "Black T-shirt White Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt10.png",
    },
    {
      id: 11,
      name: "Black Hoodie Classic Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt11.png",
    },
    {
      id: 12,
      name: "Black T-shirt Classic Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt12.png",
    },
    {
      id: 13,
      name: "Barbie Unisex T-Shirt",
      price: 24.99,
      image: "../../merchImages/barbie.png",
    },
    {
      id: 14,
      name: "Ahsoka Unisex T-shirt",
      price: 24.99,
      image: "../../merchImages/ahsoka.png",
    },
    {
      id: 15,
      name: "Spider-Man: Across the Spider-Verse",
      price: 29.99,
      image: "../../merchImages/spoodlydoodly.png",
    },
    {
      id: 16,
      name: "Loki: The Complete First Season",
      price: 59.99,
      image: "../../merchImages/ThorsBrother.png",
    },
    {
      id: 17,
      name: "Assassin&apos;s Creed: Mirage",
      price: 59.99,
      image: "../../merchImages/CreedofAssassins.png",
    },
    {
      id: 18,
      name: "It Lives Inside Movie Poster",
      price: 19.99,
      image: "../../merchImages/InsideItLives.png",
    },
    {
      id: 19,
      name: "Five Nights at Freddy&apos;s High Tops",
      price: 59.99,
      image: "../../merchImages/PitaNooooo.png",
    },
  ];

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
                      onClick={handleAddToCart}
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
