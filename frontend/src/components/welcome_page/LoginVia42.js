import React from "react";
import { WelcomeButtonStyle } from "../buttons/ButtonStyle";
import Cookies from "js-cookie";

const OAuth = async ({ navigate, redirect_uri }) => {
  window.location.href = `${redirect_uri}/api/oauth/authorize`;
};

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  Cookies.set("access", token, {
	expires: 7,
	sameSite: "Strict",
	secure: true,
  });
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
