import { Routes, Route } from "react-router-dom";
import Nav from "./home/Nav";
import Home from "./home/Home";
import ReviewTV from "./review/ReviewTV";
import Footer from "./home/Footer";
import Collections from "./collection/HorrorMovie2023";
import Login from "./login/Login";
import Movies from "./categories/Movies";

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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
