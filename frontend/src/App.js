import React, { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Translation from "./components/Translation";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Games from "./pages/Games";
import About from "./pages/About";
import NotFound from "./components/404";
import Sidebar from "./components/hamburger_menu/Hamburger";
import Welcome from "./pages/Welcome";
import Profile from "./pages/Profile";
import HomeBackground from "./images/bg0.png";
import MortyBackground0 from "./images/morty0.png";
import MortyBackground1 from "./images/morty1.png";
import MortyBackground2 from "./images/morty2.png";
import MortyBackground3 from "./images/morty3.png";
import MortyBackground4 from "./images/morty4.png";
import Matchmaking from "./pages/Matchmaking";
import OriginalPong from "./pages/OriginalPong";
import PongAi from "./pages/PongAi";
import Pong3D from "./pages/Pong3D";
import ChoosePongMode from "./pages/ChoosePongMode";

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
              <PageWrapper image={HomeBackground} showSidebar={false}>
                <Welcome />
              </PageWrapper>
            }
          />
          <Route
            path="home"
            element={
              <PageWrapper image={MortyBackground4}>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="chat"
            element={
              <PageWrapper image={MortyBackground1}>
                <Chat />
              </PageWrapper>
            }
          />
          <Route
            path="matchmaking"
            element={
              <PageWrapper image={HomeBackground}>
                <Matchmaking />
              </PageWrapper>
            }
          />
          <Route
            path="games"
            element={
              <PageWrapper image={MortyBackground0}>
                <Games />
              </PageWrapper>
            }
          />
          <Route
            path="profile"
            element={
              <PageWrapper image={MortyBackground2}>
                <Profile />
              </PageWrapper>
            }
          />
          <Route
            path="about"
            element={
              <PageWrapper image={MortyBackground3}>
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="originalpong"
            element={
              <PageWrapper image={HomeBackground}>
                <OriginalPong />
              </PageWrapper>
            }
          />
          <Route
            path="pongai"
            element={
              <PageWrapper image={HomeBackground}>
                <PongAi />
              </PageWrapper>
            }
          />
          <Route
            path="pong3d"
            element={
              <PageWrapper image={HomeBackground}>
                <Pong3D />
              </PageWrapper>
            }
          />
          <Route
            path="pongai"
            element={
              <PageWrapper image={HomeBackground}>
                <PongAi />
              </PageWrapper>
            }
          />
          <Route
            path="choosepongmode"
            element={
              <PageWrapper image={HomeBackground}>
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
