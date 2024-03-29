import React, { useEffect, useState } from "react";
import backgroundImage from "../../images/pongbg.png";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import { useTranslation } from "react-i18next";
import { WelcomeButtonStyle } from "../../components/buttons/ButtonStyle";

function drawOnSelectionCanvas() {
  const canvas = document.getElementById("selectionCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = canvas.width * 4;
  canvas.height = canvas.height * 4;
  ctx.fillRect(10, 10, 100, 50);
  ctx.strokeText("Selection Page Content", 50, 30);
}

const Tournament = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pageToRender, setPageToRender] = useState(0);
  useEffect(() => {
    if (pageToRender === 1) {
      drawOnSelectionCanvas();
    }
  }, [pageToRender]);

  function createTournomentButtonClicked() {
    setPageToRender(1);
  }

  function startTournomentButtonPressed() {
    setPageToRender(2);
  }

  function tournomentPage() {
    return (
      <div className="flex justify-center items-center h-screen">
        <canvas
          style={{
            width: "80vw",
            height: "45vw",
            objectFit: "cover",
            backgroundColor: "black",
            border: "1px solid white",
          }}
        ></canvas>
      </div>
    );
  }

  function selectionPage() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <canvas
            id="selectionCanvas"
            style={{
              width: "80vw",
              height: "45vw",
              objectFit: "cover",
              backgroundColor: "black",
              border: "1px solid white",
            }}
          ></canvas>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-center font-bold font-nosifer">
            <button
              onClick={startTournomentButtonPressed}
              className={`mt-10 ${WelcomeButtonStyle}`}
            >
              {t("Start Tournament")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  function startPage() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <img
            src={backgroundImage}
            style={{ width: "80vw", height: "45vw", objectFit: "cover" }}
            alt="Background"
            className="rounded-xl shadow-lg"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-center font-bold font-nosifer">
            <button
              onClick={createTournomentButtonClicked}
              className={`mt-10 ${WelcomeButtonStyle}`}
            >
              {t("Create Torunament")}
            </button>
          </div>
          <BackButton navigate={navigate} t={t} />
        </div>
      </div>
    );
  }

  switch (pageToRender) {
    case 0:
      return startPage();
    case 1:
      return selectionPage();
    case 2:
      return tournomentPage();
    default:
      return startPage();
  }
};

export default Tournament;
