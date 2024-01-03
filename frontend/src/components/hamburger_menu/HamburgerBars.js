// HamburgerButton.js
import React from "react";

const HamburgerButton = ({ isMenuOpen, toggleMenu }) => {
  return (
    <div
      className="lg:hidden cursor-pointer p-4 z-20 relative"
      onClick={toggleMenu}
    >
      <div
        className={`bar h-1 w-8 transition-all duration-300
                ${
                  isMenuOpen
                    ? "rotate-45 translate-y-2.5 bg-white"
                    : "bg-purple-700"
                }`}
        style={{ marginBottom: "4px" }}
      ></div>
      <div
        className={`bar h-1 w-8 bg-purple-700 transition-all duration-300
                ${isMenuOpen ? "opacity-0" : ""}`}
      ></div>
      <div
        className={`bar h-1 w-8 transition-all duration-300
                ${
                  isMenuOpen
                    ? "-rotate-45 -translate-y-2 bg-white"
                    : " bg-purple-700"
                }`}
        style={{ marginTop: "4px" }}
      ></div>
    </div>
  );
};

export default HamburgerButton;
