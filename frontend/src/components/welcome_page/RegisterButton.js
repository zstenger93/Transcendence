/* eslint-disable */
import React, { useState } from "react";
import axios from "axios";

const RegisterButt = ({ t, redirectToHome }) => {
  const [showFields, setShowFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const registerTheUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register",
        {
          email: email,
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
	  redirectToHome();
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
        className="bg-gray-900 text-gray-300 font-nosifer font-bold 
		px-4 py-2 rounded cursor-pointer hover:bg-gray-900 hover:bg-opacity-70
		border-b-2 border-r-2 border-purple-600 mb-4"
      >
        {t("Register")}
      </button>
      {showFields && (
        <>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={t("Username")}
            onKeyPress={(e) => e.key === "Enter" && redirectToHome()}
            className="mb-2 mt-4 bg-gray-900 bg-opacity-60 text-white 
			rounded text-center border-b-2 border-r-2 border-purple-600"
            autoComplete="new-username"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Email")}
            onKeyPress={(e) => e.key === "Enter" && redirectToHome()}
            className="mb-2 bg-gray-900 bg-opacity-60 text-white 
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
            onClick={() => registerTheUser()}
            className="bg-gray-900 text-gray-300 
			font-nosifer font-bold px-4 py-2 rounded cursor-pointer 
			hover:bg-gray-900 hover:bg-opacity-70 border-b-2 border-r-2 
			border-purple-600 mb-20"
          >
            {t("Join")}
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

export default RegisterButt;
