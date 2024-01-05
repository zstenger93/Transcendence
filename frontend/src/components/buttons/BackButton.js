import React from "react";
import { ButtonStyle } from "./ButtonStyle";

const BackButton = ({ navigate, t }) => (
  <div className="flex items-center justify-center">
    <button
      onClick={() => navigate(-1)}
      className={`mt-6 ${ButtonStyle}`}
    >
      {t("Back")}
    </button>
  </div>
);

export default BackButton;
