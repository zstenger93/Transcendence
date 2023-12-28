import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "../images/pongCover.png";

const GameCanvas = () => {
  // Default Parameters
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
  // This is bloody AI
  const ArtificialInteligence = (ctx, canvas) => {
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

  // This Monster resized the field
  const handleResize = () => {
    if (canvasRef.current) {
      const screenWidth = window.innerWidth;
      const canvasWidth = 0.8 * screenWidth;
      const canvasHeight = (canvasWidth / 16) * 9;
      canvasRef.current.width = canvasWidth;
      canvasRef.current.height = canvasHeight;
      const sizeRatioX = canvasRef.current
        ? canvasRef.current.width / canvasWidth
        : 1;
      const sizeRatioY = canvasRef.current
        ? canvasRef.current.height / canvasHeight
        : 1;
      paddleWidth = canvasRef.current ? canvasRef.current.width / 80 : 1;
      paddleHeight = canvasRef.current ? canvasRef.current.width / 20 : 1;
      sizeSpeedRatio = canvasRef.current
        ? canvasRef.current.width / canvasDefaultWidth
        : 1;
      ballX *= sizeRatioX;
      ballY *= sizeRatioY;
      leftPaddleY *= sizeRatioY;
      rightPaddleY *= sizeRatioY;
      leftPaddleY = Math.max(
        0,
        Math.min(leftPaddleY, canvasRef.current.height - paddleHeight)
      );
      rightPaddleY = Math.max(
        0,
        Math.min(rightPaddleY, canvasRef.current.height - paddleHeight)
      );
      ballX = Math.max(0, Math.min(ballX, canvasRef.current.width));
      ballY = Math.max(0, Math.min(ballY, canvasRef.current.height));
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
        if (keysPressed["w"]) leftPaddleY -= playerSpeed * sizeSpeedRatio;
        if (keysPressed["s"]) leftPaddleY += playerSpeed * sizeSpeedRatio;
        leftPaddleY = Math.max(
          0,
          Math.min(leftPaddleY, canvasRef.current.height - paddleHeight)
        );

        // Right paddle controls
        if (keysPressed["ArrowUp"])
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
    window.addEventListener("resize", handleResize);
    handleResize();
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
          <WinScreen />
        ) : (
          <LoseScreen />
        )
      ) : (
        <canvas
          ref={canvasRef}
          className="border-8 border-solid border-white"
          style={{ backgroundColor: "#0F0F0F" }}
        ></canvas>
      )}
    </div>
  );
};

const WinScreen = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleButtonClick = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {gameStarted ? (
        <GameCanvas />
      ) : (
        <div className="relative border-8 border-white">
          <img
            src={backgroundImage}
            style={{ width: "80vw", height: "100%", objectFit: "cover" }}
            alt="Background"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p> YOU WON!</p>
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-white text-black"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const LoseScreen = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleButtonClick = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {gameStarted ? (
        <GameCanvas />
      ) : (
        <div className="relative border-8 border-white">
          <img
            src={backgroundImage}
            style={{ width: "80vw", height: "100%", objectFit: "cover" }}
            alt="Background"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <p> YOU LOST!</p>
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-white text-black"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Pong = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleButtonClick = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {gameStarted ? (
        <GameCanvas />
      ) : (
        <div className="relative border-8 border-white">
          <img
            src={backgroundImage}
            style={{ width: "80vw", height: "45vw", objectFit: "cover" }}
            alt="Background"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <button
              onClick={handleButtonClick}
              className="px-4 py-2 bg-white text-black"
            >
              Start Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pong;
