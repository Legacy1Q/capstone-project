import { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState(null);
  const [cart, setCart] = useState(0);
  const updateAdminEmail = (updateValue) => {
    setAdminEmail(updateValue);
  };

  const updateCart = (updateValue) => {
    setCart(updateValue);
  };

  const [merch, setMerch] = useState([
    {
      id: 1,
      name: "White Hoodie Black Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt1.png",
      isAddedToCart: false,
    },
    {
      id: 2,
      name: "White T-Shirt Black Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt2.png",
      isAddedToCart: false,
    },
    {
      id: 3,
      name: "White Hoodie Classic Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt3.png",
      isAddedToCart: false,
    },
    {
      id: 4,
      name: "White T-shirt Classic Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt4.png",
      isAddedToCart: false,
    },
    {
      id: 5,
      name: "White Hoodie Black Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt5.png",
      isAddedToCart: false,
    },
    {
      id: 6,
      name: "White T-Shirt Black Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt6.png",
      isAddedToCart: false,
    },
    {
      id: 7,
      name: "White Hoodie Classic Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt7.png",
      isAddedToCart: false,
    },
    {
      id: 8,
      name: "White T-shirt Classic Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt8.png",
      isAddedToCart: false,
    },
    {
      id: 9,
      name: "Black Hoodie White Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt9.png",
      isAddedToCart: false,
    },
    {
      id: 10,
      name: "Black T-shirt White Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt10.png",
      isAddedToCart: false,
    },
    {
      id: 11,
      name: "Black Hoodie Classic Logo",
      price: 39.99,
      image: "../../merchImages/criticfusionshirt11.png",
      isAddedToCart: false,
    },
    {
      id: 12,
      name: "Black T-shirt Classic Logo",
      price: 24.99,
      image: "../../merchImages/criticfusionshirt12.png",
      isAddedToCart: false,
    },
    {
      id: 13,
      name: "Barbie Unisex T-Shirt",
      price: 24.99,
      image: "../../merchImages/barbie.png",
      isAddedToCart: false,
    },
    {
      id: 14,
      name: "Ahsoka Unisex T-shirt",
      price: 24.99,
      image: "../../merchImages/ahsoka.png",
      isAddedToCart: false,
    },
    {
      id: 15,
      name: "Spider-Man: Across the Spider-Verse",
      price: 29.99,
      image: "../../merchImages/spoodlydoodly.png",
      isAddedToCart: false,
    },
    {
      id: 16,
      name: "Loki: The Complete First Season",
      price: 59.99,
      image: "../../merchImages/ThorsBrother.png",
      isAddedToCart: false,
    },
    {
      id: 17,
      name: "Assassin&apos;s Creed: Mirage",
      price: 59.99,
      image: "../../merchImages/CreedofAssassins.png",
      isAddedToCart: false,
    },
    {
      id: 18,
      name: "It Lives Inside Movie Poster",
      price: 19.99,
      image: "../../merchImages/InsideItLives.png",
      isAddedToCart: false,
    },
    {
      id: 19,
      name: "Five Nights at Freddy&apos;s High Tops",
      price: 59.99,
      image: "../../merchImages/PitaNooooo.png",
      isAddedToCart: false,
    },
  ]);

  const updateIsAddedToCart = (id, action) => {
    const updatedMerch = [...merch];
    const itemIndex = id - 1;
    if (itemIndex >= 0 && itemIndex < updatedMerch.length) {
      if (action == "add") {
        updatedMerch[itemIndex] = {
          ...updatedMerch[itemIndex],
          isAddedToCart: true,
        };
      } else {
        updatedMerch[itemIndex] = {
          ...updatedMerch[itemIndex],
          isAddedToCart: false,
        };
      }
      setMerch(updatedMerch);
    }
  };

  return (
    <MyContext.Provider
      value={{
        adminEmail,
        updateAdminEmail,
        cart,
        updateCart,
        merch,
        updateIsAddedToCart,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
