import { useState } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CircleIcon from "@mui/icons-material/Circle";
import { useContext } from "react";
import { MyContext } from "../MyContext";

function Nav(updateSearchedData) {
  const { adminEmail, updateAdminEmail, cart } = useContext(MyContext);
  const [searchQuery, setSearchQuery] = useState("");
  // const navigate = useNavigate();

  // const handleSearch = async () => {
  //   if (searchQuery.toLowerCase() === "ahsoka") {
  //     navigate(`/ahsoka`);
  //   } else {
  //     alert("Media not found");
  //   }
  // };

  const handleKeyPress = (e) => {
    if (e.key === "enter") {
      fetchSearchedData();
    }
  };

  const LogoutHandler = () => {
    updateAdminEmail("");
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
      `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => updateSearchedData(response.results))
      .catch((err) => console.error(err));
  };

  return (
    <div className="nav">
      {/* Logo */}
      <div className="nav__header">
        <Link to="/">
          <img
            src="./images/criticfusion-low-resolution-logo-color-on-transparent-background.png"
            alt="logo"
          />
        </Link>
      </div>

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
              className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              type="button"
              onClick={fetchSearchedData}
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
