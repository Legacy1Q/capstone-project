import { useEffect } from 'react';
import './Home.css';
import { Carousel, initTE, } from 'tw-elements'

function Home() {
  useEffect(() => {
    initTE({ Carousel });
  }, []);
  
  return (
    <div className="home">

      {/* Carousel */}
      <div className="home__header">
        <div className="carousel-container">
          {/* <Carousel /> */}
        </div>
      </div>

      <div className="home__body">
        <h2>Deals of the Day</h2>
        <div className="image__container">
          <img src="./images/Baldur's Gate 3.avif" alt="" />
          <img src="./images/red dead 2.jpg" alt="" />
        </div>

        <h2>Movies</h2>
        <div className="image__container">
          <img src="" alt="" />
        </div>

        <h2>TV</h2>
        <div className="image__container">
          <img src="" alt="" /> 
        </div>

        <h2>Games</h2>
        <div className="image__container">
          <img src="" alt="" />  
        </div>
      </div>

    </div>
  )
}

export default Home;
