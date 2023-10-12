import { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CircleIcon from "@mui/icons-material/Circle";
import Youtube from "react-youtube";
import { useContext } from "react";
import { MyContext } from "../MyContext";
import Modal from "react-modal";

function Nav() {
  const { adminEmail, updateAdminEmail, cart } = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchData] = useState([]);
  const [editedDataId, setEditedDataId] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [isSearchedDataModalOpen, setIsSearchedDataModalOpen] = useState(false);
  const [isClickedDataModalOpen, setIsClickedDataModalOpen] = useState(false);
  const [isTrailerModalOpen, setIsTrailerModalOpen] = useState(false);
  const apiKey = "e4ea514e7e06ce24e90f01250baf128d"; // Replace with your actual API key
  // const navigate = useNavigate();

  // const handleSearch = async () => {
  //   if (searchQuery.toLowerCase() === "ahsoka") {
  //     navigate(`/ahsoka`);
  //   } else {
  //     alert("Media not found");
  //   }
  // };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchSearchedData();
      setIsSearchedDataModalOpen(true);
    }
  };

  const LogoutHandler = () => {
    updateAdminEmail("");
  };

  const closeModal = () => {
    setIsSearchedDataModalOpen(false);
    setIsTrailerModalOpen(false);
    setIsClickedDataModalOpen(false);
  };

  const trailerClickHandler = () => {
    setIsTrailerModalOpen(true);
    setIsSearchedDataModalOpen(false);
    // setIsClickedDataModalOpen(false);
  };

  function imageClickHandler(id) {
    setEditedDataId(id);
    setIsClickedDataModalOpen(true);
    fetchMovieTrailer(id);
    // setIsSearchedDataModalOpen(false);
  }

  const clickedDataBackBtnHandler = () => {
    setIsClickedDataModalOpen(false);
  };

  const trailerBackBtnHandler = () => {
    setIsTrailerModalOpen(false);
    setIsSearchedDataModalOpen(true);
  };

  const fetchSearchedData = () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGVhNTE0ZTdlMDZjZTI0ZTkwZjAxMjUwYmFmMTI4ZCIsInN1YiI6IjY1MjU3M2IxZWE4NGM3MDBjYTBkZjdlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xgAT0y0vFTJfz9DiT9osIniggrIg2ShMRxjgyxb7GPw",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSearchData(response.results))
      .catch((err) => console.error(err));
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

  return (
    <div className="nav">
      {/* Logo */}
      <Modal
        isOpen={isSearchedDataModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "80%",
            margin: "auto",
            height: "90%",
            padding: "0",
          },
        }}
      >
        <div className="modal-header sticky-header">
          <h2>Movies related to: {searchQuery}</h2>
          <button
            type="button"
            className="btn-close close-btn float-end"
            onClick={closeModal}
            aria-label="Close"
          ></button>
        </div>

        <div className="modal-images row">
          {searchedData.map(
            (item) =>
              item.poster_path && (
                <div
                  key={item.id}
                  className="searched-data-modal modal-image col-3"
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                    alt={item.title}
                    className="modal-img img-fluid"
                    onClick={() => {
                      imageClickHandler(item.id);
                    }}
                  />
                </div>
              )
          )}
        </div>
      </Modal>
      <Modal
        isOpen={isClickedDataModalOpen}
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
            {searchedData.find((item) => item.id === editedDataId)?.title ||
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
                searchedData.find((item) => item.id === editedDataId)
                  ?.poster_path
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
              <h3>
                {
                  searchedData.find((item) => item.id === editedDataId)
                    ?.overview
                }
              </h3>
            </div>
            <hr />
            <div style={{ flex: 2 }}>
              <p>
                Release date:{" "}
                {
                  searchedData.find((item) => item.id === editedDataId)
                    ?.release_date
                }
              </p>
              <p>
                Popularity:{" "}
                {
                  searchedData.find((item) => item.id === editedDataId)
                    ?.popularity
                }
              </p>
              <p>
                Vote count:{" "}
                {
                  searchedData.find((item) => item.id === editedDataId)
                    ?.vote_count
                }
              </p>
              <p>
                Vote average:{" "}
                {
                  searchedData.find((item) => item.id === editedDataId)
                    ?.vote_average
                }
              </p>
              <div>
                {/* Click button to view trailer:{" "} */}
                <button
                  className="btn btn-primary"
                  style={{
                    position: "absolute", // Set position to absolute
                    bottom: "3rem", // Adjust top to position it from the top
                    fontSize: "1.5rem",
                  }}
                  onClick={trailerClickHandler}
                >
                  Trailer
                </button>
                <button
                  className="btn btn-danger"
                  style={{
                    position: "absolute", // Set position to absolute
                    bottom: "3rem", // Adjust top to position it from the top
                    right: "30px", // Adjust right to position it from the right
                    fontSize: "1.5rem",
                  }}
                  onClick={clickedDataBackBtnHandler}
                >
                  Back
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

      <Link to="/">
        <div className="nav__header">
          <img
            src="./images/criticfusion-low-resolution-logo-color-on-transparent-background.png"
            alt="logo"
          />
        </div>
      </Link>

      {/* Search Bar */}
      <div className="nav__search">
        <div className="mb-3">
          <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <input
              type="search"
              className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDownCapture={handleKeyPress}
            />

            <button
              className="relative z-[2] flex items-center rounded-r px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              onClick={() => {
                fetchSearchedData();
                setIsSearchedDataModalOpen(true);
              }}
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="nav__links">
        <Link to="/movies">Movies</Link>
        <Link to="/tv">TV</Link>
        <Link to="/games">Games</Link>
        <Link to="/collection/MovieShelfCollections">Collections</Link>
        <Link to="/merch">Merch</Link>
        {adminEmail && <Link to="/admin">Admin</Link>}
      </div>

      {/* Additional Links */}
      <div className="nav__login">
        {adminEmail ? adminEmail : <Link to="/login">Login</Link>}
        <button className={adminEmail ? "" : "hide"} onClick={LogoutHandler}>
          Logout
        </button>
        <CircleIcon className="circle_icon" />
        <span>
          <Link to="/cart">
            <ShoppingBagIcon />
            <p className="cart-count">{cart}</p>
          </Link>
        </span>
      </div>
    </div>
  );
}

export default Nav;
