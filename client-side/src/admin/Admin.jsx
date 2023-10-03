import { useState, useEffect } from "react";
// import "./Admin.css";

function Admin() {
  const [data, setData] = useState([]);

  const [newData, setNewData] = useState({ title: "", description: "" });
  const [editedDataId, setEditedDataId] = useState(null);
  const [editedData, setEditedData] = useState({
    title: "",
    description: "",
  });

  async function addHandler(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/addGame", {
      method: "POST",
      headers: {
        // "X-Api-Key": "54/p8rt+p9QhgeN9G/Z5Sg==wrJ1tX7OT2EAdJcR",
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        title: newData.title,
        description: newData.description,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert("Added successfully!");
    fetchData();
    setNewData({ ...newData, title: "", description: "" });
  }

  async function updateHandler(event) {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:8080/updateGame/" + editedDataId,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          title: editedData.title,
          description: editedData.description,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    alert("Updated successfully!");
    fetchData();
    setEditedDataId(null);
  }

  const fetchData = () => {
    fetch("http://localhost:8080/games")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(fetchData, []);

  const editButtonHandler = (movie) => {
    setEditedDataId(movie.id);
    setEditedData({ title: movie.title, description: movie.description });
  };

  const deleteHandler = (movieId) => {
    const apiUrl = "http://localhost:8080/deleteGame/" + movieId;
    fetch(apiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    alert("Deleted successfully!");
    fetchData();
  };

  return (
    <div className="admin">
      <h1>Movie CRUD Example</h1>

      <h2>Add Movie</h2>
      <input
        type="text"
        placeholder="Enter title"
        value={newData.title}
        onChange={(e) => setNewData({ ...newData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Enter description"
        value={newData.description}
        onChange={(e) =>
          setNewData({ ...newData, description: e.target.value })
        }
      />
      <button onClick={addHandler}>Add Movie</button>

      <h2>Movie List</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            title: {item.title} description: {item.description}
            <button onClick={() => editButtonHandler(item)}>Edit</button>
            <button onClick={() => deleteHandler(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editedDataId && (
        <div>
          <h2>Edit Movie</h2>
          <input
            type="text"
            placeholder="Enter title"
            value={editedData.title}
            onChange={(e) =>
              setEditedData({ ...editedData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter description"
            value={editedData.description}
            onChange={(e) =>
              setEditedData({ ...editedData, description: e.target.value })
            }
          />
          <button onClick={updateHandler}>Update</button>
        </div>
      )}
    </div>
  );
}

export default Admin;
