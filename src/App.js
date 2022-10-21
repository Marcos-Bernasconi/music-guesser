import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Home.js";
import Game from "./Game.js";

function App() {
  return (
  <Router>
  <Routes>
  <Route path="/music-guesser" element={<Home/>}></Route>
  <Route path="/music-guesser/game" element={<Game/>}></Route>
</Routes>




  </Router>
  )
}

export default App;
