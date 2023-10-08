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

  return (
    <MyContext.Provider
      value={{ adminEmail, updateAdminEmail, cart, updateCart }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
