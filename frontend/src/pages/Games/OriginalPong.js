import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";

const Pong = () => {
  const sender = useRef(null);
  const player0 = useRef(null);
  const player1 = useRef(null);
  const game_socket = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const accessToken = Cookies.get("access");

      if (!accessToken) {
        window.location.href = "/404.html";
      }
    }, 1000);
	// eslint-disable-next-line
    function randomString(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    async function getData() {
      if (!game_socket.current) {
        game_socket.current = new WebSocket("wss://10.12.2.2/game/pong/");
      }
      game_socket.current.onopen = function (event) {
        console.log("Data:" + JSON.stringify(received_data));
        console.log("WebSocket is open now.!!!!!!!!!!!!!!!");
      };
      game_socket.current.onclose = function (event) {
        console.log("WebSocket is closed now.!!!!!!!!!!!!!!", event.data);
      };
      game_socket.onerror = function (error) {
        console.error("WebSocket error:?????????", error);
      };

      let canvas = document.getElementById("gameCanvas");
      canvas.width = 1000;
      canvas.height = 700;
      let context = canvas.getContext("2d");
      let received_data;
      game_socket.current.onmessage = function (event) {
        received_data = JSON.parse(event.data);

        if (received_data["type"] === "game_message") {
          sender.current = received_data["sender"];
          player0.current = received_data["users"][0];
          player1.current = received_data["users"][1];
          render_game_frame(received_data);
        } else if (received_data["type"] === "ending_message") {
          console.log("Received Data: " + JSON.stringify(received_data));
          clear_canvas();
          display_end_score(received_data["game_state"]);
          game_socket.current.close();
        }
      };

      const render_game_frame = (game_data) => {
        if (context && canvas) {
          clear_canvas();
          drawField();
          var score =
            player0.current + "  " + game_data.score + " " + player1.current;
          display_score(score);
          draw_paddle(0, game_data.player0, 10, 110);
          draw_paddle(1, game_data.player1, 10, 110);
          drawBall(game_data.ball_x, game_data.ball_y);
        }
      };

      const clear_canvas = () => {
        if (context && canvas) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
      };

      const drawBall = (x, y) => {
        if (context) {
          let ballColor = "orange";

          context.fillStyle = ballColor;
          context.beginPath();
          context.arc(x, y, 11, 0, Math.PI * 2);
          context.fill();
          context.closePath();
        }
      };

      const draw_paddle = (player, y, width, height) => {
        if (context) {
          if (player === 0) {
            context.fillStyle = "blue";
            context.fillRect(3, y, width, height);
          } else {
            context.fillStyle = "red";
            context.fillRect(992, y, width, height);
          }
        }
      };

      const drawField = () => {
        if (context) {
          context.fillStyle = "#000000";
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
      };

      const display_score = (score) => {
        if (context) {
		  context.fillStyle = "white";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.font = "bold 24px Arial";
          context.fillText(score, canvas.width / 2, canvas.height / 2);
        }
      };


      const display_end_score = (score) => {
        if (context) {
          context.fillStyle = "white";
          context.fillRect(300, 250, 400, 140);
          context.fillStyle = "red";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.font = "bold 24px Arial";
          context.fillText("Score", canvas.width / 2, canvas.height / 2 - 40);
          context.fillText(score, canvas.width / 2, canvas.height / 2);
        }
      };

      const handleKeyDown = (event) => {
        const user = sender.current;
        console.log("Key up event: " + user);
        if (game_socket.current.readyState === WebSocket.OPEN) {
          if (event.key === "w") {
            game_socket.current.send("pw" + user);
          } else if (event.key === "s") {
            game_socket.current.send("ps" + user);
          }
        } else {
          console.log("Socket not open");
        }
      };

      const handleKeyUp = (event) => {
        const user = sender.current;
        console.log("Key up event: " + user);
        if (game_socket.current.readyState === WebSocket.OPEN) {
          if (event.key === "w") {
            game_socket.current.send("rw" + user);
          } else if (event.key === "s") {
            game_socket.current.send("rs" + user);
          }
        } else {
          console.log("Socket not open");
        }
      };

      document.addEventListener("keyup", handleKeyUp);
      document.addEventListener("keydown", handleKeyDown);

      // Cleanup function
      return () => {
        console.log("closing socket and removing listener");
        game_socket.current.close();
        document.removeEventListener("keyup", handleKeyUp);
        document.removeEventListener("keydown", handleKeyDown);
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
        style={{ backgroundColor: "black", border: "1px solid white" }}
      ></canvas>
    </div>
  );
};

export default Pong;
