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
  const [tvs, setTvs] = useState([]);
  const [games, setGames] = useState([]);
  const [editedDataId, setEditedDataId] = useState(null);
  const [category, setCategory] = useState("");
  const [movieReviews, setMovieReviews] = useState([]);
  const [gameReviews, setGameReviews] = useState([]);
  const [tvReviews, setTvReviews] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);

  useEffect(() => {
    const fetchMovies = () => {
      fetch("http://localhost:8080/movies")
        .then((response) => response.json())
        .then((data) => setMovies(data))
        .catch((error) => console.error("Error fetching data:", error));
    };
    const fetchTvs = () => {
      fetch("http://localhost:8080/tv")
        .then((response) => response.json())
        .then((data) => setTvs(data))
        .catch((error) => console.error("Error fetching data:", error));
    };
    const fetchGames = () => {
      fetch("http://localhost:8080/games")
        .then((response) => response.json())
        .then((data) => setGames(data))
        .catch((error) => console.error("Error fetching data:", error));
    };
    fetch("http://localhost:8080/movieReviews")
      .then((response) => response.json())
      .then((data) => setMovieReviews(data))
      .catch((error) => console.error("Error fetching data:", error));
    fetch("http://localhost:8080/gameReviews")
      .then((response) => response.json())
      .then((data) => setGameReviews(data))
      .catch((error) => console.error("Error fetching data:", error));
    fetch("http://localhost:8080/tvReviews")
      .then((response) => response.json())
      .then((data) => setTvReviews(data))
      .catch((error) => console.error("Error fetching data:", error));
    fetchMovies();
    fetchTvs();
    fetchGames();
  }, []);

  function submitHandler() {
    category == "MovieReview"
      ? movieReview()
      : category == "GameReview"
      ? gameReview()
      : tvReview();
    alert("Added review successfully!");
    closeModal();
  }

  async function movieReview() {
    const response = await fetch("http://localhost:8080/addMovieReview", {
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
  }

  async function gameReview() {
    const response = await fetch("http://localhost:8080/addGameReview", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        review: review,
        rating: rating,
        games: {
          id: editedDataId,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async function tvReview() {
    const response = await fetch("http://localhost:8080/addTvReview", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        review: review,
        rating: rating,
        tv: {
          id: editedDataId,
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  const reviewHandler = (object, category) => {
    openModal();
    setEditedDataId(object.id);
    setCategory(category);
  };

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
                    className="inline image-container"
                    key={movie.id}
                    // onClick={() => reviewHandler(movie, "MovieReview")}
                  >
                    <img
                      className="image"
                      src="./images/oppenheimer2.webp"
                      alt=""
                    />
                    {/* <img src={`./images/${movie.image}`} alt={movie.title} /> */}
                    <div
                      className="overlay"
                      onClick={() => reviewHandler(movie, "MovieReview")}
                    >
                      <button className="button">Review</button>
                    </div>
                    <p>{movie.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="body__container__2">
                <div className="body__container__2__title">
                  <h1>TV</h1>
                </div>
                <Link to="/ahsoka">
                  <img src="./images/ahsoka 1440.jpg" alt="" />
                </Link>
                {tvs.map((tv) => (
                  <div
                    className="inline"
                    key={tv.id}
                    onClick={() => reviewHandler(tv, "TvReview")}
                  >
                    <img src="./images/one piece 1440.jpg" alt="" />
                    <p>{tv.title}</p>
                  </div>
                ))}
                {/* <img src="./images/one piece 1440.jpg" alt="" />
                <img src="./images/stranger things.webp" alt="" />
                <img src="./images/the rookie 1440.jpg" alt="" />
                <img src="./images/wednesday 1440.avif" alt="" />
                <img src="./images/yellowstone 1440.jpg" alt="" /> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="body__container__2">
                <div className="body__container__2__title">
                  <h1>Games</h1>
                </div>
                {games.map((game) => (
                  <div
                    className="inline"
                    key={game.id}
                    onClick={() => reviewHandler(game, "GameReview")}
                  >
                    <img src="./images/starfield.jpg" alt="" />
                    <p>{game.title}</p>
                  </div>
                ))}
                {/* <img src="./images/Baldur's Gate 3.avif" alt="" />
                <img src="./images/starfield.jpg" alt="" />
                <img src="./images/nba-2k24.jpg" alt="" />
                <img src="./images/warzone.jpg" alt="" />
                <img src="./images/apex legends.jpg" alt="" />
                <img src="./images/lies of p.jpg" alt="" /> */}
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
            <h2 className="modal-title">
              {category == "MovieReview"
                ? "Movie Review"
                : category == "TvReview"
                ? "Tv Review"
                : "Game Review"}
              <button
                className="button modal-button float-start inline"
                onClick={() => {
                  setModalDisplay(!modalDisplay);
                }}
              >
                {modalDisplay ? "View reviews" : "Add reviews"}
              </button>
              <button
                type="button"
                className="btn-close float-end"
                onClick={() => {
                  setIsModalOpen(false);
                }}
                aria-label="Close"
              ></button>
            </h2>
            <div
              className={modalDisplay == false ? "hide" : "form-floating mb-3"}
            >
              <input
                type="text"
                className="form-control form-control-md"
                placeholder="Review"
                id="floatingInput"
                onInput={(e) => setReview(e.target.value)}
              />
              <label htmlFor="floatingInput">Review</label>
            </div>
            <div className={modalDisplay == false ? "hide" : "rating"}>
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
            <h2 className={modalDisplay == false ? "hide" : "rating-text"}>
              Rating
            </h2>
            <table
              className={
                modalDisplay == false
                  ? "table table-striped table-hover modal-table"
                  : "hide"
              }
            >
              <thead>
                <tr>
                  <th scope="col" className="col-1">
                    Id
                  </th>
                  <th scope="col" className="col-1">
                    Title
                  </th>
                  <th scope="col" className="col-9">
                    Review
                  </th>
                  <th scope="col" className="col-1">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className={category == "MovieReview" ? "" : "hide"}>
                {movieReviews.map((movie) => (
                  <tr key={movie.id}>
                    <th scope="row">{movie.id}</th>
                    <td key={movie.id}>{movie.movie.title}</td>
                    <td>{movie.review}</td>
                    <td>{movie.rating}</td>
                  </tr>
                ))}
              </tbody>
              <tbody className={category == "TvReview" ? "" : "hide"}>
                {tvReviews.map((tv) => (
                  <tr key={tv.id}>
                    <th scope="row">{tv.id}</th>
                    <td key={tv.id}>{tv.tv.title}</td>
                    <td>{tv.review}</td>
                    <td>{tv.rating}</td>
                  </tr>
                ))}
              </tbody>
              <tbody className={category == "GameReview" ? "" : "hide"}>
                {gameReviews.map((game) => (
                  <tr key={game.id}>
                    <th scope="row">{game.id}</th>
                    <td key={game.id}>{game.games.title}</td>
                    <td>{game.review}</td>
                    <td>{game.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className={
                modalDisplay == false
                  ? "hide"
                  : "form-button button1 button-submit"
              }
              onClick={submitHandler}
            >
              Submit
            </button>
            <button
              className={
                modalDisplay == false
                  ? "hide"
                  : "form-button button1 button-cancel"
              }
              onClick={closeModal}
            >
              Cancel
            </button>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Home;
