import React, { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Translation from "./components/Translation";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Games from "./pages/Games/Games";
import About from "./pages/About";
import NotFound from "./components/404";
import Sidebar from "./components/hamburger_menu/Hamburger";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import Matchmaking from "./pages/Games/Matchmaking";
import OriginalPong from "./pages/Games/OriginalPong";
import PongAi from "./pages/Games/PongAi";
import Pong3D from "./pages/Games/Pong3D";
import Multiplayer from "./pages/Games/Multiplayer";
import ChoosePongMode from "./pages/Games/ChoosePongMode";
import Background from "./images/welcomebg.jpg";
import BreakingBadMorty from "./images/rmb3.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartScreen from "./components/game/StartScreen";
import { WelcomeButtonStyle } from "./components/buttons/ButtonStyle";
import BackButton from "./components/buttons/BackButton";
import backgroundimage from "./images/pongbg.png";
import TwoFA from "./pages/TwoFA";


process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
// const cors = require('cors');

const PageWrapper = ({ children, image, showSidebar = true, redirectUri }) => {
  return (
    <div
      className="overflow-y-auto h-svh"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showSidebar && <Sidebar redirectUri={redirectUri} />}
      {children}
    </div>
  );
};

function App() {
  const { i18n } = useTranslation();
  const basename =
    process.env.NODE_ENV === "production" ? "/Transcendence" : "";
  let REDIRECT_URI;

  if (process.env.NODE_ENV === "development") {
    REDIRECT_URI = process.env.REACT_APP_LOCAL_URI;
  } else {
    REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  }

  useEffect(() => {
    const storedLanguage = localStorage.getItem("i18nextLng");
    if (storedLanguage && i18n.language !== storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, [i18n]);

  return (
    <I18nextProvider i18n={Translation}>
      <Router basename={basename}>
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper
                image={Background}
                showSidebar={false}
                redirectUri={REDIRECT_URI}
              >
                <Welcome redirectUri={REDIRECT_URI} />
              </PageWrapper>
            }
          />
          <Route
            path="home"
            element={
              <PageWrapper
                image={Background}
                showSidebar={false}
                redirectUri={REDIRECT_URI}
              >
                <Home redirectUri={REDIRECT_URI} />
              </PageWrapper>
            }
          />
          <Route
            path="chat"
            element={
              <PageWrapper image={Background} redirectUri={REDIRECT_URI}>
                <Chat />
              </PageWrapper>
            }
          />
          <Route
            path="matchmaking"
            element={
              <PageWrapper image={Background} redirectUri={REDIRECT_URI}>
                <Matchmaking />
              </PageWrapper>
            }
          />
          <Route
            path="games"
            element={
              <PageWrapper image={Background} redirectUri={REDIRECT_URI}>
                <Games />
              </PageWrapper>
            }
          />
          <Route
            path="profile"
            element={
              <PageWrapper image={Background} redirectUri={REDIRECT_URI}>
                <Profile redirectUri={REDIRECT_URI} />
              </PageWrapper>
            }
          />
          <Route
            path="about"
            element={
              <PageWrapper
                image={Background}
                showSidebar={false}
                redirectUri={REDIRECT_URI}
              >
                <About />
                <Sidebar redirectUri={REDIRECT_URI} />
              </PageWrapper>
            }
          />
          <Route
            path="originalpong"
            element={
              <PageWrapper image={Background} redirectUri={REDIRECT_URI}>
                <OriginalPong />
              </PageWrapper>
            }
          />
          <Route
            path="pongai"
            element={
              <PageWrapper image={Background} redirectUri={REDIRECT_URI}>
                <PongAi />
              </PageWrapper>
            }
          />
          <Route
            path="pong3d"
            element={
              <PageWrapper image={Background} redirectUri={REDIRECT_URI}>
                <StartScreen
                  Game={Pong3D}
                  backgroundImage={backgroundimage}
                  WelcomeButtonStyle={WelcomeButtonStyle}
                  BackButton={BackButton}
                />
              </PageWrapper>
            }
          />
		  <Route
            path="multiplayer"
            element={
              <PageWrapper image={Background} redirectUri={REDIRECT_URI}>
                <Multiplayer />
              </PageWrapper>
            }
          />
          <Route
            path="choosepongmode"
            element={
              <PageWrapper image={BreakingBadMorty} redirectUri={REDIRECT_URI}>
                <ChoosePongMode />
              </PageWrapper>
            }
          />
		   <Route
            path="2fa"
            element={
              <PageWrapper image={Background} showSidebar={false} redirectUri={REDIRECT_URI}>
                <TwoFA redirectUri={REDIRECT_URI} />
              </PageWrapper>
            }
          />
          <Route
            path="*"
            element={<NotFound currentLanguage={i18n.language} />}
          />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
