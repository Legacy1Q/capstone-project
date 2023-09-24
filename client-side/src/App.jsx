import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Nav from "./home/Nav";
import Collections from "./collection/HorrorMovie2023";
import Login from "./login/Login";

function App() {
  return (
    <div className="app">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
