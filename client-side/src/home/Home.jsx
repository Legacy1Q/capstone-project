import { useState } from 'react';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';




function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
      setIndex(selectedIndex);
  };

  return (
    <div className="home">
      
      {/* Carousel */}
      <div className='home__carousel'>
        <div className="carousel__container">
          <div className="row">
            <Carousel activeIndex={index} 
                      onSelect={handleSelect}
                      prevIcon={<img src="./images/left_arrow_icon.png" alt="Previous" />}
                      nextIcon={<img src="./images/right_arrow_icon.png" alt="Next" />}>
              <Carousel.Item>
                <img src="./images/ahsoka.jpg" alt="" /> 
              </Carousel.Item>
              <Carousel.Item>
                <img src="./images/red dead 2.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="./images/oppenheimer.jpeg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="./images/barbie.jpg" alt="" />
              </Carousel.Item>
              <Carousel.Item>
                <img src="./images/mortal kombat 1.jpg" alt="" />
              </Carousel.Item>
          </Carousel>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="home__body">
        <div className="body__container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div className="body__container__1">
                <div className="body__container__1__title">
                  <h1>Movies</h1>
                </div>
                <img src="./images/barbie 1440.jpg" alt="" />
                <img src="./images/oppenheimer 1440.jpg" alt="" />
                <img src="./images/talk to me 1440.jpg" alt="" />
                <img src="./images/tmnt.webp" alt="" />
                <img src="./images/john wick 4.jpg" alt="" />
                <img src="./images/fast x.jpg" alt="" />
                <img src="./images/cocaine bear.jpeg" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="body__container__2">
                <div className="body__container__2__title">
                  <h1>TV Shows</h1>
                </div>
                <img src="./images/ahsoka 1440.jpg" alt="" />
                <img src="./images/one piece 1440.jpg" alt="" />
                <img src="./images/stranger things.webp" alt="" />
                <img src="./images/talk to me 1440.jpg" alt="" />
                <img src="./images/the rookie 1440.jpg" alt="" />
                <img src="./images/wednesday 1440.avif" alt="" />
                <img src="./images/yellowstone 1440.jpg" alt="" />

              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="body__container__3">
                <div className="body__container__3__title">
                  <h1>Games</h1>
                </div>
                <img src="./images/Baldur's Gate 3.avif" alt="" />
                <img src="./images/starfield.jpg" alt="" />
                <img src="./images/nba-2k24.jpg" alt="" />
                <img src="./images/fc24.webp" alt="" />
                <img src="./images/warzone.jpg" alt="" />
                <img src="./images/apex legends.jpg" alt="" />
                <img src="./images/lies of p.jpg" alt="" />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  )
}

export default Home;
