import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../MyContext";

const PrivateRoutes = () => {
  const { currentUser } = useContext(MyContext);
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
