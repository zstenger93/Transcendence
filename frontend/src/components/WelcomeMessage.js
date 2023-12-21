import React from "react";
import { useTranslation } from "react-i18next";

function WelcomeMessage() {
  const { t } = useTranslation();
  return (
    <nav className="bg-opacity-0 p-2 text-center">
      <span className="text-gray-300 font-extrabold text-4xl">
        {t("Welcome To")}
        <br />
        {t("TranscENDence")}
        <br />
        {t("Where Your Core Journey")}
        <br />
        {t("Ends")}
      </span>
    </nav>
  );
}

export default WelcomeMessage;
