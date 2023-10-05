import { useState, useEffect } from "react";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Rating from "react-rating-stars-component";

Modal.setAppElement("#root");

function Home() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [movies, setMovies] = useState([]);
  const [editedDataId, setEditedDataId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function submitHandler() {
    const response = await fetch("http://localhost:8080/addReview", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        review: review,
        rating: rating,
        movie: {
          id: editedDataId,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert("Added review successfully!");
    closeModal();
  }

  const reviewHandler = (object) => {
    openModal();
    setEditedDataId(object.id);
  };

  // const submitHandler = () => {
  //   console.log(review);
  //   console.log(rating);
  // };

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="home">
      {/* Carousel */}
      <div className="home__carousel">
        <div className="carousel__container">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <Link to="/ahsoka">
                <img src="./images/ahsoka.jpg" alt="" />
              </Link>
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
      {/* Body */}
      <div className="home__body">
        <div className="body__container">
          <div className="row">
            <div className="col-12">
              <div className="body__container__1">
                <div className="body__container__1__title">
                  <h1>Movies</h1>
                </div>
                {movies.map((movie) => (
                  <div
                    className="inline"
                    key={movie.id}
                    onClick={() => reviewHandler(movie)}
                  >
                    <img src="./images/oppenheimer2.webp" alt="" />
                    {/* <img src={`./images/${movie.image}`} alt={movie.title} /> */}
                    <p>{movie.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                width: "60%",
                margin: "auto",
                height: "60%",
              },
            }}
          >
            <h2>Review Modal {editedDataId}</h2>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control form-control-md"
                placeholder="Review"
                id="floatingInput"
                onInput={(e) => setReview(e.target.value)}
              />
              <label htmlFor="floatingInput">Review</label>
            </div>

            <div className="rating">
              <Rating
                count={5}
                onChange={(newRating) => {
                  setRating(newRating);
                }}
                size={100}
                color="gray"
                activeColor="#FFD700"
              />
            </div>
            <h2 className="rating-text">Rating</h2>
            <button
              className="form-button button1 button-submit"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button
              className="form-button button1 button-cancel"
              onClick={closeModal}
            >
              Cancel
            </button>
          </Modal>
          <div className="row">
            <div className="col-12">
              <div className="body__container__2">
                <div className="body__container__2__title">
                  <h1>TV</h1>
                </div>
                <Link to="/ahsoka">
                  <img src="./images/ahsoka 1440.jpg" alt="" />
                </Link>
                <img src="./images/one piece 1440.jpg" alt="" />
                <img src="./images/stranger things.webp" alt="" />
                <img src="./images/the rookie 1440.jpg" alt="" />
                <img src="./images/wednesday 1440.avif" alt="" />
                <img src="./images/yellowstone 1440.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="body__container__2">
                <div className="body__container__2__title">
                  <h1>Games</h1>
                </div>
                <img src="./images/Baldur's Gate 3.avif" alt="" />
                <img src="./images/starfield.jpg" alt="" />
                <img src="./images/nba-2k24.jpg" alt="" />
                <img src="./images/warzone.jpg" alt="" />
                <img src="./images/apex legends.jpg" alt="" />
                <img src="./images/lies of p.jpg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
