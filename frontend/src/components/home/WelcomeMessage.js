import React from "react";
import { useTranslation } from "react-i18next";
import { useOnScreen } from "./FadeIn";

function WelcomeMessage() {
  const { t } = useTranslation();
  const [msg, visibleMsg] = useOnScreen();

  return (
    <div
      ref={msg}
      className={`bg-opacity-0 p-2 text-center
      ${visibleMsg
          ?
          "animate-fadeIn"
          :
          "opacity-0"
        }`}
    >
      <span
        className="text-gray-300 font-extrabold text-md
		    sm:text-base md:text-2xl lg:text-4xl leading-loose"
      >
        <div className="mb-4">{t("Welcome To")}</div>
        <div className="mb-4">{t("TranscENDence")}</div>
        <div className="mb-4">{t("Where Your Core Journey")}</div>
        <div>{t("Ends")}</div>
      </span>
    </div>
  );
}

export default WelcomeMessage;
