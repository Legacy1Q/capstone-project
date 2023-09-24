// import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Nav from "./home/Nav";
import Login from "./login/Login";

function App() {
  return (
    <div className="app">
<<<<<<< HEAD
      {/* <Router>
        <Nav />
        <Switch>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router> */
      
      }


=======
>>>>>>> 42393919e8feb3ca1d05452639ab5a2125a631f9
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
