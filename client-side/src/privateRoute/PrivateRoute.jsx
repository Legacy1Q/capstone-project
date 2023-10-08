import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { MyContext } from "../MyContext";

const PrivateRoutes = () => {
  const { adminEmail } = useContext(MyContext);
  return adminEmail ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
