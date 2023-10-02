import { useState } from "react";
// import "./Admin.css";

function App() {
  const [movies, setMovies] = useState([
    { id: 1, title: "Movie 1", genre: "Action" },
    { id: 2, title: "Movie 2", genre: "Comedy" },
    { id: 3, title: "Movie 3", genre: "Drama" },
  ]);

  const [newMovie, setNewMovie] = useState({ title: "", genre: "" });
  const [editMovieId, setEditMovieId] = useState(null);
  const [editedMovie, setEditedMovie] = useState({ title: "", genre: "" });

  const handleAddMovie = () => {
    if (newMovie.title.trim() === "" || newMovie.genre.trim() === "") return;
    const movieToAdd = {
      id: Date.now(),
      title: newMovie.title,
      genre: newMovie.genre,
    };
    setMovies([...movies, movieToAdd]);
    setNewMovie({ title: "", genre: "" });
  };

  const handleEditMovie = (movie) => {
    setEditMovieId(movie.id);
    setEditedMovie({ title: movie.title, genre: movie.genre });
  };

  const handleUpdateMovie = () => {
    if (editedMovie.title.trim() === "" || editedMovie.genre.trim() === "")
      return;
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === editMovieId
          ? { ...movie, title: editedMovie.title, genre: editedMovie.genre }
          : movie
      )
    );
    setEditMovieId(null);
    setEditedMovie({ title: "", genre: "" });
  };

  const handleDeleteMovie = (movieId) => {
    setMovies(movies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div>
      <h1>Movie CRUD Example</h1>

      <h2>Add Movie</h2>
      <input
        type="text"
        placeholder="Enter title"
        value={newMovie.title}
        onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Enter genre"
        value={newMovie.genre}
        onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
      />
      <button onClick={handleAddMovie}>Add Movie</button>

      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.genre}){" "}
            <button onClick={() => handleEditMovie(movie)}>Edit</button>
            <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editMovieId && (
        <div>
          <h2>Edit Movie</h2>
          <input
            type="text"
            placeholder="Enter title"
            value={editedMovie.title}
            onChange={(e) =>
              setEditedMovie({ ...editedMovie, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter genre"
            value={editedMovie.genre}
            onChange={(e) =>
              setEditedMovie({ ...editedMovie, genre: e.target.value })
            }
          />
          <button onClick={handleUpdateMovie}>Update</button>
        </div>
      )}
    </div>
  );
}

export default App;
