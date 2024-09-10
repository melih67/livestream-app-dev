import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Welcome to Livestream App</h1>
      <Link to="/stream">Watch Stream</Link>
      <br />
      <Link to="/streamer">Start Streaming</Link>
    </div>
  );
};

export default Home;
