// import { useState } from 'react';
import "./MovieShelfCollections.css";
// import Carousel from 'react-bootstrap/Carousel';

function MovieShelfCollections() {
  return (
    <div className="MovieShelfCollections">
      <h1>Collections</h1>

      {/* {Top Horror Movies of 2023} */}
      <div
        className="Collections"
        onClick={() => {
          window.location.href = "/horror-movies-2023";
        }}
      >
        Top Horror Movies of 2023
      </div>
    </div>
  );
}

export default MovieShelfCollections;
