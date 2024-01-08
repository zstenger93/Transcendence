import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "../../images/pongbg.png";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import { useTranslation } from "react-i18next";
import { WelcomeButtonStyle } from "../../components/buttons/ButtonStyle";
import LoseScreen from '../../components/game/LoseScreen';
import WinScreen from '../../components/game/WinScreen';
import handleResize from "../../components/game/HandleResize";
import FullScreenButton from "../../components/buttons/FullScreen";

const GameCanvas = () => {
  // Default Parameters
  let resize = true;
  const defaultSpeedX = 300;
  const winScore = 2;
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

  // This function Updates The Ball Positions
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

  // this function draws scores
  const drawScores = (ctx, canvas) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "80px Helvetica";
    ctx.fillText(`${scoreLeft}`, canvas.width / 2 - 100, 100);
    ctx.fillText(`${scoreRight}`, canvas.width / 2 + 60, 100);
  };
  // this Function Surprise draws a ball
  const drawBall = (ctx, canvas) => {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize * sizeSpeedRatio, 0, Math.PI * 2);
    ctx.fillStyle = "#00FF00";
    ctx.fill();
    ctx.closePath();
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
    ctx.fillRect(
      canvas.width - paddleWidth,
      rightPaddleY,
      paddleWidth,
      paddleHeight
    );
    updateBallPosition(canvas);
    drawBall(ctx, canvas);
    drawScores(ctx, canvas);
    requestAnimationFrame(draw);
  };

  useEffect(() => {
    const playerSpeed = 30;
    const keysPressed = {};

    const handleKeyDown = (event) => {
      keysPressed[event.key] = true;
      handleKeys();
    };

    const handleKeyUp = (event) => {
      keysPressed[event.key] = false;
      handleKeys();
    };

    const handleKeys = () => {
      if (canvasRef.current) {
        // Left paddle controls
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (keysPressed["w"]) leftPaddleY -= playerSpeed * sizeSpeedRatio;
        if (keysPressed["s"]) leftPaddleY += playerSpeed * sizeSpeedRatio;
        leftPaddleY = Math.max(
          0,
          Math.min(leftPaddleY, canvasRef.current.height - paddleHeight)
        );

        // Right paddle controls
        if (keysPressed["ArrowUp"])
          // eslint-disable-next-line react-hooks/exhaustive-deps
          rightPaddleY -= playerSpeed * sizeSpeedRatio;
        if (keysPressed["ArrowDown"])
          rightPaddleY += playerSpeed * sizeSpeedRatio;
        rightPaddleY = Math.max(
          0,
          Math.min(rightPaddleY, canvasRef.current.height - paddleHeight)
        );
      }
    };
    // touchpad controlls
    const handleTouchMove = (event) => {
      if (canvasRef.current) {
        const touches = event.touches;
        const rect = canvasRef.current.getBoundingClientRect();
        for (let i = 0; i < touches.length; i++) {
          const touch = touches[i];
          const touchY = event.touches[i].clientY - rect.top - window.scrollY;
          // Left paddle controls
          if (touch.clientX < window.innerWidth / 2) {
            leftPaddleY = touchY - paddleHeight / 2;
            leftPaddleY = Math.max(
              0,
              Math.min(leftPaddleY, canvasRef.current.height - paddleHeight)
            );
          }
          // Right paddle controls
          else {
            rightPaddleY = touchY - paddleHeight / 2;
            rightPaddleY = Math.max(
              0,
              Math.min(rightPaddleY, canvasRef.current.height - paddleHeight)
            );
          }
        }
      }
    };

    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("resize", () => handleResize(
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
    ));
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
      document.removeEventListener("keyup", handleKeyUp);
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

const Pong = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);

  const handleButtonClick = () => {
    setGameStarted(true);
  };

  return (
    <div id="oP" className="flex justify-center items-center h-screen">
      <FullScreenButton location={location} page="oP" />
      {gameStarted ? (
        <GameCanvas className="m-4" />
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
          </div>
          <BackButton navigate={navigate} t={t} />
        </div>
      )}
    </div>
  );
};

export default Pong;
