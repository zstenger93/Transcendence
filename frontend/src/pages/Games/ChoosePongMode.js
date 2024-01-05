import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../../components/buttons/BackButton";
import { ButtonStyle } from "../../components/buttons/ButtonStyle";

function ChoosePongMode() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="p-10 bg-gray-900 bg-opacity-80 rounded-xl shadow-xl
	   border-r-2 border-b-2 border-purple-600"
      >
        <Link to="/originalpong" className={`mb-4 ${ButtonStyle}`}>
          {t("Original Pong")}
        </Link>
        <Link to="/multiplayer" className={`mb-4 ${ButtonStyle}`}>
          {t("Multiplayer")}
        </Link>
        <Link to="/moddedpong" className={`mb-4 ${ButtonStyle}`}>
          {t("Modded Pong")}
        </Link>
        <Link to="/pongai" className={`mb-4 ${ButtonStyle}`}>
          {t("Pong against AI")}
        </Link>
        <Link to="/pong3d" className={`mb-4 ${ButtonStyle}`}>
          {t("3D Pong")}
        </Link>
        <BackButton navigate={navigate} t={t} />
      </div>
    </div>
  );
}

export default ChoosePongMode;
