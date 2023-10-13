import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Admin.css";

function Admin() {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState({
    title: "",
    description: "",
    imageFilename: "",
    trailerUrl: "",
  });
  const [editedDataId, setEditedDataId] = useState(null);
  const [editedData, setEditedData] = useState({
    title: "",
    description: "",
    imageFilename: "",
    trailerUrl: "",
  });
  // const [selectedFile, setSelectedFile] = useState(null);
  const options = ["Movie", "Tv", "Game"];
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [displayForm, setDisplayForm] = useState("hide");
  const [displayDatas, setDisplayDatas] = useState("");
  const [displayAddButton, setDisplayAddButton] = useState(
    "btn btn-primary btn-lg float-end buttons"
  );
  const [displayCategories, setDisplayCategories] = useState("option");

  let endpoint;
  selectedOption == "Movie"
    ? (endpoint = "movies")
    : selectedOption == "Tv"
    ? (endpoint = "tv")
    : (endpoint = "games");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // const handleFileSelect = (e) => {
  //   const file = e.target.files[0];
  //   setSelectedFile(file);
  // };

  const handleAddButtonClick = (event) => {
    event.preventDefault();
    setDisplayDatas("hide");
    setDisplayCategories("hide");
    setDisplayForm("");
    setDisplayAddButton("hide");
  };

  const cancelHandler = () => {
    setDisplayDatas("");
    setDisplayForm("hide");
    setEditedDataId(null);
    setDisplayAddButton("btn btn-primary btn-lg float-end buttons");
    setDisplayCategories("option");
  };

  async function fetchDatas() {
    const response = await fetch("http://localhost:8080/" + endpoint);
    const data = await response.json();
    setData(data);
  }

  async function addHandler(event) {
    event.preventDefault();
    if (
      !newData.trailerUrl ||
      !newData.title ||
      !newData.imageFilename ||
      !newData.description
    ) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill in all fields!",
        showConfirmButton: true,
        timer: 15000,
      });
      return;
    }

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
        imageFilename: newData.imageFilename,
        trailerUrl: newData.trailerUrl,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Added successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setData((prevDatas) => [...prevDatas, data]);
    setNewData({
      title: "",
      description: "",
      imageFilename: "",
      trailerUrl: "",
    });
    // setSelectedFile(null);
    cancelHandler();
  }

  async function updateHandler(event) {
    event.preventDefault();
    console.log(editedData.imageFilename);
    if (
      !editedData.title ||
      !editedData.description ||
      !editedData.imageFilename ||
      !editedData.trailerUrl
    ) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please fill in all fields!",
        showConfirmButton: true,
        timer: 15000,
      });
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
          imageFilename: editedData.imageFilename,
          trailerUrl: editedData.trailerUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    setDisplayAddButton("btn btn-primary btn-lg float-end buttons");
    setDisplayCategories("option");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Updated successfully!",
      showConfirmButton: false,
      timer: 1500,
    });
    setDisplayDatas("");
    fetchDatas();
    setEditedDataId(null);
  }

  useEffect(() => {
    fetch("http://localhost:8080/" + endpoint)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedOption]);

  const editButtonHandler = (data) => {
    setDisplayDatas("hide");
    setEditedDataId(data.id);
    setEditedData({
      title: data.title,
      description: data.description,
      imageFilename: data.imageFilename,
      trailerUrl: data.trailerUrl,
    });
    setDisplayAddButton("hide");
    setDisplayCategories("hide");
  };

  const deleteHandler = (dataId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const apiUrl =
          "http://localhost:8080/delete" + selectedOption + "/" + dataId;
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
          .then(() => {
            fetchDatas();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="admin">
      <h1>Admin</h1>

      <div className={displayCategories}>
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
        <button className={displayAddButton} onClick={handleAddButtonClick}>
          Add data
        </button>
      </div>

      <div className={displayForm}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control-md admin-form"
            placeholder="Title"
            id="floatingInput"
            value={newData.title}
            onInput={(e) => setNewData({ ...newData, title: e.target.value })}
          />
          <label htmlFor="floatingInput" className="admin-label">
            Title
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control-md admin-form"
            placeholder="Description"
            id="floatingInput"
            value={newData.description}
            onInput={(e) =>
              setNewData({ ...newData, description: e.target.value })
            }
          />
          <label htmlFor="floatingInput" className="admin-label">
            Description
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control-md admin-form"
            placeholder="Image Url"
            id="floatingInput"
            value={newData.imageFilename}
            onInput={(e) =>
              setNewData({ ...newData, imageFilename: e.target.value })
            }
          />
          <label htmlFor="floatingInput" className="admin-label">
            Image Url
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control form-control-md admin-form"
            placeholder="Trailer Url"
            id="floatingInput"
            value={newData.trailerUrl}
            onInput={(e) =>
              setNewData({ ...newData, trailerUrl: e.target.value })
            }
          />
          <label htmlFor="floatingInput" className="admin-label">
            Trailer Url
          </label>
        </div>
        {/* <div className="form-floating mb-3">
          <input
            type="file"
            className="form-control form-control-md admin-form admin-file"
            onChange={handleFileSelect}
          />
        </div> */}
        <button
          className="form-button button1 update-button"
          onClick={addHandler}
        >
          Submit
        </button>
        <button
          className="form-button button1 cancel-button"
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </div>

      {editedDataId && (
        <div>
          {/* <h2>Edit Data</h2> */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-md admin-form"
              placeholder="Title"
              id="floatingInput"
              value={editedData.title}
              onChange={(e) =>
                setEditedData({ ...editedData, title: e.target.value })
              }
            />
            <label htmlFor="floatingInput" className="admin-label">
              Title
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-md admin-form"
              placeholder="Description"
              id="floatingInput"
              value={editedData.description}
              onChange={(e) =>
                setEditedData({ ...editedData, description: e.target.value })
              }
            />
            <label htmlFor="floatingInput" className="admin-label">
              Desription
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-md admin-form"
              placeholder="Image Url"
              id="floatingInput"
              value={editedData.imageFilename}
              onChange={(e) =>
                setEditedData({ ...editedData, imageFilename: e.target.value })
              }
            />
            <label htmlFor="floatingInput" className="admin-label">
              Image Url
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control form-control-md admin-form"
              placeholder="Trailer Url"
              id="floatingInput"
              value={editedData.trailerUrl}
              onChange={(e) =>
                setEditedData({ ...editedData, trailerUrl: e.target.value })
              }
            />
            <label htmlFor="floatingInput" className="admin-label">
              Trailer Url
            </label>
          </div>
          <button
            className="form-button button1 update-button"
            onClick={updateHandler}
          >
            Update
          </button>
          <button
            className="form-button button1 cancel-button"
            onClick={cancelHandler}
          >
            Cancel
          </button>
        </div>
      )}
      <div className={displayDatas}>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th scope="col" className="col-2">
                Title
              </th>
              <th scope="col" className="col-5">
                Description
              </th>
              <th scope="col" className="col-2">
                Image Url
              </th>
              <th scope="col" className="col-2">
                Trailer Url
              </th>
              <th scope="col" className="col-1">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data
              .sort((a, b) => b.id - a.id)
              .map((item) => (
                <tr key={item.id}>
                  <td key={item.id}>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.imageFilename}</td>
                  <td>{item.trailerUrl}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm buttons edit-btn"
                      onClick={() => editButtonHandler(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm buttons"
                      onClick={() => deleteHandler(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admin;
