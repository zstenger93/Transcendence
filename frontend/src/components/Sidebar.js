import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { FaInfoCircle, FaHome, FaUser } from "react-icons/fa";
import { HiMiniLanguage } from "react-icons/hi2";
import { SiGooglechat, SiGameandwatch } from "react-icons/si";

const Sidebar = () => {
  const { t } = useTranslation();
  const [, setDropdownOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 m-0
								flex flex-col bg-gray-800 bg-opacity-30 text-white 
								shadow-lg"
    >
      <div className="mt-10 space-y-5">
        <SidebarIcon icon={<FaHome size="32" />} text={t("Home")} to="/home" />
        <SidebarIcon
          icon={<SiGooglechat size="32" />}
          text={t("Channels & Private Messages")}
          to="/chat"
        />
        <SidebarIcon
          icon={<SiGameandwatch size="32" />}
          text={t("Play or Watch Games")}
          to="/games"
        />
        <SidebarIcon
          icon={<FaUser size="32" />}
          text={t("Profile")}
          to="/profile"
        />
        <SidebarIcon
          icon={<FaInfoCircle size="32" />}
          text={t("About Us")}
          to="/about"
        />
        <SidebarDropdown
          icon={<HiMiniLanguage size="32" />}
          text={t("Language")}
          options={[
            { value: "en", label: "EN" },
            { value: "fr", label: "FR" },
            { value: "hu", label: "HU" },
            { value: "de", label: "DE" },
            { value: "jp", label: "JP" },
          ]}
          onSelect={changeLanguage}
        />
      </div>
      <div className="mb-10 mt-auto">
        <SidebarIcon icon={<TbLogout size="32" />} text={t("Logout")} to="/" />
      </div>
    </div>
  );
};

const SidebarIcon = ({ icon, text = "tooltip", to, margin }) => {
  return (
    <Link
      to={to}
      className={`relative flex items-center justify-center
					h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
					bg-purple-900 bg-opacity-50 text-blue-300 hover:bg-blue-300
					hover:text-purple-900 rounded-3xl hover:rounded-xl transition-all
					duration-300 ease-linear cursor-pointer group ${margin}`}
    >
      {icon}
      <span
        className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
					text-white bg-gray-900 text-xs font-bold transition-all 
					duration-100 scale-0 origin-left group-hover:scale-100"
      >
        {text}
      </span>
    </Link>
  );
};

const SidebarDropdown = ({ icon, text, options, onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleSelect = (value) => {
    onSelect(value);
    setCurrentLanguage(value);
    setDropdownOpen(false);
    i18n.changeLanguage(value);
  };

  return (
    <div className="relative">
      <button
        className={`relative flex items-center justify-center
					h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
					bg-purple-900 bg-opacity-50 text-blue-300 hover:bg-blue-300
					hover:text-purple-900 rounded-3xl hover:rounded-xl transition-all
					duration-300 ease-linear cursor-pointer group`}
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        {icon}
        <span
          className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
					text-white bg-gray-900 text-xs font-bold transition-all duration-100
					scale-0 origin-left group-hover:scale-100"
        >
          {text}
        </span>
      </button>
      {dropdownOpen && (
        <div
          className="absolute left-0 w-22 py-2 mt-2 bg-gray-900 bg-opacity-80
					rounded-xl shadow-xl text-center"
        >
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full py-2 ${
                option.value === currentLanguage
                  ? "text-blue-500 font-bold"
                  : "text-gray-300"
              } hover:bg-indigo-500 hover:text-white`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;