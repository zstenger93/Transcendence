import React from "react";
import { Link } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { FaInfoCircle, FaHome, FaUser } from "react-icons/fa";
import { SiGooglechat, SiGameandwatch } from "react-icons/si";

const Sidebar = () => {
  const { t } = useTranslation();
  return (
    <div
      className="fixed top-0 lef-0 h-screen w-16 m-0
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
							text-white bg-gray-900 text-xs font-bold transition-all duration-100
							scale-0 origin-left group-hover:scale-100"
      >
        {text}
      </span>
    </Link>
  );
};

export default Sidebar;
