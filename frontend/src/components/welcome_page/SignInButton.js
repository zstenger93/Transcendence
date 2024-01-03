import React, { useState } from "react";

const SignInButt = ({ t, redirectToHome }) => {
  const [showFields, setShowFields] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <button
        onClick={() => setShowFields((prevShowFields) => !prevShowFields)}
        className="bg-gray-900 text-gray-300 font-nosifer font-bold 
		px-4 py-2 rounded cursor-pointer hover:bg-gray-900 hover:bg-opacity-70
		border-b-2 border-r-2 border-purple-600 mb-4"
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
            autocomplete="new-email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("Password")}
            onKeyPress={(e) => e.key === "Enter" && redirectToHome()}
            className="mb-4 bg-gray-900 bg-opacity-60 text-white 
			rounded text-center border-b-2 border-r-2 border-purple-600"
            autocomplete="new-password"
          />
          <button
            onClick={() => redirectToHome(true)}
            className="bg-gray-900 text-gray-300 
			font-nosifer font-bold px-4 py-2 rounded cursor-pointer 
			hover:bg-gray-900 hover:bg-opacity-70 border-b-2 border-r-2 
			border-purple-600 mb-20"
          >
            {t("Login")}
          </button>
        </>
      )}
    </>
  );
};

export default SignInButt;
