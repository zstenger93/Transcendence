import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import {
  ButtonStyle,
  WelcomeButtonStyle,
} from "../../components/buttons/ButtonStyle";
import backgroundimage from "../../images/pongbg.png";

function ChoosePongMode() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="p-10 bg-gray-900 bg-opacity-80 rounded-xl shadow-xl
	   border-r-2 border-b-2 border-purple-600 "
      >
        <Link to="/originalpong" className={`mb-4 ${ButtonStyle}`}>
          {t("Original Pong")}
        </Link>
        <Link to="/pongai" className={`mb-4 ${ButtonStyle}`}>
          {t("Pong against AI")}
        </Link>
        <Link to="/pong3d" className={`mb-4 ${ButtonStyle}`}>
          {t("3D Pong")}
        </Link>
        <Link to="/multiplayer" className={`mb-8 ${ButtonStyle}`}>
          {t("Multiplayer")}
        </Link>
        <Link
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
          className={`mb-4 ${ButtonStyle}`}
        >
          {t("How to play")}
        </Link>
        <BackButton navigate={navigate} t={t} />
      </div>
      {isOpen && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundimage})` }}
        >
          <div className="flex flex-col justify-between h-full">
		  <div className="flex-grow"></div>
            <button
              onClick={() => setIsOpen(false)}
              className={`mb-12 ${WelcomeButtonStyle}`}
            >
              {t("Back")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChoosePongMode;
