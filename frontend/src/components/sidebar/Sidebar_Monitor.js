import React from "react";
import { TbLogout } from "react-icons/tb";
import { HiMiniLanguage } from "react-icons/hi2";
import { FaInfoCircle, FaHome, FaUser } from "react-icons/fa";
import { SiGooglechat, SiGameandwatch } from "react-icons/si";
import SidebarIcon from "./SidebarIcon";
import SidebarDropdown from "./SidebarDropdown";

const SidebarContent = ({ t, changeLanguage }) => (
  <div
    className="fixed top-0 left-0 h-screen w-16 m-0
	flex flex-col bg-gray-800 bg-opacity-30 text-white 
	shadow-lg transition-all duration-300"
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

export default SidebarContent;
