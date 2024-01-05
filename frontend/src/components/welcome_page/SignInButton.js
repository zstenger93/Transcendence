import React, { useState } from "react";
import { WelcomeButtonStyle } from "../buttons/ButtonStyle";

const SignInButt = ({ t, redirectToHome }) => {
  const [showFields, setShowFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <button
        onClick={() => setShowFields((prevShowFields) => !prevShowFields)}
        className={`mb-4 ${WelcomeButtonStyle}`}
      >
        {t("Sign In")}
      </button>
      {showFields && (
        <>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Email")}
            onKeyPress={(e) => e.key === "Enter" && redirectToHome()}
            className="mb-2 mt-4 bg-gray-900 bg-opacity-60 text-white 
			rounded text-center border-b-2 border-r-2 border-purple-600"
            autoComplete="new-email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("Password")}
            onKeyPress={(e) => e.key === "Enter" && redirectToHome()}
            className="mb-4 bg-gray-900 bg-opacity-60 text-white 
			rounded text-center border-b-2 border-r-2 border-purple-600"
            autoComplete="new-password"
          />
          <button
            onClick={() => redirectToHome(true)}
            className={`mb-20 ${WelcomeButtonStyle}`}
          >
            {t("Login")}
          </button>
        </>
      )}
    </>
  );
};

export default SignInButt;
