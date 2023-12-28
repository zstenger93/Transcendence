import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

function ChoosePongMode() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-10 bg-gray-900 bg-opacity-80 rounded shadow-xl">
        <Link
          to="/originalpong"
          className="mb-4 bg-purple-900 bg-opacity-80 font-nosifer 
		    hover:bg-purple-700 text-white font-bold py-2 px-4 rounded 
		      block text-center border-b-2 border-r-2 border-purple-600"
        >
          {t("Original Pong")}
        </Link>
        <Link
          to="/multiplayer"
          className="mb-4 bg-purple-900 bg-opacity-80 font-nosifer 
		    hover:bg-purple-700 text-white font-bold py-2 px-4 rounded 
		      block text-center  border-b-2 border-r-2 border-purple-600"
        >
          {t("Multiplayer")}
        </Link>
        <Link
          to="/moddedpong"
          className="mb-4 bg-purple-900 bg-opacity-80 font-nosifer 
		    hover:bg-purple-700 text-white font-bold py-2 px-4 rounded 
		      block text-center  border-b-2 border-r-2 border-purple-600"
        >
          {t("Modded Pong")}
        </Link>
        <Link
          to="/aiopponent"
          className="mb-4 bg-purple-900 bg-opacity-80 font-nosifer 
		    hover:bg-purple-700 text-white font-bold py-2 px-4 rounded 
		      block text-center  border-b-2 border-r-2 border-purple-600"
        >
          {t("Pong against AI")}
        </Link>
        <Link
          to="/pong3d"
          className="mb-4 bg-purple-900 bg-opacity-80 font-nosifer 
		    hover:bg-purple-700 text-white font-bold py-2 px-4 rounded 
		      block text-center  border-b-2 border-r-2 border-purple-600"
        >
          {t("3D Pong")}
        </Link>
        <div className="flex items-center justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mt-6 bg-purple-900 bg-opacity-80 font-nosifer 
			  hover:bg-purple-700 text-white font-bold py-2 px-4 rounded
          border-b-2 border-r-2 border-purple-600"
          >
            {t("Back")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChoosePongMode;
