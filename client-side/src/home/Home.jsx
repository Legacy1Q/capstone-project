import './Home.css';
import { useEffect, useState } from 'react';



function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex => (prevIndex) + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  
  return (
    <div className="home">

      {/* Carousel */}
      <div className='home__carousel'>
        <div id="carouselExample" className="carousel-slide">
          <div className="carousel-inner">
          {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                <img src={`./images/Baldur's Gate 3.avif`} className="d-block w-100" alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

    </div>
  )
}

export default Home;
