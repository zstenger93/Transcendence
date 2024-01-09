import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EndScreen = ({
  Game,
  backgroundImage,
  WelcomeButtonStyle,
  BackButton,
  score,
}) => {
  const [gameStarted, setGameStarted] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {gameStarted ? (
        <Game />
      ) : (
        <div className="relative">
          <img
            src={backgroundImage}
            style={{ width: "80vw", height: "100%", objectFit: "cover" }}
            alt="Background"
            className="rounded-xl shadow-lg"
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
              -translate-y-1/2 text-center font-bold font-nosifer flex flex-col items-center justify-center"
          >
            <p>{t("YOU BOUNCED THE BALL")}</p>
            <p>{t(score)}</p>
            <p>{t("TIMES!")}</p>
            <button
              onClick={handleButtonClick}
              className={`mt-10 ${WelcomeButtonStyle}`}
            >
              {t("Play Again")}
            </button>
          </div>
          <BackButton navigate={navigate} t={t} />
        </div>
      )}
    </div>
  );
};

export default EndScreen;
