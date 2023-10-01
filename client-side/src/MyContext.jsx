// MyContext.js
import { createContext, useState } from "react";

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [adminEmail, setAdminEmail] = useState(null);

  const updateAdminEmail = (updateValue) => {
    setAdminEmail(updateValue);
  };

  return (
    <MyContext.Provider value={{ adminEmail, updateAdminEmail }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
