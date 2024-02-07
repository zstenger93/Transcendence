import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import HamburgerMenu from "./HamburgerMenu";
import SidebarBigScreen from "../sidebar/Sidebar_Monitor";
import HamburgerButton from "./HamburgerBars";

const Sidebar = ({ redirectUri }) => {
  const { t } = useTranslation();
  const [, setDropdownOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setDropdownOpen(false);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      {isMenuOpen && (
        <HamburgerMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          t={t}
          changeLanguage={changeLanguage}
          redirectUri={redirectUri}
        />
      )}
      {isMobile && (
        <HamburgerButton isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      )}
      {!isMobile && (
        <SidebarBigScreen
          t={t}
          changeLanguage={changeLanguage}
          redirectUri={redirectUri}
        />
      )}
    </>
  );
};

export default Sidebar;
