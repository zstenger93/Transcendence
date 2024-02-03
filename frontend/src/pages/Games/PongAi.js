import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "../../images/pongbg.png";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import { useTranslation } from "react-i18next";
import { WelcomeButtonStyle } from "../../components/buttons/ButtonStyle";
import LoseScreen from "../../components/game/LoseScreen";
import WinScreen from "../../components/game/WinScreen";
import FullScreenButton from "../../components/buttons/FullScreen";
import handleResize from "../../components/game/HandleResize";

const GameCanvas = (aiDifficulty) => {
  // Default Parameters
  const defaultSpeedX = 300;
  let resize = true;
  const winScore = 10;
  const defaultSpeedY = 20;
  const [scoreLeftReact, setScoreLeft] = useState(0);
  const [scoreRightReact, setScoreRight] = useState(0);
  let ballSize = 8;
  let scoreLeft = 0;
  let scoreRight = 0;
  const canvasRef = useRef(null);
  let paddleWidth = canvasRef.current ? canvasRef.current.width / 70 : 0;
  let paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 0;
  let leftPaddleY = canvasRef.current
    ? canvasRef.current.height / 2 - paddleHeight / 2
    : 0;
  let rightPaddleY = canvasRef.current
    ? canvasRef.current.height / 2 - paddleHeight / 2
    : 0;
  let ballX = canvasRef.current ? canvasRef.current.width / 2 : 5;
  let ballY = canvasRef.current ? canvasRef.current.height / 2 : 5;
  let ballSpeedX = defaultSpeedX;
  let ballSpeedY = defaultSpeedY;
  let canvasDefaultWidth = 1920;
  let sizeSpeedRatio = canvasRef.current
    ? canvasRef.current.width / canvasDefaultWidth
    : 1;
  let lastFrame = 0;
  let dt = 0;

  // This Function Adds A White Stripe in The middle of the map
  const drawWhiteStripe = (ctx, canvas) => {
    ctx.fillStyle = "#FFFFFF";
    const stripeWidth = 8;
    const stripeHeight = canvas.height;
    const x = canvas.width / 2 - stripeWidth / 2;
    const y = 0;
    ctx.fillRect(x, y, stripeWidth, stripeHeight);
  };

  // This is bloody AI
  const ArtificialInteligenceEasy = (ctx, canvas) => {
    const aiSpeed = 440;
    let tempPadleY = rightPaddleY;
    if (ballX > canvas.width / 4 && ballX < (canvas.width / 4) * 3) {
      if (ballY + ballSpeedY * 3 > rightPaddleY + paddleHeight / 2)
        tempPadleY += aiSpeed * dt * sizeSpeedRatio;
      else if (ballY - ballSpeedY * 3 < rightPaddleY + paddleHeight / 2)
        tempPadleY -= aiSpeed * dt * sizeSpeedRatio;
      else {
        tempPadleY -= aiSpeed * dt * sizeSpeedRatio * 0.5;
      }
    } else {
      if (ballY > rightPaddleY + paddleHeight / 2)
        tempPadleY += aiSpeed * dt * sizeSpeedRatio;
      else if (ballY < rightPaddleY + paddleHeight / 2)
        tempPadleY -= aiSpeed * dt * sizeSpeedRatio;
    }
    tempPadleY = Math.max(
      0,
      Math.min(tempPadleY, canvas.height - paddleHeight)
    );
    rightPaddleY = tempPadleY;
    ctx.fillRect(
      canvas.width - paddleWidth,
      rightPaddleY,
      paddleWidth,
      paddleHeight
    );
  };

  const ArtificialInteligenceMedium = (ctx, canvas) => {
    const aiSpeed = 440;
    let tempPadleY = rightPaddleY;
    if (ballY > rightPaddleY + paddleHeight / 2)
      tempPadleY += aiSpeed * dt * sizeSpeedRatio;
    else if (ballY < rightPaddleY + paddleHeight / 2)
      tempPadleY -= aiSpeed * dt * sizeSpeedRatio;
    tempPadleY = Math.max(
      0,
      Math.min(tempPadleY, canvas.height - paddleHeight)
    );
    rightPaddleY = tempPadleY;
    ctx.fillRect(
      canvas.width - paddleWidth,
      rightPaddleY,
      paddleWidth,
      paddleHeight
    );
  };

  const ArtificialInteligenceHard = (ctx, canvas) => {
    const aiSpeed = 440;
    let tempPadleY = rightPaddleY;
    if (ballX > canvas.width / 4 && ballX < (canvas.width / 4) * 3) {
      if (ballY + ballSpeedY * 5 > rightPaddleY + paddleHeight / 2)
        tempPadleY += aiSpeed * dt * sizeSpeedRatio;
      else if (ballY - ballSpeedY * 5 < rightPaddleY + paddleHeight / 2)
        tempPadleY -= aiSpeed * dt * sizeSpeedRatio;
    } else {
      if (ballY > rightPaddleY + paddleHeight / 2)
        tempPadleY += aiSpeed * dt * sizeSpeedRatio;
      else if (ballY < rightPaddleY + paddleHeight / 2)
        tempPadleY -= aiSpeed * dt * sizeSpeedRatio;
    }
    tempPadleY = Math.max(
      0,
      Math.min(tempPadleY, canvas.height - paddleHeight)
    );
    rightPaddleY = tempPadleY;
    ctx.fillRect(
      canvas.width - paddleWidth,
      rightPaddleY,
      paddleWidth,
      paddleHeight
    );
  };

  const ArtificialInteligenceImpossible = (ctx, canvas) => {
    let tempPadleY = rightPaddleY;
    tempPadleY = ballY - paddleHeight / 2;
    tempPadleY = Math.max(
      0,
      Math.min(tempPadleY, canvas.height - paddleHeight)
    );
    rightPaddleY = tempPadleY;
    ctx.fillRect(
      canvas.width - paddleWidth,
      rightPaddleY,
      paddleWidth,
      paddleHeight
    );
  };

  // this function draws scores
  const drawScores = (ctx, canvas) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "80px Helvetica";
    ctx.fillText(`${scoreLeft}`, canvas.width / 2 - 100, 100);
    ctx.fillText(`${scoreRight}`, canvas.width / 2 + 60, 100);
  };

  // this Function Surprise draws a ball
  const drawBall = (ctx) => {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize * sizeSpeedRatio, 0, Math.PI * 2);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
  };

  const updateBallPosition = (canvas) => {
    const ballAngleOffset = 0.02;
    const ballSpeedIncrease = 50;
    ballX += ballSpeedX * dt * sizeSpeedRatio;
    ballY += ballSpeedY * dt * sizeSpeedRatio;
    if (ballY < 0) {
      ballY = 2;
      ballSpeedY = -ballSpeedY;
    } else if (ballY > canvas.height) {
      ballY = canvas.height - 2;
      ballSpeedY = -ballSpeedY;
    }
    if (
      ballX < paddleWidth + ballSize * sizeSpeedRatio &&
      ballY > leftPaddleY &&
      ballY < leftPaddleY + paddleHeight
    ) {
      const leftPaddleCenterY = leftPaddleY + paddleHeight / 2;
      const distanceFromCenter = ballY - leftPaddleCenterY;
      ballX = paddleWidth + 10;
      ballSpeedX *= -1;
      if (ballSpeedX < 0) ballSpeedX -= ballSpeedIncrease;
      else ballSpeedX += ballSpeedIncrease;
      ballSpeedY +=
        distanceFromCenter *
        ballAngleOffset *
        sizeSpeedRatio *
        Math.abs(ballSpeedX);
    } else if (
      ballX > canvas.width - paddleWidth - ballSize * sizeSpeedRatio &&
      ballY > rightPaddleY &&
      ballY < rightPaddleY + paddleHeight
    ) {
      const rightPaddleCenterY = rightPaddleY + paddleHeight / 2;
      const distanceFromCenter = ballY - rightPaddleCenterY;
      ballX = canvas.width - paddleWidth - 10;
      ballSpeedX *= -1;
      if (ballSpeedX < 0) ballSpeedX -= ballSpeedIncrease;
      else ballSpeedX += ballSpeedIncrease;
      ballSpeedY +=
        distanceFromCenter *
        ballAngleOffset *
        sizeSpeedRatio *
        Math.abs(ballSpeedX);
    } else if (ballX + ballSize * 3 < 0) {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = defaultSpeedX;
      ballSpeedY = defaultSpeedY;
      scoreRight += 1;
      setScoreRight(scoreRight);
    } else if (ballX - ballSize * 3 > canvas.width) {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballSpeedX = -defaultSpeedX;
      ballSpeedY = -defaultSpeedY;
      scoreLeft += 1;
      setScoreLeft(scoreLeft);
    }
  };

  const playerSpeed = 10;
  let keys = {};

  const movePaddle = () => {
    if (canvasRef.current) {
      if (keys["ArrowUp"] || keys["w"])
        leftPaddleY -= playerSpeed * sizeSpeedRatio;
      else if (keys["ArrowDown"] || keys["s"])
        leftPaddleY += playerSpeed * sizeSpeedRatio;
      leftPaddleY = Math.max(
        0,
        Math.min(leftPaddleY, canvasRef.current.height - paddleHeight)
      );
    }
  };

  const draw = (timestamp) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    dt = (timestamp - lastFrame) / 1000;
    lastFrame = timestamp;
    paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 0;
    paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWhiteStripe(ctx, canvas);
    ctx.fillStyle = "#FF3366";
    ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
    if (aiDifficulty.aiDifficulty === 0) ArtificialInteligenceEasy(ctx, canvas);
    else if (aiDifficulty.aiDifficulty === 1)
      ArtificialInteligenceMedium(ctx, canvas);
    else if (aiDifficulty.aiDifficulty === 2)
      ArtificialInteligenceHard(ctx, canvas);
    else ArtificialInteligenceImpossible(ctx, canvas);
    updateBallPosition(canvas);
    drawBall(ctx, canvas);
    drawScores(ctx, canvas);
    requestAnimationFrame(draw);
    movePaddle();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      keys[event.key] = true;
    };

    const handleKeyUp = (event) => {
      keys[event.key] = false;
    };

    const handleTouchMove = (event) => {
      if (canvasRef.current && event.touches.length > 0) {
        const rect = canvasRef.current.getBoundingClientRect();
        const touchY = event.touches[0].clientY - rect.top - window.scrollY;
        leftPaddleY = touchY - paddleHeight / 2;
        leftPaddleY = Math.max(
          0,
          Math.min(leftPaddleY, canvasRef.current.height - paddleHeight)
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    document.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("resize", () =>
      handleResize(
        canvasRef,
        resize,
        paddleWidth,
        paddleHeight,
        sizeSpeedRatio,
        canvasDefaultWidth,
        ballX,
        ballY,
        leftPaddleY,
        rightPaddleY
      )
    );
    handleResize(
      canvasRef,
      resize,
      paddleWidth,
      paddleHeight,
      sizeSpeedRatio,
      canvasDefaultWidth,
      ballX,
      ballY,
      leftPaddleY,
      rightPaddleY
    );
    draw(0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);

  return (
    <div className="flex justify-center items-center h-screen">
      {scoreLeftReact === winScore || scoreRightReact === winScore ? (
        scoreLeftReact === winScore ? (
          <WinScreen
            GameCanvas={GameCanvas}
            backgroundImage={backgroundImage}
            WelcomeButtonStyle={WelcomeButtonStyle}
            BackButton={BackButton}
          />
        ) : (
          <LoseScreen
            GameCanvas={GameCanvas}
            backgroundImage={backgroundImage}
            WelcomeButtonStyle={WelcomeButtonStyle}
            BackButton={BackButton}
          />
        )
      ) : (
        <>
          <canvas
            ref={canvasRef}
            className="border-8 border-solid border-white"
            style={{ backgroundColor: "#0F0F0F" }}
          ></canvas>
        </>
      )}
    </div>
  );
};

const PongAi = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setGameDifficulty] = useState(0);
  const handleButtonClick = () => {
    setGameStarted(true);
  };

  return (
    <div id="aiP" className="flex justify-center items-center h-screen">
      <FullScreenButton location={location} page="aiP" />
      {gameStarted ? (
        <GameCanvas
          className="m-4"
          t={t}
          navigate={navigate}
          aiDifficulty={difficulty}
        />
      ) : (
        <div className="relative">
          <img
            src={backgroundImage}
            style={{ width: "80vw", height: "45vw", objectFit: "cover" }}
            alt="Background"
            className="rounded-xl shadow-lg"
          />
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 
		  -translate-y-1/2 text-center"
          >
            <button onClick={handleButtonClick} className={WelcomeButtonStyle}>
              {t("Start Game")}
            </button>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <input
                type="range"
                min="0"
                max="3"
                value={difficulty}
                onChange={(e) => setGameDifficulty(parseInt(e.target.value))}
                style={{ width: "200px", height: "25px" }}
              />
            </div>
          </div>
          <BackButton navigate={navigate} t={t} />
        </div>
      )}
    </div>
  );
};

export default PongAi;
