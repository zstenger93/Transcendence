import React, { useEffect } from "react";
import { WelcomeButtonStyle } from "../buttons/ButtonStyle";

const OAuth = async ({ navigate, redirect_uri }) => {
  window.location.href = `${redirect_uri}/api/oauth/authorize`;
};

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  localStorage.setItem("access", urlParams.get("token"));
};

const LoginButton = ({ t, navigate, redirect_uri }) => {
  return (
    <button
      onClick={() => OAuth({ navigate, redirect_uri })}
      className={`${WelcomeButtonStyle}`}
    >
      {t("Sign In via 42")}
    </button>
  );
};

export default LoginButton;
