/* disable eslint */

import React, { useEffect} from "react";
import WelcomeMessage from "../components/home/WelcomeMessage";
import Readme from "../components/home/Readme";
import Sidebar from "../components/hamburger_menu/Hamburger";
import Cookies from "js-cookie";

function ScrollDownIndicator() {
  return (
    <div className="absolute bottom-0 flex justify-center items-center h-24 w-full">
      <span className="animate-bounce text-6xl text-orange-900 text-opacity-80">
        &#8595;
      </span>
    </div>
  );
}

function Home({ redirectUri }) {
  useEffect(() => {
    setTimeout(() => {
      const accessToken = Cookies.get("access");
      console.log(accessToken);

      if (!accessToken) {
        window.location.href = "/404.html";
      }
    }, 1000);
  }, []);

  return (
    <>
      <div className="relative h-screen flex items-center justify-center">
        <WelcomeMessage />
        <ScrollDownIndicator />
        <div className="absolute top-full w-full bg-black home-bg-black-gradient">
          <Readme />
          <Sidebar redirectUri={redirectUri} />
        </div>
      </div>
    </>
  );
}

export default Home;
