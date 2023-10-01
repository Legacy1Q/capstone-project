// import { useState } from 'react';
import "./MovieShelfCollections.css";
// import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from "react-router-dom";

function MovieShelfCollections() {
  const navigate = useNavigate();

  function horrorMovie2023Handler() {
    navigate("/collection/HorrorMovie2023");
  }
  return (
    <div className="MovieShelfCollections">
      <h1>Collections</h1>

      <button onClick={horrorMovie2023Handler}>
        Top Horror Movies of 2023
      </button>
    </div>
  );
}

export default MovieShelfCollections;
