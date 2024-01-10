import React from "react";
import { useTranslation } from "react-i18next";

function WelcomeMessage() {
  const { t } = useTranslation();
  return (
    <div className="bg-opacity-0 p-2 text-center">
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
