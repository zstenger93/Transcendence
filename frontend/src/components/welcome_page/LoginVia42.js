import React from "react";
import { WelcomeButtonStyle } from "../buttons/ButtonStyle";

const OAuth = async ({ navigate, redirect_uri }) => {
  const auth = `${redirect_uri}/api/is_authenticated/`;
  let response = await fetch(auth, {
    credentials: "include",
  });

  let data = await response.json();

  if (!data.is_authenticated) {
    window.open(`${redirect_uri}/api/oauth/authorize/`);
    if (!data.is_authenticated) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      response = await fetch(auth, {
        credentials: "include",
		    AccessControlAllowCredentials: true,
      });
      data = await response.json();
    }
    navigate("/home");
  } else {
    navigate("/home");
  }
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
