import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backgroundImage from "../images/bg0.png";

function Welcome() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate("/home");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover 
	  bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" flex items-center justify-center h-screen">
        <button
          className="bg-gray-900 text-gray-300 font-nosifer font-bold px-4 
		  py-2 rounded cursor-pointer hover:bg-gray-900 hover:bg-opacity-70"
          onClick={redirectToHome}
        >
          {t("Sign In")}
        </button>
      </div>
    </div>
  );
}

export default Welcome;
