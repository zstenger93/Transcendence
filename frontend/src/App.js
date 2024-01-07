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
import ChoosePongMode from "./pages/Games/ChoosePongMode";
import Background from "./images/welcomebg.jpg";
import BreakingBadMorty from "./images/rmb3.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const PageWrapper = ({ children, image, showSidebar = true }) => {
  return (
    <div
      className="overflow-y-auto"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {showSidebar && <Sidebar />}
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

  console.log(REDIRECT_URI);

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
              <PageWrapper image={Background} showSidebar={false}>
                <Welcome redirectUri={REDIRECT_URI} />
              </PageWrapper>
            }
          />
          <Route
            path="home"
            element={
              <PageWrapper image={Background}>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="chat"
            element={
              <PageWrapper image={Background}>
                <Chat />
              </PageWrapper>
            }
          />
          <Route
            path="matchmaking"
            element={
              <PageWrapper image={Background}>
                <Matchmaking />
              </PageWrapper>
            }
          />
          <Route
            path="games"
            element={
              <PageWrapper image={Background}>
                <Games />
              </PageWrapper>
            }
          />
          <Route
            path="profile"
            element={
              <PageWrapper image={Background}>
                <Profile />
              </PageWrapper>
            }
          />
          <Route
            path="about"
            element={
              <PageWrapper image={Background}>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="originalpong"
            element={
              <PageWrapper image={Background}>
                <OriginalPong />
              </PageWrapper>
            }
          />
          <Route
            path="pongai"
            element={
              <PageWrapper image={Background}>
                <PongAi />
              </PageWrapper>
            }
          />
          <Route
            path="pong3d"
            element={
              <PageWrapper image={Background}>
                <Pong3D />
              </PageWrapper>
            }
          />
          <Route
            path="choosepongmode"
            element={
              <PageWrapper image={BreakingBadMorty}>
                <ChoosePongMode />
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
