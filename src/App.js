import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Stream from "./components/Stream";
import Streamer from "./components/Streamer";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stream" element={<Stream />} />
        <Route path="/streamer" element={<Streamer />} />
      </Routes>
    </Router>
  );
};

export default App;
