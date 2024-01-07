import React from "react";
import { WelcomeButtonStyle } from "./ButtonStyle";

const BackButton = ({ navigate, t }) => (
  <div className="flex items-center justify-center">
    <button
      onClick={() => navigate(-1)}
      className={`mt-6 ${WelcomeButtonStyle}`}
    >
      {t("Back")}
    </button>
  </div>
);

export default BackButton;
