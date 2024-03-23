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

const Tournament = () => { };

export default Tournament;