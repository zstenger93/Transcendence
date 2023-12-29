export const goFullScreen = (elementId) => {
    const elem = document.getElementById(elementId);

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
};

export const exitFullScreen = (elementId) => {
    const elem = document.getElementById(elementId);

    if (elem.exitFullscreen) {
      elem.exitFullscreen();
    } else if (elem.mozCancelFullScreen) { /* Firefox */
      elem.mozCancelFullScreen();
    } else if (elem.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitExitFullscreen();
    } else if (elem.msExitFullscreen) { /* IE/Edge */
      elem.msExitFullscreen();
    }
};
  