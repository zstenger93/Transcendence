import React from "react";
import { useTranslation } from "react-i18next";

function WelcomeMessage() {
  const { t } = useTranslation();
  return (
    <nav className="bg-opacity-0 p-2 text-center">
      <span className="text-gray-300 font-extrabold text-md sm:text-base md:text-2xl lg:text-4xl">
        {t("Welcome To")}
        <br />
        {t("TranscENDence")}
        <br />
        <span className="text-gray-900 md:text-gray-300">
          {t("Where Your Core Journey")}
          <br />
          {t("Ends")}
        </span>
      </span>
    </nav>
  );
}

export default WelcomeMessage;
