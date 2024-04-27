import React from "react";
import { useTranslation } from "react-i18next";
import { WelcomeButtonStyle } from "../buttons/ButtonStyle";

const HowToPlay = ({ isOpen, setIsOpen, background, backgroundimage }) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-between
			items-center bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundimage})` }}
    >
      <div></div>
      <div
        className="flex flex-col justify-around items-center space-y-16 
  		mb-6 font-nosifer text-gray-200 p-5 rounded-xl shadow-xl"
        style={{
          backgroundImage: `url(${background})`,
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl mb-10">{t("Original Pong")}</h1>
          <p>
            {t("The classic game of Pong.")}
            <br />
            {t("Hit the ball back and forth")}
            <br />
            {t("and try to score on your opponent.")}
          </p>
        </div>
        <div className="text-center">
          <h1 className="text-4xl mb-10">{t("Pong against AI")}</h1>
          <p>
            {t("Play Pong against an AI opponent.")}
            <br />
            {t("Can you beat the computer?")}
          </p>
        </div>
        <div className="text-center">
          <h1 className="text-4xl mb-10">{t("3D Pong")}</h1>
          <p>
            {t("Our 3D, endless version of Pong.")}
            <br />
            {t("Adds a new dimension to the classic game.")}
            <br />
            {t("If the blackhole swallows your planets, you lose.")}
          </p>
        </div>
        <div className="text-center">
          <h1 className="text-4xl mb-10">{t("Tournament")}</h1>
          <p>
            {t("Play a Tournament against other players.")}
            <br />
            {t("This mode is played in multiple rounds.")}
            <br />
            {t("You need to provide the nicknames for the participants")}
            <br />
            {t("Choose if they are real players or an AI.")}
          </p>
        </div>
        <div className="text-center">
          <h1 className="text-4xl mb-10">{t("Keybinds")}</h1>
          <div className="flex justify-between">
            <div className="w-1/2 p-2">
              <h3 className="underline mb-3">{t("Key")}</h3>
              <div className="flex flex-col space-y-2">
                <p>W</p>
                <p>S</p>
                <p>{t("Up Arrow")}</p>
                <p>{t("Down Arrow")}</p>
              </div>
            </div>
            <div className=" p-2">
              <h3 className="underline mb-3">{t("Action")}</h3>
              <div className="flex flex-col space-y-2">
                <p>{t("Left bar Up")}</p>
                <p>{t("Left bar Down")}</p>
                <p>{t("Right bar Up")}</p>
                <p>`{t("Right bar Down")}`</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => setIsOpen(false)}
        className={`mb-12 ${WelcomeButtonStyle}`}
      >
        {t("Back")}
      </button>
    </div>
  );
};

export default HowToPlay;
