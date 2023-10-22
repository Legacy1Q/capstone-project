import { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [cartTotal, setCartTotal] = useState(0);
  const [guestCart, setGuestCart] = useState([{}]);
  const updateCurrentUser = (updateValue) => {
    setCurrentUser(updateValue);
    fetchCartTotal();
  };

  function fetchCartTotal() {
    let userId;
    currentUser === null ? (userId = 0) : (userId = currentUser.id);
    if (userId === 0) {
      return setCartTotal(0);
    }
    fetch("http://localhost:8080/cart")
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data
          .filter((c) => c.admin?.id === userId)
          .reduce((sum, item) => sum + item.quantity, 0);
        setCartTotal(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function updateGuestCart(quantity, merchId) {
    setGuestCart({ quantity: quantity, merchId: merchId });

    // console.log(guestCart);
  }

  // useEffect(() => {
  //   fetchCartTotal();
  // }, []);

  const [merch, setMerch] = useState([]);

  const updateIsAddedToCart = (id, quantity, type) => {
    const updatedMerch = [...merch];
    const itemIndex = id - 1;
    if (type === "add") {
      if (updatedMerch[itemIndex].isAddedToCart) {
        updatedMerch[itemIndex] = {
          ...updatedMerch[itemIndex],
          quantity: updatedMerch[itemIndex].quantity + quantity,
        };
      } else {
        updatedMerch[itemIndex] = {
          ...updatedMerch[itemIndex],
          quantity: quantity,
          isAddedToCart: true,
        };
      }
    } else {
      if (itemIndex >= 0 && itemIndex < updatedMerch.length) {
        updatedMerch[itemIndex] = {
          ...updatedMerch[itemIndex],
          quantity: quantity,
          isAddedToCart: quantity === 0 ? false : true,
        };
      }
    }
    setMerch(updatedMerch);
  };

  return (
    <MyContext.Provider
      value={{
        currentUser,
        updateCurrentUser,
        cartTotal,
        fetchCartTotal,
        merch,
        updateIsAddedToCart,
        guestCart,
        updateGuestCart,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
