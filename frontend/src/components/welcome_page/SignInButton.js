import React, { useState } from "react";
import axios from "axios";
import { WelcomeButtonStyle } from "../buttons/ButtonStyle";

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
	  console.log(response.data);
	  return response.data;
	} catch (error) {
	  if (error.response && error.response.data) {
		let errorMessage;
		if (typeof error.response.data === "object") {
		  errorMessage = error.response.data.detail;
		}
		throw new Error(errorMessage ? errorMessage : "An unexpected error occurred.");
	  } else {
		console.error("An unexpected error occurred:", error.message);
		throw new Error("An unexpected error occurred.");
	  }
	}
  };

const SignInButt = ({ t, redirectToHome, redirect_uri }) => {
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
            onClick={async () => {
              try {
                const data = await loginUser(email, password, redirect_uri);
                console.log(data);
                redirectToHome(true);
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
    </>
  );
};

export default SignInButt;
