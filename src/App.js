import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home.js";
import Game from "./Game.js";

function App() {
  return (
  <Router>
  <Routes>
  <Route exact path="/" element={<Home/>}></Route>
  <Route exact path="/game" element={<Game/>}></Route>
</Routes>




  </Router>
  )
}

export default App;
