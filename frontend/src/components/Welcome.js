import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HiMiniLanguage } from "react-icons/hi2";

function LanguageButton() {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
    setDropdownOpen(false);
  };

  const languages = [
    { value: "en", label: "EN" },
    { value: "fr", label: "FR" },
    { value: "hu", label: "HU" },
    { value: "de", label: "DE" },
    { value: "jp", label: "JP" },
  ];

  return (
    <div className="absolute top-0 left-2 mt-10">
      <button
        className="relative flex items-center justify-center h-12 
        w-12 mt-2 mb-2 mx-auto shadow-lg bg-purple-900 bg-opacity-50 
        text-blue-300 hover:bg-blue-300 hover:text-purple-900 
        rounded-3xl hover:rounded-xl transition-all duration-300 
        ease-linear cursor-pointer group"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <HiMiniLanguage size="32" />
        <span
          className="absolute w-auto p-2 m-2 min-w-max left-14 
          rounded-md shadow-md text-white bg-gray-900 text-xs 
          font-bold transition-all duration-100 scale-0 origin-left 
          group-hover:scale-100"
        >
          {t("Language")}
        </span>
      </button>
      {dropdownOpen && (
        <div
          className="absolute left-0 w-22 py-2 mt-2 bg-gray-900 
          bg-opacity-80 rounded-xl shadow-xl text-center">
          {languages.map((lang) => (
            <button
              key={lang.value}
              className={`w-full py-2 ${lang.value === currentLanguage
                ? "text-blue-500 font-bold"
                : "text-gray-300"
                } hover:bg-indigo-500 hover:text-white`}
              onClick={() => changeLanguage(lang.value)}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Welcome() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showFields, setShowFields] = useState(false);


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
      h-screen bg-cover bg-center bg-no-repeat"
    >
      <LanguageButton />
      <div className="flex flex-col items-center justify-center flex-grow">
        <button
          onClick={() => setShowFields(prevShowFields => !prevShowFields)}
          className="bg-gray-900 text-gray-300 font-nosifer font-bold 
          px-4 py-2 rounded cursor-pointer hover:bg-gray-900 hover:bg-opacity-70"
        >
          {t('Sign In via Email')}
        </button>
        {showFields && (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("Email")}
              onKeyPress={(e) => e.key === 'Enter' && redirectToHome()}
              className="mb-2 mt-4 bg-gray-900 bg-opacity-60 text-white 
              rounded text-center"
              autocomplete="new-email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("Password")}
              onKeyPress={(e) => e.key === 'Enter' && redirectToHome()}
              className="mb-4 bg-gray-900 bg-opacity-60 text-white 
              rounded text-center"
              autocomplete="new-password"
            />
            <button
              onClick={() => redirectToHome(true)}
              className="bg-gray-900 bg-opacity-70 text-gray-300 
              font-nosifer font-bold px-4 py-2 rounded cursor-pointer 
            hover:bg-gray-900 hover:bg-opacity-30"
            >
              {t('Join')}
            </button>
          </>
        )}
        <button
          onClick={() => redirectToHome(false)}
          className="bg-gray-900 text-gray-300 mt-10 font-nosifer 
          font-bold px-4 py-2 rounded cursor-pointer hover:bg-gray-900 
          hover:bg-opacity-70"
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