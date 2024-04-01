import React, { useRef, useEffect, useState } from "react";
import backgroundImage from "../../images/pongbg.png";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import { useTranslation } from "react-i18next";
import { WelcomeButtonStyle } from "../../components/buttons/ButtonStyle";
import babyPic from "../../images/tournament/baby.png";
import mediumPic from "../../images/tournament/balanced.png";
import insanePic from "../../images/tournament/insane.png";
import playerPic from "../../images/tournament/player.png";
import eliminate from "../../images/tournament/eliminate.png";

class Match {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.winner = null;
    this.matchId = null;
  }

  playMatch() {}
}

class Player {
  constructor(name, mode) {
    this.name = name;
    this.mode = mode;
    this.picture = this.setPicture(mode);
    this.score = 0;
    this.x = Math.random();
    this.y = Math.random();
    this.matchHistory = [];
  }

  setPicture(mode) {
    let picture;
    switch (mode) {
      case 0:
        picture = playerPic;
        break;
      case 1:
        picture = babyPic;
        break;
      case 2:
        picture = mediumPic;
        break;
      case 3:
        picture = insanePic;
        break;
    }
    return picture;
  }
}

class TournamentData {
  constructor(players) {
    this.players = players;
    this.roundCount = 0;
    this.currentMatch = 0;
    this.curretnRound = 0;
    this.mode = 0;
    this.matches = [];
    this.matchesPlayed = [];
    this.hostory = [];
    this.randomizePlayerOrder();
  }

  randomizePlayerOrder() {
    this.players.sort(() => Math.random() - 0.5);
  }

  sortPlayersByScore() {
    this.players.sort((a, b) => b.score - a.score);
  }

  createSingleElimination() {}

  createSwiss() {}

  createRoundRobin() {}
}

const Tournament = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [pageToRender, setPageToRender] = useState(0);
  const [listOfPlayers, setListOfPlayers] = useState([]);
  let playerModeToAdd = 0;
  let tournamentModeToAdd = 0;
  let tournamentName = "Round Robin";
  let tournament = new TournamentData(listOfPlayers);

  function createTournamentButtonClicked() {
    setPageToRender(1);
  }

  function startTournamentButtonPressed() {
    if (listOfPlayers.length > 2) {
      setPageToRender(2);
      tournament = new TournamentData(listOfPlayers);
    }
  }

  function CanvasComponent() {
    useEffect(() => {
      const canvas = document.getElementById("selectionCanvas");
      const ctx = canvas.getContext("2d");
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      ctx.scale(ratio, ratio);

      for (let i = 0; i < listOfPlayers.length; i++) {
        const player = listOfPlayers[i];
        const img = new Image();

        img.onload = function () {
          const x = (player.x * canvas.width * 0.75) / 2;
          const y = (player.y * canvas.height) / 2;
          const textWidth = ctx.measureText(player.name).width;
          ctx.drawImage(img, x, y, 32, 32);
          ctx.fillStyle = "white";
          ctx.fillText(player.name, x - textWidth / 2 + 16, y - 20);
        };
        img.src = player.picture;
      }
    }, [listOfPlayers]);
    return (
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
    );
  }

  function tournamentMode(input) {
    const buttonData = [
      { id: 0, imgSrc: playerPic, alt: "Round Robin" },
      { id: 1, imgSrc: babyPic, alt: "Single Elimination" },
      { id: 2, imgSrc: mediumPic, alt: "Swiss" },
    ];
    for (let i = 0; i < 3; i++) {
      const button = document.getElementById("buttonMode" + i);
      button.style.width = "12%";
      button.style.height = "90%";
    }
    tournamentModeToAdd = input;
    tournamentName = buttonData[input].alt;
    const selectedButton = document.getElementById("buttonMode" + input);
    selectedButton.style.width = "14%";
    selectedButton.style.height = "100%";
  }

  function selectButton(input) {
    for (let i = 0; i < 4; i++) {
      const button = document.getElementById("button" + i);
      button.style.width = "12%";
      button.style.height = "90%";
    }
    playerModeToAdd = input;
    const selectedButton = document.getElementById("button" + input);
    selectedButton.style.width = "14%";
    selectedButton.style.height = "100%";
  }

  function addPlayer() {
    const input = document.querySelector("input");
    const name = input.value;
    if (name === "") {
      return;
    }
    for (let i = 0; i < listOfPlayers.length; i++) {
      const player = listOfPlayers[i];
      if (player.name === name) {
        return;
      }
    }
    setListOfPlayers((prevPlayers) => [
      ...prevPlayers,
      new Player(name, playerModeToAdd),
    ]);
  }

  function removePlayer(index) {
    setListOfPlayers((prevPlayers) =>
      prevPlayers.filter((player, i) => i !== index)
    );
  }

  function renderPlayersTournament() {
    const playerElements = [];

    for (let i = 0; i < tournament.players.length; i++) {
      playerElements.push(
        <button
          key={i}
          style={{
            margin: "1%",
            width: "80%",
            height: "10%",
            border: "1px solid white",
            display: "flex",
            backgroundColor: "gray",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={tournament.players[i].picture}
            alt={tournament.players[i].name}
            style={{
              margin: "2%",
              height: "70%",
              aspectRatio: "1/1",
              border: "1px solid white",
            }}
          />
          <h2
            style={{
              maxWidth: "50%",
              maxHeight: "80%",
              overflow: "hidden",
              fontFamily: "Nosifer",
              fontWeight: "bold",
            }}
          >
            {tournament.players[i].name}
          </h2>
          <h1
            style={{
              margin: "5px",
              fontFamily: "Nosifer",
              fontWeight: "bold",
            }}
          >
            {tournament.players[i].score}
          </h1>
        </button>
      );
    }
    return playerElements;
  }

  function tournamentPage() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            width: "80vw",
            height: "45vw",
            border: "1px solid white",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "45vw",
              backgroundColor: "black",
              border: "1px solid white",
              alignItems: "center",
              boxSizing: "border-box",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "12%",
                marginBottom: "5%",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "gray",
              }}
            >
              <h1
                style={{
                  fontFamily: "Nosifer",
                  fontWeight: "bold",
                }}
              >
                LeaderBoards
              </h1>
            </div>
            {renderPlayersTournament()}
          </div>
          <div
            style={{
              width: "100%",
              height: "45vw",
              backgroundColor: "black",
              border: "1px solid white",
              boxSizing: "border-box",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              height: "45vw",
              backgroundColor: "black",
              border: "1px solid white",
              boxSizing: "border-box",
            }}
          ></div>
          <div
            style={{
              width: "100%",
              height: "45vw",
              backgroundColor: "black",
              border: "1px solid white",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "12%",
                marginBottom: "5%",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "gray",
              }}
            >
              <h1
                style={{
                  fontFamily: "Nosifer",
                  fontWeight: "bold",
                }}
              >
                {tournamentName}
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderPlayers() {
    const playerElements = [];

    for (let i = 0; i < listOfPlayers.length; i++) {
      playerElements.push(
        <div
          key={i}
          style={{
            margin: "1%",
            width: "80%",
            height: "20%",
            border: "1px solid white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={listOfPlayers[i].picture}
            alt={listOfPlayers[i].name}
            style={{
              margin: "2%",
              height: "70%",
              aspectRatio: "1/1",
              border: "1px solid white",
            }}
          />
          <p
            style={{
              maxWidth: "50%",
              maxHeight: "80%",
              overflow: "hidden",
              fontFamily: "Nosifer",
              fontWeight: "bold",
            }}
          >
            {listOfPlayers[i].name}
          </p>
          <button
            key={i}
            onClick={() => removePlayer(i)}
            style={{ height: "20%", aspectRatio: "1/1", margin: "2%" }}
          >
            <img src={eliminate} style={{ overflow: "fit" }}></img>
          </button>
        </div>
      );
    }

    return playerElements;
  }

  function renderTournamentMode() {
    const buttonData = [
      { id: 0, imgSrc: playerPic, alt: "Round Robin" },
      { id: 1, imgSrc: babyPic, alt: "Single Elimination" },
      { id: 2, imgSrc: mediumPic, alt: "Swiss" },
    ];

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "15%",
          justifyContent: "center",
        }}
      >
        {buttonData.map((button) => (
          <button
            key={button.id}
            onClick={() => tournamentMode(button.id)}
            alt={button.alt}
            id={`buttonMode${button.id}`}
            style={{
              fontSize: "0.4vw",
              width: "12%",
              height: "90%",
              margin: "3%",
            }}
            title={button.alt}
          >
            <img
              src={button.imgSrc}
              title={button.alt}
              style={{
                aspectRatio: "1/1",
                border: "1px solid white",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
            {button.alt}
          </button>
        ))}
      </div>
    );
  }

  function renderButtons() {
    const buttonData = [
      { id: 0, imgSrc: playerPic, alt: "Player" },
      { id: 1, imgSrc: babyPic, alt: "BabyBot" },
      { id: 2, imgSrc: mediumPic, alt: "MediumBot" },
      { id: 3, imgSrc: insanePic, alt: "InsaneBot" },
    ];

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "15%",
          justifyContent: "center",
        }}
      >
        {buttonData.map((button) => (
          <button
            key={button.id}
            onClick={() => selectButton(button.id)}
            alt={button.alt}
            id={`button${button.id}`}
            style={{
              fontSize: "0.4vw",
              width: "12%",
              height: "90%",
              margin: "3%",
              border: "1px solid white",
            }}
            title={button.alt}
          >
            <img
              src={button.imgSrc}
              title={button.alt}
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
            {button.alt}
          </button>
        ))}
      </div>
    );
  }

  function selectionPage() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          <CanvasComponent />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-bold font-nosifer">
            <button
              onClick={startTournamentButtonPressed}
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
                height: "50%",
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
                  height: "15%",
                  width: "80%",
                  margin: "5%",
                  textIndent: "1vw",
                }}
              ></input>
              {renderButtons()}
              <button
                onClick={() => addPlayer()}
                style={{
                  width: "80%",
                  height: "15%",
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
              <h3
                style={{
                  width: "80%",
                  height: "10%",
                  fontFamily: "Nosifer",
                  textAlign: "center",
                  margin: "0%",
                  padidng: "0%",
                }}
              >
                Choose tournament Mode
              </h3>
              {renderTournamentMode()}
            </div>
            <div
              style={{
                overflowY: "auto",
                height: "50%",
                width: "100%",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {renderPlayers()}
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
              onClick={createTournamentButtonClicked}
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
      return tournamentPage();
    default:
      return startPage();
  }
};

export default Tournament;
