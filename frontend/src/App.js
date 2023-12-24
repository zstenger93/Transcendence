import React from "react";
import { I18nextProvider } from "react-i18next";
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
import backgroundImage from "./images/bg0.png";
import Matchmaking from "./components/Matchmaking";
import OriginalPong from "./components/OriginalPong";
import ChoosePongMode from "./components/ChoosePongMode";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const PageWrapper = ({ children }) => {
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
  const basename = process.env.NODE_ENV === 'production' ? '/Transcendence' : '';

  return (
    <I18nextProvider i18n={Translation}>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="home" element={<PageWrapper><Sidebar /><Home /></PageWrapper>} />
          <Route path="chat" element={<PageWrapper><Sidebar /><Chat /></PageWrapper>} />
          <Route path="matchmaking" element={<PageWrapper><Sidebar /><Matchmaking /></PageWrapper>} />
          <Route path="games" element={<PageWrapper><Sidebar /><Games /></PageWrapper>} />
          <Route path="profile" element={<PageWrapper><Sidebar /><Profile /></PageWrapper>} />
          <Route path="about" element={<PageWrapper><Sidebar /><About /></PageWrapper>} />
          <Route path="originalpong" element={<PageWrapper><Sidebar /><OriginalPong /></PageWrapper>} />
          <Route path="pongai" element={<PageWrapper><Sidebar /><PongAi /></PageWrapper>} />
          <Route path="choosepongmode" element={<PageWrapper><Sidebar /><ChoosePongMode /></PageWrapper>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;
