import React from "react";
import backgroundImage from "../images/bg0.png";

function Matchmaking() {
  return (
    <div
      className="flex flex-col items-center justify-center 
	  h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
}

export default Matchmaking;
