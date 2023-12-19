import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ChoosePongMode() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-10 bg-gray-900 bg-opacity-80 rounded shadow-xl">
        <Link
          to="/originalpong"
          className="mb-4 bg-purple-900 bg-opacity-80 font-nosifer hover:bg-purple-700 
		  text-white font-bold py-2 px-4 rounded block text-center"
        >
          Original Pong
        </Link>
        <Link
          to="/multiplayer"
          className="mb-4 bg-purple-900 bg-opacity-80 font-nosifer hover:bg-purple-700 
		  text-white font-bold py-2 px-4 rounded block text-center"
        >
          Multiplayer
        </Link>
        <Link
          to="/moddedpong"
          className="mb-4 bg-purple-900 bg-opacity-80 font-nosifer hover:bg-purple-700 
		  text-white font-bold py-2 px-4 rounded block text-center"
        >
          Modded Pong
        </Link>
        <Link
          to="/pongai"
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block text-center"
        >
          Pong against AI
        </Link>
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-purple-900 bg-opacity-80 font-nosifer hover:bg-purple-700 
			text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChoosePongMode;
