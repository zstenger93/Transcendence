import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageButton from "../components/welcome_page/LanguageButton";
import SignInButton from "../components/welcome_page/SignInButton";
import RegisterButton from "../components/welcome_page/RegisterButton";
import LoginVia42 from "../components/welcome_page/LoginVia42";

function Welcome({ redirectUri }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email] = useState("");
  const [password] = useState("");

  const redirectToHome = (isJoinButton) => {
    if (isJoinButton && (!email || !password)) {
      alert("Please enter email and password");
    } else {
      navigate("/home");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center 
      h-screen"
    >
      <LanguageButton />
      <div
        className=" 
	  	flex flex-col items-center justify-center bg-darkred
		bg-opacity-40 rounded-xl shadow-xl border-r-2 border-b-2
		border-darkred p-4"
      >
        <SignInButton
          t={t}
          redirectToHome={redirectToHome}
          redirect_uri={redirectUri}
        />
        <RegisterButton
          t={t}
          redirectToHome={redirectToHome}
          redirect_uri={redirectUri}
        />
        <LoginVia42 t={t} navigate={navigate} redirect_uri={redirectUri} />
      </div>
      <div className="flex items-center justify-center"></div>
    </div>
  );
}

export default Welcome;
