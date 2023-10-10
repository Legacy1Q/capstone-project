import { useEffect, useState } from "react";
import "./Movies.css";

function Movies() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNGVhNTE0ZTdlMDZjZTI0ZTkwZjAxMjUwYmFmMTI4ZCIsInN1YiI6IjY1MjU3M2IxZWE4NGM3MDBjYTBkZjdlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xgAT0y0vFTJfz9DiT9osIniggrIg2ShMRxjgyxb7GPw",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setData(response.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="movies">
      <h1 className="movies__title">Movies</h1>
      <div className="movies__body">
        <div className="movies__container">
          <div className="row">
            {data.map((item) => (
              <div className="col-6 col-md-3" key={item.id}>
                <div className="movie-card">
                  <div className="movie-poster-container">
                    <img
                      src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                      alt={item.title}
                    />
                    <p className="movie-title">{item.title}</p>
                    <p>Overview: {item.overview}</p>
                    <p>Media type: {item.media_type}</p>
                    <p>Popularity: {item.popularity}</p>
                    <p>Release date: {item.release_date}</p>
                    <p>Vote average: {item.vote_average}</p>
                    <p>Vote count: {item.vote_count}</p>
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

export default Movies;

{
  /* <div className="col-12 col-md-6">
              <div className="movies__container__1">
                <img src={data.filter(data.id)} alt="" />
                <img src="./images/barbie 1440.jpg" alt="" />
                <img src="./images/cocaine bear.jpeg" alt="" />
                <img src="./images/fast x.jpg" alt="" />
                <img src="./images/john wick 4.jpg" alt="" />
                <img src="./images/talk_to_me.webp" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="movies__container__1">
                <img src="./images/creed_iii.webp" alt="" />
                <img src="./images/black_adam.webp" alt="" />
                <img src="./images/top_maverick.webp" alt="" />
                <img src="./images/megan.webp" alt="" />
                <img src="./images/black_phone.webp" alt="" />
                <img src="./images/super_mario.webp" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="movies__container__1">
                <img src="./images/blue_beetle.png" alt="" />
                <img src="./images/the_flash.webp" alt="" />
                <img src="./images/come_out_fighing.webp" alt="" />
                <img src="./images/demeter.webp" alt="" />
                <img src="./images/the_requin.webp" alt="" />
                <img src="./images/tmnt.webp" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="movies__container__1">
                <img src="./images/retribution.webp" alt="" />
                <img src="./images/tmnt.webp" alt="" />
                <img src="./images/coweb.webp" alt="" />
                <img src="./images/kandahar.webp" alt="" />
                <img src="./images/equalizer_2.webp" alt="" />
                <img src="./images/good_boys.webp" alt="" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="movies__container__1">
                <img src="./images/puss_in_boots.webp" alt="" />
                <img src="./images/crazy_rich_asians.webp" alt="" />
                <img src="./images/the_whale.jpg" alt="" />
                <img src="./images/spiral.webp" alt="" />
                <img src="./images/retribution.webp" alt="" />
                <img src="./images/the_lion_king.webp" alt="" />
              </div>
            </div> */
}
