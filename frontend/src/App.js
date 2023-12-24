import React, { useEffect } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import Translation from "./components/Translation";
import Home from "./components/Home";
import Chat from "./components/Chat";
import Games from "./components/Games";
import About from "./components/About";
import NotFound from "./components/404";
import PongAi from "./components/PongAi";
import Sidebar from "./components/Sidebar";
import Welcome from "./components/Welcome";
import Profile from "./components/Profile";
import HomeBackground from "./images/bg0.png";
import Matchmaking from "./components/Matchmaking";
import OriginalPong from "./components/OriginalPong";
import ChoosePongMode from "./components/ChoosePongMode";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const PageWrapper = ({ children, backgroundImage }) => {
  return (
    <div
      className="bg-cover bg-center h-screen w-full"
      style={{
        height: '100vh',
        overflow: 'hidden',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Sidebar />
      {children}
    </div>
  );
};

function App() {
  const { i18n } = useTranslation();
  const basename = process.env.NODE_ENV === 'production' ? '/Transcendence' : '';

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
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
              <Welcome />
            }
          />
          <Route
            path="home"
            element={
              <PageWrapper backgroundImage={HomeBackground}>
                <Sidebar />
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="chat"
            element={
              <PageWrapper backgroundImage={HomeBackground}>
                <Sidebar />
                <Chat />
              </PageWrapper>
            }
          />
          <Route
            path="matchmaking"
            element={
              <PageWrapper backgroundImage={HomeBackground}>
                <Sidebar />
                <Matchmaking />
              </PageWrapper>
            }
          />
          <Route
            path="games"
            element={
              <PageWrapper backgroundImage={HomeBackground}>
                <Sidebar />
                <Games />
              </PageWrapper>
            }
          />
          <Route
            path="profile"
            element={
              <PageWrapper backgroundImage={HomeBackground}>
                <Sidebar />
                <Profile />
              </PageWrapper>
            }
          />
          <Route
            path="about"
            element={
              <PageWrapper backgroundImage={HomeBackground}>
                <Sidebar />
                <About />
              </PageWrapper>
            }
          />
          <Route
            path="originalpong"
            element={
              <PageWrapper backgroundImage={HomeBackground}>
                <Sidebar />
                <OriginalPong
                />
              </PageWrapper>
            }
          />
          <Route
            path="pongai"
            element={
              <PageWrapper backgroundImage={HomeBackground}>
                <Sidebar />
                <PongAi />
              </PageWrapper>
            }
          />
          <Route path="choosepongmode" element={
            <PageWrapper backgroundImage={HomeBackground}>
              <Sidebar />
              <ChoosePongMode
              />
            </PageWrapper>
          }
          />
          <Route
            path="*"
            element={
              <NotFound currentLanguage={i18n.language} />
            }
          />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
