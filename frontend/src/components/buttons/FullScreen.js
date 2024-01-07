import React, { useState } from 'react';
import { AiOutlineFullscreenExit } from 'react-icons/ai';
import { BsArrowsFullscreen } from 'react-icons/bs';

export const goFullScreen = (elementId) => {
  const elem = document.getElementById(elementId);

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
};

export const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};


const FullScreenButton = ({ location, page }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleGoFullScreen = (elementId) => {
    goFullScreen(elementId);
    setIsFullScreen(true);
  };

  const handleExitFullScreen = (elementId) => {
    exitFullScreen(elementId);
    setIsFullScreen(false);
  };

  return (
    <>
      {location.pathname === "/originalpong" ||
        location.pathname === "/pongai" ||
        location.pathname === "/pong3d" ? (
        <button
          onClick={() =>
            isFullScreen ? handleExitFullScreen() : handleGoFullScreen(page)
          }
          className="absolute top-2 right-2 mr-4"
        >
          {isFullScreen ? (
            <AiOutlineFullscreenExit size="32" color="white" />
          ) : (
            <BsArrowsFullscreen size="32" color="white" />
          )}
        </button>
      ) : null}
    </>
  );
};

export default FullScreenButton;