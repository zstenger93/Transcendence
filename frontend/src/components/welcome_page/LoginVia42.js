import React from "react";

const OAuth = async ({ navigate }) => {
  let response = await fetch("http://localhost:8000/api/is_authenticated/", {
    credentials: "include",
  });
  let data = await response.json();

  if (!data.is_authenticated) {
    const authWindow = window.open(
      "http://localhost:8000/api/oauth/authorize/"
    );
    window.addEventListener(
      "message",
      (event) => {
        if (event.origin !== "http://localhost:8000") {
          return;
        }
        if (event.data.is_authenticated) {
          authWindow.close();
          navigate("/home");
        }
      },
      false
    );
  }

  navigate("/home");
};

const LoginButton = ({ t, navigate }) => {
  return (
    <button
      onClick={() => OAuth({ navigate })}
      className="bg-gray-900 text-gray-300 font-nosifer font-bold 
		px-4 py-2 rounded cursor-pointer hover:bg-gray-900 hover:bg-opacity-70
		border-b-2 border-r-2 border-purple-600"
    >
      {t("Sign In via 42")}
    </button>
  );
};

export default LoginButton;
