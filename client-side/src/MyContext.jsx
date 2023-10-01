// MyContext.js
import { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const updateIsAdmin = (updateValue) => {
    setIsAdmin(updateValue);
  };

  return (
    <MyContext.Provider value={{ isAdmin, updateIsAdmin }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
