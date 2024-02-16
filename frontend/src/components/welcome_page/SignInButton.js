import React, { useState } from "react";
import axios from "axios";
import { WelcomeButtonStyle } from "../buttons/ButtonStyle";
import Cookies from "js-cookie";

const SignInButt = ({ t, redirectToHome, redirect_uri }) => {
  const [showFields, setShowFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (email, password, redirect_uri) => {
    try {
      const response = await axios.post(
        `${redirect_uri}/api/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      const token = response.data.access;
      Cookies.set("access", token, {
        expires: 7,
        sameSite: "Strict",
        secure: true,
      });
      if (response.data.access) redirectToHome();
    } catch (error) {
      if (error.response && error.response.data) {
        let errorMessage;
        if (typeof error.response.data === "object") {
          errorMessage = error.response.data.detail;
        }
        setError(errorMessage ? errorMessage : "An unexpected error occurred.");
      } else {
        console.error("An unexpected error occurred:", error.message);
        setError("An unexpected error occurred.");
      }
      setShowError(true);
    }
  };

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
            onClick={async () => {
              try {
                await loginUser(email, password, redirect_uri);
              } catch (error) {
                console.error("An error occurred:", error);
              }
            }}
            className={`mb-20 ${WelcomeButtonStyle}`}
          >
            {t("Login")}
          </button>
        </>
      )}
      {showError && (
        <div className="fixed inset-0 flex items-start justify-center pt-20 z-50">
          <div
            className="bg-gray-900 bg-opacity-80 text-white p-8 rounded-xl 
		  	shadow-xl relative border border-red-700"
          >
            <div className="" dangerouslySetInnerHTML={{ __html: error }} />
            <button
              onClick={() => setShowError(false)}
              className="absolute top-0 right-0 mt-2 mr-2 text-2xl leading-none 
			  hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInButt;
