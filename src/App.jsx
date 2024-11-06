import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Boards from "./components/Boards/Boards";
import Lists from "./components/Lists/Lists";
import Navbar from "./components/Navbar";
import NotFoundPage from "./Pages/NotFoundPage";
import ErrorPage from "./Pages/ErrorPage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Boards />} />
        <Route path="/boards/:boardId" element={<Lists />} />
        <Route path="/ErrorPage" element={<ErrorPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
