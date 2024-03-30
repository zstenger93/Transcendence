import React, { useRef, useEffect, useState } from "react";
import backgroundImage from "../../images/pongbg.png";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import { useTranslation } from "react-i18next";
import { WelcomeButtonStyle } from "../../components/buttons/ButtonStyle";

const Tournament = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pageToRender, setPageToRender] = useState(0);
  const canvasRef = useRef(null);

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

  function drawOnSelectionCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  }

  function tournomentPage() {
    return (
      <div className="flex justify-center items-center h-screen">
        <canvas
          ref={canvasRef}
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
            ref={canvasRef}
            id="selectionCanvas"
            style={{
              width: "80vw",
              height: "45vw",
              objectFit: "cover",
              backgroundColor: "black",
              border: "1px solid white",
            }}
          ></canvas>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold font-nosifer">
            <button
              onClick={startTournomentButtonPressed}
              className={`mt-10 ${WelcomeButtonStyle}`}
            >
              {t("Start Tournament")}
            </button>
          </div>
          <div
            style={{
              position: "absolute",
              height: "100%",
              width: "25%",
              backgroundColor: "#8C8C8C",
              transform: "translateY(-100%) translateX(300%)",
              border: "1px solid white",
            }}
          >
            <div
              style={{
                height: "30%",
                width: "100%",
                backgroundColor: "#BFBFBF",
                border: "1px solid white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                style={{
                  height: "20%",
                  width: "80%",
                  margin: "5%",
                  textIndent: "1vw",
                }}
              ></input>
              <button
                style={{
                  width: "80%",
                  height: "20%",
                  backgroundColor: "#0D0D0D",
                  border: "1px solid white",
                  color: "white",
                  margin: "5%",
                  fontFamily: "Nosifer",
                  fontSize: "1vw",
                }}
              >
                Add
              </button>
            </div>
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
