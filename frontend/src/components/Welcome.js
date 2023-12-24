import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import backgroundImage from "../images/bg0.png";

function Welcome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showFields, setShowFields] = useState(false);


  const redirectToHome = () => {
    if (email && password) {
      navigate("/home");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center 
      h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex flex-col items-center justify-center flex-grow">
        <button
          onClick={() => setShowFields(prevShowFields => !prevShowFields)}
          className="bg-gray-900 text-gray-300 font-nosifer font-bold 
          px-4 py-2 rounded cursor-pointer hover:bg-gray-900 hover:bg-opacity-70"
        >
          Sign In via Email
        </button>
        {showFields && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              onKeyPress={(e) => e.key === 'Enter' && redirectToHome()}
              className="mb-2 mt-4 bg-gray-900 bg-opacity-60 text-white 
              rounded text-center"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onKeyPress={(e) => e.key === 'Enter' && redirectToHome()}
              className="mb-4 bg-gray-900 bg-opacity-60 text-white 
              rounded text-center"
            />
            <button
              onClick={redirectToHome}
              className="bg-gray-900 bg-opacity-70 text-gray-300 
              font-nosifer font-bold px-4 py-2 rounded cursor-pointer 
              hover:bg-gray-900 hover:bg-opacity-30"
            >
              Join
            </button>
          </>
        )}
        <button
          className="bg-gray-900 text-gray-300 mt-10 font-nosifer 
          font-bold px-4 py-2 rounded cursor-pointer hover:bg-gray-900 
          hover:bg-opacity-70"
          onClick={redirectToHome}
        >
          {t("Sign In via 42")}
        </button>
      </div>
      <div className="flex items-center justify-center">
      </div>
    </div>
  );
}

export default Welcome;