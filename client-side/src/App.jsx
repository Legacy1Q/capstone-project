import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "./home/Nav";
import Home from "./home/Home";
import ReviewTV from "./review/ReviewTV";
import Footer from "./home/Footer";
import Collections from "./collection/HorrorMovie2023";
import Login from "./login/Login";
import Movies from "./categories/Movies";
import Cart from "./cart/Cart";

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/login" element={<Login />} />
        <Route path="/review_tv" element={<ReviewTV />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
