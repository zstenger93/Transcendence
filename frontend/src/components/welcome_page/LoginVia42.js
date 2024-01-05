import React from "react";
import { WelcomeButtonStyle } from "../buttons/ButtonStyle";

const OAuth = async ({ navigate, redirect_uri }) => {
  const auth = `${redirect_uri}/api/is_authenticated/`;
  let response = await fetch(auth, {
    credentials: "include",
  });

  let data = await response.json();
  if (!data.is_authenticated) {
    const authWindow = window.open(`${redirect_uri}/api/oauth/authorize/`);
    const checkAuthentication = async () => {
      response = await fetch(auth, {
        credentials: "include",
      });
      data = await response.json();
      if (data.is_authenticated) {
        console.log("authenticated");
        navigate("/home");
        authWindow.close();
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000));
        checkAuthentication();
      }
    };
    checkAuthentication();
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
