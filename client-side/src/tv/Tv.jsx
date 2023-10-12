import { useEffect, useState } from "react";
import "./Tv.css";
import Modal from "react-modal";
import Youtube from "react-youtube";
import Pagination from "../pagination/Pagination";

Modal.setAppElement("#root");

function Tv() {
  const [data, setData] = useState([]);
  const [isTvModalOpen, setIsTvModalOpen] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const [editedDataId, setEditedDataId] = useState(null);
  const [tvTrailer, setTvTrailer] = useState(null);
  const options = [
    "Discover",
    "Trending",
    "Airing Today",
    "Popular",
    "Top Rated",
    "On The Air",
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
    setIsTvModalOpen(false);
    setIsTrailerModalOpen(false);
  };

  function imageClickHandler(id) {
    setEditedDataId(id);
    setIsTvModalOpen(true);
    fetchTvTrailer(id);
  }

  const trailerClickHandler = () => {
    setIsTrailerModalOpen(true);
  };

  const trailerBackBtnHandler = () => {
    setIsTrailerModalOpen(false);
  };

  const fetchTvTrailer = (id) => {
    fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((response) => {
        setTvTrailer(response.videos.results);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const apiUrlTemplate = (category, page) => {
      return `https://api.themoviedb.org/3/${category}?include_adult=false&include_video=true&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${apiKey}`;
    };
    if (selectedOption === "Discover") {
      fetch(apiUrlTemplate("discover/tv", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption === "Trending") {
      fetch(apiUrlTemplate("trending/tv/day", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption === "Airing Today") {
      fetch(apiUrlTemplate("tv/airing_today", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption === "Popular") {
      fetch(apiUrlTemplate("tv/popular", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption === "Top Rated") {
      fetch(apiUrlTemplate("tv/top_rated", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    } else if (selectedOption == "On The Air") {
      fetch(apiUrlTemplate("tv/on_the_air", currentPage))
        .then((response) => response.json())
        .then((response) => {
          setData(response.results);
          setTotalPages(response.total_pages);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedOption, currentPage]);

  return (
    <div className="tv">
      {/* {searchedData ? } */}
      <Modal
        isOpen={isTvModalOpen}
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
            {data.find((item) => item.id === editedDataId)?.name ||
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
            <div style={{ flex: 3, marginBottom: "20px" }}>
              {/* <h2 className="overview-text">Overview</h2> */}
              <h3>{data.find((item) => item.id === editedDataId)?.overview}</h3>
            </div>
            <hr />
            <div style={{ flex: 2 }}>
              <p>
                Release date:{" "}
                {data.find((item) => item.id === editedDataId)?.first_air_date}
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
              <div>
                <button
                  className="btn btn-primary"
                  style={{
                    position: "absolute", // Set position to absolute
                    bottom: "3rem", // Adjust top to position it from the top
                    right: "30px", // Adjust right to position it from the right
                    fontSize: "1.5rem",
                  }}
                  onClick={trailerClickHandler}
                >
                  Trailer
                </button>
              </div>
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
          className="btn btn-danger"
          style={{
            position: "absolute", // Set position to absolute
            top: "10px", // Adjust top to position it from the top
            left: "10px", // Adjust right to position it from the right
            fontSize: "1.5rem",
          }}
          onClick={trailerBackBtnHandler}
        >
          Back
        </button>
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
            tvTrailer &&
            (tvTrailer.length > 0
              ? (
                  tvTrailer.find((vid) => vid.name === "Official Trailer") ||
                  tvTrailer.find((vid) => vid.name.includes("Trailer"))
                )?.key
              : "Sorry, no trailer was found.")
          }
        />
      </Modal>
      <h1 className="tv__title">TV</h1>
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

      <div className="tv__body">
        <div className="tv__container">
          <div className="row">
            {data.map((item) => (
              <div className="col-6 col-md-4" key={item.id}>
                <div className="tv-card">
                  <div className="tv-poster-container">
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

export default Tv;
