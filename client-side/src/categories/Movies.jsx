import { useEffect, useState } from "react";
import "./Movies.css";
import Modal from "react-modal";
import Youtube from "react-youtube";
import Pagination from "../pagination/Pagination";

Modal.setAppElement("#root");

function Movies() {
  const [data, setData] = useState([]);
  const [isMovieModalOpen, setIsMovieModalOpen] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [editedDataId, setEditedDataId] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const options = [
    "Discover",
    "Trending",
    "Now Playing",
    "Popular",
    "Top Rated",
    "Upcoming",
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const apiKey = "e4ea514e7e06ce24e90f01250baf128d"; // Replace with your actual API key

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setCurrentPage(1);
  };

  const closeModal = () => {
    setIsMovieModalOpen(false);
    setIsTrailerModalOpen(false);
  };

  function imageClickHandler(id) {
    setEditedDataId(id);
    setIsMovieModalOpen(true);
    fetchMovieTrailer(id);
  }

  const trailerClickHandler = () => {
    setIsTrailerModalOpen(true);
    setIsMovieModalOpen(false);
  };

  const fetchMovieTrailer = (id) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((response) => {
        setMovieTrailer(response.videos.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const apiUrlTemplate = (category, page) => {
      return `https://api.themoviedb.org/3/${category}?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`;
    };
    if (selectedOption === "Discover") {
      fetch(apiUrlTemplate("discover/movie", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption === "Trending") {
      fetch(apiUrlTemplate("trending/movie/day", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption === "Now Playing") {
      fetch(apiUrlTemplate("movie/now_playing", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption === "Popular") {
      fetch(apiUrlTemplate("movie/popular", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption === "Top Rated") {
      fetch(apiUrlTemplate("movie/top_rated", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption == "Upcoming") {
      fetch(apiUrlTemplate("movie/upcoming", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedOption, currentPage]);

  return (
    <div className="movies">
      {/* {searchedData ? } */}
      <Modal
        isOpen={isMovieModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "70%",
            margin: "auto",
            height: "90%",
            overflow: "hidden",
            // zIndex: 10,
          },
        }}
      >
        <div className="modal-header">
          <h2>
            {data.find((item) => item.id === editedDataId)?.title ||
              "Item not found"}
          </h2>
          <button
            type="button"
            className="btn-close close-btn"
            onClick={closeModal}
            aria-label="Close"
          ></button>
        </div>
        <hr />
        <div style={{ display: "flex", maxHeight: "100%" }}>
          <div style={{ flex: 1 }}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${
                data.find((item) => item.id === editedDataId)?.poster_path
              }`}
              alt=""
              style={{ width: "100%", height: "90%" }}
              className="modal-img"
            />
          </div>
          <div
            style={{
              flex: 1,
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
            className="data-div"
          >
            <div style={{ flex: 2, marginBottom: "20px" }}>
              {/* <h2 className="overview-text">Overview</h2> */}
              <h3>{data.find((item) => item.id === editedDataId)?.overview}</h3>
            </div>
            <hr />
            <div style={{ flex: 2 }}>
              <p>
                Release date:{" "}
                {data.find((item) => item.id === editedDataId)?.release_date}
              </p>
              <p>
                Popularity:{" "}
                {data.find((item) => item.id === editedDataId)?.popularity}
              </p>
              <p>
                Vote count:{" "}
                {data.find((item) => item.id === editedDataId)?.vote_count}
              </p>
              <p>
                Vote average:{" "}
                {data.find((item) => item.id === editedDataId)?.vote_average}
              </p>
              <p>
                Click button to view trailer:{" "}
                <button onClick={trailerClickHandler}>Trailer</button>
              </p>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={isTrailerModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            display: "flex", // Set display to flex
            alignItems: "center", // Center vertically
            justifyContent: "center",
            width: "50%",
            margin: "auto",
            height: "60%",
            overflow: "hidden",
            // position: "relative",
          },
        }}
      >
        <button
          type="button"
          className="btn-close close-btn"
          onClick={closeModal}
          aria-label="Close"
          style={{
            position: "absolute", // Set position to absolute
            top: "10px", // Adjust top to position it from the top
            right: "10px", // Adjust right to position it from the right
          }}
        ></button>
        <Youtube
          videoId={
            movieTrailer &&
            (movieTrailer.length > 0
              ? (
                  movieTrailer.find((vid) => vid.name === "Official Trailer") ||
                  movieTrailer.find((vid) => vid.name.includes("Trailer"))
                )?.key
              : "Sorry, no trailer was found.")
          }
        />
      </Modal>
      <h1 className="movies__title">Movies</h1>
      <div className="option">
        <h2 className="text">Categories: </h2>
        <select
          className="select"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="movies__body">
        <div className="movies__container">
          <div className="row">
            {data.map((item) => (
              <div className="col-6 col-md-4" key={item.id}>
                <div className="movie-card">
                  <div className="movie-poster-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${
                        item.poster_path ? item.poster_path : item.backdrop_path
                      }`}
                      alt={item.title}
                      className="displayed-image"
                      onClick={() => {
                        imageClickHandler(item.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
}

export default Movies;
