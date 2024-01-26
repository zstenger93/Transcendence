import React from "react";
import SidebarIcon from "../sidebar/SidebarIcon";
import SidebarDropdown from "../sidebar/SidebarDropdown";
import { FaInfoCircle, FaHome, FaUser } from "react-icons/fa";
import { HiMiniLanguage } from "react-icons/hi2";
import { SiGooglechat, SiGameandwatch } from "react-icons/si";
import { TbLogout } from "react-icons/tb";
import userLogout from "../sidebar/Logout";
import { useNavigate } from "react-router-dom";

const HamburgerMenu = ({
  isMenuOpen,
  toggleMenu,
  t,
  changeLanguage,
  redirectUri,
}) => {
  console.log("HamburgerMenu", redirectUri);
  const navigate = useNavigate();
  if (!isMenuOpen) return null;

  return (
    <div
      className="fixed top-0 left-0 h-screen w-screen bg-gray-900
	  bg-opacity-80 z-10 overflow-y-auto"
      onClick={toggleMenu}
    >
      <div className="flex flex-col justify-start items-center mt-24">
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
        <SidebarIcon
          icon={<TbLogout size="32" />}
          text={t("Logout")}
          onClick={async () => {
            await userLogout({ redirectUri });
            navigate("/");
          }}
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
    </div>
  );
};

export default HamburgerMenu;
