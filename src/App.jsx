import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Boards from "./components/Boards/Boards";
import Lists from "./components/Lists/Lists";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/boards/:boardId" element={<Lists />} />
      </Routes>
    </Router>
  );
};

export default App;
