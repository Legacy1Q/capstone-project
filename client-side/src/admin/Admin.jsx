import { useState, useEffect } from "react";

function Admin() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({ title: "", description: "" });
  const [editedDataId, setEditedDataId] = useState(null);
  const [editedData, setEditedData] = useState({
    title: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const options = ["Movie", "Tv", "Game"];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  async function addHandler(event) {
    event.preventDefault();

    // if (!selectedFile || !newData.title || !newData.description) {
    //   alert("Please fill in all fields and select an image.");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("file", selectedFile);
    // formData.append("title", newData.title);
    // formData.append("description", newData.description);

    const response = await fetch("http://localhost:8080/add" + selectedOption, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=UTF-8",
      },
      //   body: formData,
      body: JSON.stringify({
        title: newData.title,
        description: newData.description,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    alert("Added successfully!");
    setNewData({ title: "", description: "" });
    setSelectedFile(null);
  }

  async function updateHandler(event) {
    event.preventDefault();

    if (!editedData.title || !editedData.description) {
      alert("Please fill in all fields.");
      return;
    }

    const response = await fetch(
      "http://localhost:8080/update" + selectedOption + "/" + editedDataId,
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
    setEditedDataId(null);
  }

  useEffect(() => {
    let endpoint;
    selectedOption == "Movie"
      ? (endpoint = "movies")
      : selectedOption == "Tv"
      ? (endpoint = "tv")
      : (endpoint = "games");

    fetch("http://localhost:8080/" + endpoint)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedOption, data]);

  const editButtonHandler = (movie) => {
    setEditedDataId(movie.id);
    setEditedData({ title: movie.title, description: movie.description });
  };

  const deleteHandler = (movieId) => {
    const apiUrl =
      "http://localhost:8080/delete" + selectedOption + "/" + movieId;
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
  };

  return (
    <div className="admin">
      <h1>Admin</h1>

      <div>
        <label>Categories: </label>
        <select value={selectedOption} onChange={handleOptionChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

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
      <input type="file" onChange={handleFileSelect} />
      <button onClick={addHandler}>Add Movie</button>

      <h2>{selectedOption} List</h2>
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
