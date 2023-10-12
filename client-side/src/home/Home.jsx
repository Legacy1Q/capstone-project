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
  const [rating, setRating] = useState(0);
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);
  const [games, setGames] = useState([]);
  const [editedDataId, setEditedDataId] = useState(null);
  const [category, setCategory] = useState("");
  const [movieReviews, setMovieReviews] = useState([]);
  const [gameReviews, setGameReviews] = useState([]);
  const [tvReviews, setTvReviews] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);
  const uniqueMovieIds = [
    ...new Set(movieReviews.map((review) => review.movie.id)),
  ];
  const uniqueTvIds = [...new Set(tvReviews.map((review) => review.tv.id))];
  const uniqueGameIds = [
    ...new Set(gameReviews.map((review) => review.games.id)),
  ];

  useEffect(() => {
    fetch("http://localhost:8080/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error("Error fetching data:", error));
    fetch("http://localhost:8080/tv")
      .then((response) => response.json())
      .then((data) => setTvs(data))
      .catch((error) => console.error("Error fetching data:", error));
    fetch("http://localhost:8080/games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching data:", error));
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
  }, []);

  function submitHandler() {
    if (review == "" || rating == 0) {
      return alert("Please enter a review or rating!");
    }
    category == "MovieReview"
      ? movieReview()
      : category == "GameReview"
      ? gameReview()
      : tvReview();

    alert("Added review successfully!");
    setReview("");
    setModalDisplay(false);
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
    const newData = await response.json();
    setMovieReviews((prevMovieReviews) => [...prevMovieReviews, newData]);
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
    const newData = await response.json();
    setGameReviews((prevGameReviews) => [...prevGameReviews, newData]);
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
    const newData = await response.json();
    setTvReviews((prevTvReviews) => [...prevTvReviews, newData]);
  }

  function calculateAverageRatingForId(reviews, category, id) {
    let filteredReviews;
    if (category === "movie") {
      filteredReviews = reviews.filter(
        (review) => review.movie && review.movie.id === id
      );
    } else if (category === "tv") {
      filteredReviews = reviews.filter(
        (review) => review.tv && review.tv.id === id
      );
    } else {
      filteredReviews = reviews.filter(
        (review) => review.games && review.games.id === id
      );
    }

    if (filteredReviews.length === 0) {
      return 0;
    }

    const totalRating = filteredReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / filteredReviews.length;
    return averageRating.toFixed(1);
  }

  const averageMovieRating = uniqueMovieIds.map((id) =>
    calculateAverageRatingForId(movieReviews, "movie", id)
  );

  const averageTvRating = uniqueTvIds.map((id) =>
    calculateAverageRatingForId(tvReviews, "tv", id)
  );

  const averageGameRating = uniqueGameIds.map((id) =>
    calculateAverageRatingForId(gameReviews, "game", id)
  );

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
      <div
        className={
          isModalOpen ? "home__carousel negative-index" : "home__carousel"
        }
      >
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
            ? movies.find((movie) => movie.id === editedDataId)?.title
            : category == "TvReview"
            ? tvs.find((tv) => tv.id === editedDataId)?.title
            : games.find((game) => game.id === editedDataId)?.title}
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
              setModalDisplay(false);
              setReview("");
              setRating(0);
            }}
            aria-label="Close"
          ></button>
        </h2>
        <div className={!modalDisplay ? "hide" : "form-floating mb-3"}>
          <input
            type="text"
            className="form-control form-control-md"
            placeholder="Review"
            id="floatingInput"
            value={modalDisplay ? review : ""}
            onInput={(e) => setReview(e.target.value)}
          />
          <label htmlFor="floatingInput">Review</label>
        </div>
        <div className={!modalDisplay ? "hide" : "rating"}>
          <Rating
            count={5}
            onChange={(newRating) => {
              setRating(newRating);
            }}
            size={100}
            color="gray"
            activeColor={"#FFD700"}
          />
        </div>
        <h2 className={!modalDisplay ? "hide" : "rating-text"}>Rating</h2>
        <table
          className={
            !modalDisplay
              ? "table table-striped table-hover modal-table"
              : "hide"
          }
        >
          <thead>
            <tr>
              <th scope="col" className="col-10">
                Review
              </th>
              <th scope="col" className="col-2">
                Rating
              </th>
            </tr>
          </thead>
          <tbody className={category == "MovieReview" ? "" : "hide"}>
            {movieReviews
              .filter((movie) => movie.movie.id === editedDataId)
              .sort((a, b) => b.id - a.id)
              .map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.review}</td>
                  <td>{movie.rating}</td>
                </tr>
              ))}
          </tbody>
          <tbody className={category == "TvReview" ? "" : "hide"}>
            {tvReviews
              .filter((tv) => tv.tv.id === editedDataId)
              .map((tv) => (
                <tr key={tv.id}>
                  <td>{tv.review}</td>
                  <td>{tv.rating}</td>
                </tr>
              ))}
          </tbody>
          <tbody className={category == "GameReview" ? "" : "hide"}>
            {gameReviews
              .filter((game) => game.games.id === editedDataId)
              .map((game) => (
                <tr key={game.id}>
                  <td>{game.review}</td>
                  <td>{game.rating}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <button
          className={
            modalDisplay == false ? "hide" : "form-button button1 button-submit"
          }
          onClick={submitHandler}
        >
          Submit
        </button>
        <button
          className={
            modalDisplay == false ? "hide" : "form-button button1 button-cancel"
          }
          onClick={() => {
            setModalDisplay(false);
            closeModal();
            setReview("");
            setRating(0);
          }}
        >
          Cancel
        </button>
      </Modal>
      <div className="home__body">
        <div className="body__container">
          <div className="row">
            <div className="col-12">
              <div className="body__container__1">
                <div className="body__container__1__title">
                  <h1>Movies</h1>
                </div>
                {movies.map((movie) => (
                  <div className="inline image-container" key={movie.id}>
                    <img
                      className="image"
                      src="./images/oppenheimer2.webp"
                      alt=""
                    />
                    <div className="overlay">
                      <button
                        className="button btn-trailer"
                        onClick={() => window.open(movie.trailerUrl)}
                      >
                        Trailer
                      </button>
                      <button
                        className="button btn-review"
                        onClick={() => reviewHandler(movie, "MovieReview")}
                      >
                        Review
                      </button>
                    </div>
                    <p>{movie.title}</p>
                    {averageMovieRating.find(
                      (rating, index) => uniqueMovieIds[index] === movie.id
                    ) != null ? (
                      <p>
                        Rating:{" "}
                        {averageMovieRating.find(
                          (rating, index) => uniqueMovieIds[index] === movie.id
                        )}
                        {" stars"}
                      </p>
                    ) : (
                      <p>No reviews</p>
                    )}
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
                {/* <Link to="/ahsoka">
                  <img src="./images/ahsoka 1440.jpg" alt="" />
                </Link> */}
                {tvs.map((tv) => (
                  <div className="inline image-container" key={tv.id}>
                    <img
                      className="image"
                      src="./images/one piece 1440.jpg"
                      alt=""
                    />
                    <div className="overlay">
                      <button
                        className="button btn-trailer"
                        onClick={() => window.open(tv.trailerUrl)}
                      >
                        Trailer
                      </button>
                      <button
                        className="button btn-review"
                        onClick={() => reviewHandler(tv, "MovieReview")}
                      >
                        Review
                      </button>
                    </div>
                    <p>{tv.title}</p>
                    {averageTvRating.find(
                      (rating, index) => uniqueTvIds[index] === tv.id
                    ) != null ? (
                      <p>
                        Rating:{" "}
                        {averageTvRating.find(
                          (rating, index) => uniqueTvIds[index] === tv.id
                        )}{" "}
                        {" stars"}
                      </p>
                    ) : (
                      <p>No reviews</p>
                    )}
                  </div>
                ))}
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
                  <div className="inline image-container" key={game.id}>
                    <img
                      className="image"
                      src="./images/starfield.jpg"
                      alt=""
                    />
                    <div className="overlay">
                      <button
                        className="button btn-trailer"
                        onClick={() => window.open(game.trailerUrl)}
                      >
                        Trailer
                      </button>
                      <button
                        className="button btn-review"
                        onClick={() => reviewHandler(game, "GameReview")}
                      >
                        Review
                      </button>
                    </div>
                    <p>{game.title}</p>
                    {averageGameRating.find(
                      (rating, index) => uniqueGameIds[index] === game.id
                    ) != null ? (
                      <p>
                        Rating:{" "}
                        {averageGameRating.find(
                          (rating, index) => uniqueGameIds[index] === game.id
                        )}
                        {" stars"}
                      </p>
                    ) : (
                      <p>No reviews</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
