import React, { useEffect, useRef, useState } from "react";
import backgroundImage from "../../images/pongbg.png";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import { useTranslation } from "react-i18next";
import { WelcomeButtonStyle } from "../../components/buttons/ButtonStyle";
import LoseScreen from "../../components/game/LoseScreen";
import WinScreen from "../../components/game/WinScreen";
import handleResize from "../../components/game/HandleResize";
import FullScreenButton from "../../components/buttons/FullScreen";



class player extends React.Component {
    constructor(playerName, id) {
        this.playerName = playerName;
        this.id = id;
    }
    renderPlayer() {
        return (
            <div style={{width: "200px", height: "200px", border: "1px solid white"}}>
            </div>
        )
    }
}
















const Tournament = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="relative">
        <img
          src={backgroundImage}
          style={{ width: "80vw", height: "100%", objectFit: "cover" }}
          alt="Background"
          className="rounded-xl shadow-lg"
        />
        <BackButton navigate={navigate} t={t} />
      </div>
      </div>
    );
};

export default Tournament;