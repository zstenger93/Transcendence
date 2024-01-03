import React from "react";

const BackButton = ({ navigate, t }) => (
  <div className="flex items-center justify-center">
    <button
      onClick={() => navigate(-1)}
      className="mt-6 bg-purple-900 bg-opacity-80 font-nosifer 
	hover:bg-purple-700 text-white font-bold py-2 px-4 rounded
		border-b-2 border-r-2 border-purple-600"
    >
      {t("Back")}
    </button>
  </div>
);

export default BackButton;