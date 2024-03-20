import React, { useEffect } from "react";
import { getGameRoom } from "../../components/API";

const Pong = () => {
  useEffect(() => {
    async function getData() {
      const data = await getGameRoom({
        redirectUri: "http://localhost:8000",
        userName: "asdfasdf",
      });

      console.log(data);
      const room_name = data.room_name;
      // const user1 = data.user1;
      // const user2 = data.user2;
      const sender = data.sender;
      const player0 = data.player0;
      const player1 = data.player1;

      const gameSocket = new WebSocket(
        process.env.REACT_APP_LOCAL_URI.replace("https", "wss") +
          "/game/" +
          room_name +
          "/"
      );

      let canvas = document.getElementById("gameCanvas");
      let context = canvas.getContext("2d");
      gameSocket.onopen = function (event) {
        gameSocket.send("Connection established.");
        console.log("Connection established");
      };
      gameSocket.onmessage = function (event) {
        const receivedData = JSON.parse(event.data);
        if (receivedData["type"] === "game_message") {
          renderGameFrame(receivedData);
        }
        // else if (receivedData['type'] === 'countdown_message') {
        //     renderCountdown(receivedData);
        // }
        else if (receivedData["type"] === "ending_message") {
          window.location.href =
            "https://10.12.2.2/game/ending/?gameinfo=" +
            receivedData["score"] +
            "&gametag=" +
            receivedData["game_tag"] +
            "&roomname=" +
            room_name;
        }
      };
      const renderGameFrame = (gameData) => {
        if (context && canvas) {
          clearCanvas();
          drawField();
          var score = player0 + "  " + gameData.score + " " + player1;
          displayScore(score);
          drawPaddle(0, gameData.player0, 10, 110);
          drawPaddle(1, gameData.player1, 10, 110);
          drawBall(
            gameData.ball_x,
            gameData.ball_y,
            gameData.ball_speed_x,
            gameData.ball_speed_y,
            gameData.ball_speed
          );
        }
      };

      const clearCanvas = () => {
        if (context && canvas) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      function hexToRgb(hex) {
        // Remove the hash if it exists
        hex = hex.replace(/^#/, "");

        // Parse the hex values to separate R, G, B components
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;

        // Return the RGB values as an object
        return { r, g, b };
      }

      const drawBall = (x, y, speedX, speedY, ballSpeed) => {
        if (context) {
          // Define a color gradient based on speed
          const colorGradient = [
            { speed: 7, color: "#ffff00" },
            { speed: 10, color: "#ff4d00" },
            { speed: 13, color: "#ff0000" },
            { speed: 18, color: "#0000ff" },
            { speed: 50, color: "#bf00ff" },
          ];

          // Find the color corresponding to the ball's speed in the gradient
          let ballColor = "white"; // Default color
          for (const { speed, color } of colorGradient) {
            if (ballSpeed <= speed) {
              ballColor = color;
              break;
            }
          }

          // Display the magnitude of the speed
          context.fillStyle = ballColor;
          context.font = "14px Arial";
          let show_speed = `Speed: ${ballSpeed.toFixed(3)}`;
          context.fillText(show_speed, x - 30, y - 30);

          // Draw the main ball
          context.fillStyle = ballColor;
          context.beginPath();
          context.arc(x, y, 10, 0, Math.PI * 2);
          context.fill();
          context.closePath();

          // Draw the trailing circles
          const trailCount = 5; // Adjust the number of circles in the trail
          const trailSpacing = 1.5; // Adjust the spacing between circles in the trail

          for (let i = 1; i <= trailCount; i++) {
            const trailOpacity = 1 - i / trailCount;
            const trailRadius = i * trailSpacing;

            const rgb = hexToRgb(ballColor);
            context.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${trailOpacity})`; // Yellow color with variable opacity
            context.beginPath();
            context.arc(
              x - speedX * trailRadius,
              y - speedY * trailRadius,
              10,
              0,
              Math.PI * 2
            );
            context.fill();
            context.closePath();
          }
        }
      };

      const drawPaddle = (player, y, width, height) => {
        if (context) {
          if (player === 0) {
            context.fillStyle = "red"; // Player 0 Paddle color
            context.fillRect(0, y, width, height);
          } else {
            context.fillStyle = "blue"; // Player 1 Paddle color
            context.fillRect(790, y, width, height);
          }
        }
      };

      const drawField = () => {
        if (context) {
          context.fillStyle = "#ffffff";
          context.fillRect(398, 0, 4, 400);
        }
      };

      const displayScore = (score) => {
        if (context) {
          context.fillStyle = "white";
          context.fillRect(285, 5, 240, 70);
          context.fillStyle = "black";
          context.fillText("Score!", 295, 40);
          context.fillText(score, 300, 65);
        }
      };

      const handleKeyDown = (event) => {
        // console.log(event.key)
        // const user = JSON.parse(document.getElementById('sender').textContent)
        const user = sender;
        // {#console.log(user);#}
        if (event.key === "w") {
          // Handle Player 0 UP key press
          gameSocket.send("pw" + user);
        } else if (event.key === "s") {
          // Handle Player 0 DOWN key press
          gameSocket.send("ps" + user);
        } else if (event.key === "i") {
          // Handle Player 1 UP key press
          gameSocket.send("pi" + user);
        } else if (event.key === "k") {
          // Handle Player 1 DOWN key press
          gameSocket.send("pk" + user);
        }
      };

      const handleKeyUp = (event) => {
        // const user = JSON.parse(document.getElementById('sender').textContent)
        const user = sender;
        // {#console.log(user);#}
        if (event.key === "w") {
          // Handle Player 0 UP key press
          gameSocket.send("rw" + user);
        } else if (event.key === "s") {
          // Handle Player 0 DOWN key press
          gameSocket.send("rs" + user);
        } else if (event.key === "i") {
          // Handle Player 1 UP key press
          gameSocket.send("ri" + user);
        } else if (event.key === "k") {
          // Handle Player 1 DOWN key press
          gameSocket.send("rk" + user);
        }
      };

      const startGame = () => {
        gameSocket.send("startgame");
      };

      document.addEventListener("keyup", handleKeyUp);
      document.addEventListener("keydown", handleKeyDown);
      const startButton = document.getElementById("startGame");
      startButton.addEventListener("click", startGame);

      // Cleanup function
      return () => {
        gameSocket.close();
        document.removeEventListener("keyup", handleKeyUp);
        document.removeEventListener("keydown", handleKeyDown);
        startButton.removeEventListener("click", startGame);
      };
    }
    getData();
  }, []);

  return (
    <div
      id="game-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <canvas
        id="gameCanvas"
        width="1000"
        height="700"
        style={{ backgroundColor: "black" }}
      ></canvas>
      <button id="startGame">Start Game</button>
    </div>
  );
};

export default Pong;
