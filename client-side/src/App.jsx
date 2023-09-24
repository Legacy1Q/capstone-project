// import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Nav from "./home/Nav";
import Login from "./login/Login";

function App() {
  return (
    <div className="app">
      {/* <Router>
        <Nav />
        <Switch>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </Router> */}

      <Nav />
      <Home />
    </div>
  );
}

export default App;
