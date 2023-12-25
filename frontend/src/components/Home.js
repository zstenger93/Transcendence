import React from "react";
import WelcomeMessage from "./WelcomeMessage";

function Home() {
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center bg-no-repeat font-nosifer"
    >
      <WelcomeMessage />
    </div>
  );
}

export default Home;
