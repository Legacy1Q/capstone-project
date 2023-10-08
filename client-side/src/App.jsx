import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "./home/Nav";
import Home from "./home/Home";
import Ahsoka from "./review/Ahsoka";
import Footer from "./home/Footer";
import MovieShelfCollections from "./collection/MovieShelfCollections";
import HorrorMovie2023 from "./collection/HorrorMovie2023";
import Login from "./login/Login";
import Movies from "./categories/Movies";
import Cart from "./cart/Cart";
import Merch from "./merch/merch";
import Admin from "./admin/Admin";
import PrivateRoute from "./privateRoute/PrivateRoute";
import { MyProvider } from "./MyContext";

function App() {
  return (
    <div className="app">
      <MyProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/collection/MovieShelfCollections"
            element={<MovieShelfCollections />}
          />
          <Route
            path="/collection/HorrorMovie2023"
            element={<HorrorMovie2023 />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/ahsoka" element={<Ahsoka />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/merch" element={<Merch />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
        <Footer />
      </MyProvider>
    </div>
  );
}

export default App;
