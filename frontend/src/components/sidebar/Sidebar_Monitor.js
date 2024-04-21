import React from "react";
import { TbLogout } from "react-icons/tb";
import { HiMiniLanguage } from "react-icons/hi2";
import { FaInfoCircle, FaHome, FaUser } from "react-icons/fa";
import { SiGooglechat, SiGameandwatch } from "react-icons/si";
import SidebarIcon from "./SidebarIcon";
import SidebarDropdown from "./SidebarDropdown";
import userLogout from "./Logout";
import { useNavigate } from "react-router-dom";

const SidebarContent = ({ t, changeLanguage, redirectUri }) => {
  const navigate = useNavigate();
  return (
    <div
      className="fixed top-0 left-0 h-screen w-16 m-0
	flex flex-col bg-gradient-to-r from-gray-900 
	to-gray-900-opacity bg-opacity-30 text-white 
	shadow-lg transition-all duration-300 z-999"
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
          to="/choosepongmode"
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
        <SidebarIcon
          icon={<TbLogout size="32" />}
          text={t("Logout")}
          onClick={async () => {
            await userLogout({ redirectUri });
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default SidebarContent;
