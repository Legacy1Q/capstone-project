import { useState, useEffect } from "react";
import Modal from "react-modal";
import Rating from "react-rating-stars-component";
import "./Games.css";

Modal.setAppElement("#root");

function Games() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [games, setGames] = useState([]);
  const [editedDataId, setEditedDataId] = useState(null);
  const [gameReviews, setGameReviews] = useState([]);
  const [modalDisplay, setModalDisplay] = useState(false);
  const uniqueGameIds = [
    ...new Set(gameReviews.map((review) => review.games.id)),
  ];

  useEffect(() => {
    fetch("http://localhost:8080/games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error("Error fetching data:", error));
    fetch("http://localhost:8080/gameReviews")
      .then((response) => response.json())
      .then((data) => setGameReviews(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function submitHandler() {
    if (review == "" || rating == 0) {
      return alert("Please enter a review or rating!");
    }
    gameReview();

    alert("Added review successfully!");
    setReview("");
    setModalDisplay(false);
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

  const averageGameRating = uniqueGameIds.map((id) =>
    calculateAverageRatingForId(gameReviews, "game", id)
  );

  const reviewHandler = (object) => {
    openModal();
    setEditedDataId(object.id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  return (
    <div className="games">
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
          {games.find((game) => game.id === editedDataId)?.title}
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
          <tbody>
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
      <h1>Games</h1>
      <div className="games__body">
        <div className="games__container">
          <div className="row">
            {games.map((item) => (
              <div className="col-6 col-md-4" key={item.id}>
                <div className="game-card">
                  <div className="game-poster-container">
                    <img
                      src="./images/starfield.jpg"
                      alt=""
                      className="displayed-img"
                      onClick={() => {
                        reviewHandler(item.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Games;
