/* disable eslint */

import React, { useState } from "react";
import image from "../../images/transcendence.webp";
import mind from "../../images/sudo_transcEND.png";
import { useOnScreen } from './FadeIn';

function Readme() {
  const [project, visibleProject] = useOnScreen();
  const [mindmap, visibleMindmap] = useOnScreen();
  const [module1, visible1] = useOnScreen();
  const [module2, visible2] = useOnScreen();
  const [module3, visible3] = useOnScreen();
  const [module4, visible4] = useOnScreen();
  const [module5, visible5] = useOnScreen();
  const [module6, visible6] = useOnScreen();
  const [module7, visible7] = useOnScreen();
  const [module8, visible8] = useOnScreen();
  const [module9, visible9] = useOnScreen();
  const [games, visibleGames] = useOnScreen();
  const [pong, visiblePong] = useOnScreen();
  const [pongai, visiblePongai] = useOnScreen();
  const [pong3d, visiblePong3d] = useOnScreen();
  const [game, visibleGame] = useOnScreen();
  const [contributors, visibleContributors] = useOnScreen();
  const [github, visibleGithub] = useOnScreen();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const GreenCheck = () => <span style={{ color: "green" }}>&#x2714;</span>;
  const Major = () => <span className="text-orange-500">Major module:</span>;
  const Minor = () => <span className="text-blue-500">Minor module:</span>;

  return (
    <div className="text-white">
      <div
        ref={project}
        className={`text-center mt-10 mb-10 font-nosifer lg:text-8xl 
        ${visibleProject ? "animate-fadeIn" : "opacity-0"
          }`}
      >
        The Project
      </div>
      {/* DIV CONTAINER FOR THE MINDMAP + OPENING ZOOMED IN & CLOSING */}
      <div className="flex flex-col items-center justify-center">
        <img
          ref={mindmap}
          className={`cursor-pointer max-w-[400px] max-h-[400px] 
          ${visibleMindmap ? "animate-fadeIn" : "opacity-0"
            }`}
          src={mind}
          alt="Mindmap"
          onClick={handleOpen}
        />
		<div className="text-center mt-10 mb-10">
		  <p className="font-bold">16 Major & 11 Minor modules</p>
		</div>
      </div>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center
			    justify-center bg-black bg-opacity-90"
        >
          <div className="">
            <button
              className="text-red-950 font-bold text-xl"
              onClick={handleClose}
            >
              X
            </button>
            <img
              className="md:max-w-[400px] md:max-h-[400px] lg:max-w-[800px] lg:max-h-[800px]
              xl:max-w-[1000px] xl:max-h-[1000px]"
              src={mind}
              alt="Mindmap"
            />
          </div>
        </div>
      )}
      <div>
        <div className="mt-10 mb-10">
          {/* DIV CONTAINER FOR THE AVAILABLE MODULES FOR THE PROJECT WE CAN CHOOSE FROM */}
          <div className="flex flex-wrap justify-start">
            <div
              ref={module1}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10 
              ${visible1 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">Web</h3>
              <ul>
                <li>
                  <Major /> Use a framework as backend <GreenCheck />
                </li>
                <li>
                  <Minor /> Use a front-end framework or toolkit <GreenCheck />
                  ❓
                </li>
                <li>
                  <Minor /> Use a database for the backend <GreenCheck />
                </li>
                <li>
                  <Major /> Store the score of a tournament in the Blockchain ❌
                </li>
              </ul>
            </div>
            <div
              ref={module2}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10 
              ${visible2 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">User Management</h3>
              <ul>
                <li>
                  <Major /> Standard user management, authentication, users
                  across tournaments <GreenCheck />
                </li>
                <li>
                  <Major /> Implementing a remote authentication <GreenCheck />
                </li>
              </ul>
            </div>
            <div
              ref={module3}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10 
              ${visible3 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">
                Gameplay and User Experience
              </h3>
              <ul>
                <li>
                  <Major /> Remote players ❌
                </li>
                <li>
                  <Major /> Multiplayer (more than 2) <GreenCheck />
                </li>
                <li>
                  <Major /> Add Another Game with User History and Matchmaking
                  ❌
                </li>
                <li>
                  <Minor /> Game customization options <GreenCheck />
                </li>
                <li>
                  <Major /> Live chat <GreenCheck />
                </li>
              </ul>
            </div>
            <div
              ref={module4}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10 
              ${visible4 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">AI-Algo</h3>
              <ul>
                <li>
                  <Major /> Introduce an AI opponent <GreenCheck />
                </li>
                <li>
                  <Minor /> User and game stats dashboard ❌
                </li>
              </ul>
            </div>
            <div
              ref={module5}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10 
              ${visible5 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">Cybersecurity</h3>
              <ul>
                <li>
                  <Major /> Implement WAF/ModSecurity with Hardened
                  Configuration and HashiCorp Vault for Secrets Management ❌
                </li>
                <li>
                  <Minor /> GDPR Compliance Options with User Anonymization,
                  Local Data Management, and Account Deletion ❌
                </li>
                <li>
                  <Major /> Implement Two-Factor Authentication (2FA) and JWT <GreenCheck />
                </li>
              </ul>
            </div>
            <div
              ref={module6}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10 
              ${visible6 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">Devops</h3>
              <ul>
                <li>
                  <Major /> Infrastructure Setup for Log Management ❌
                </li>
                <li>
                  <Minor /> Monitoring system <GreenCheck />
                </li>
                <li>
                  <Major /> Designing the Backend as Microservices ❌
                </li>
              </ul>
            </div>
            <div
              ref={module7}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10
               ${visible7 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">Graphics</h3>
              <ul>
                <li>
                  <Major /> Use advanced 3D techniques <GreenCheck />
                </li>
              </ul>
            </div>
            <div
              ref={module8}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10 
              
              ${visible8 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">Accessibility</h3>
              <ul>
                <li>
                  <Minor /> Support on all devices <GreenCheck />
                </li>
                <li>
                  <Minor /> Expanding browser compatibility <GreenCheck />
                </li>
                <li>
                  <Minor /> Multiple language support <GreenCheck />
                </li>
                <li>
                  <Minor /> Add accessibility for visually impaired users ❌
                </li>
                <li>
                  <Minor /> Server-side rendering (SSR) integration ❌
                </li>
              </ul>
            </div>
            <div
              ref={module9}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10 
              ${visible9 ? "animate-fadeIn" : "opacity-0"
                }`}
            >
              <h3 className="font-nosifer mb-5">Object Oriented</h3>
              <ul>
                <li>
                  <Major /> Replacing Basic Pong with Server-Side Pong and
                  Implementing an API <GreenCheck />
                </li>
                <li>
                  <Major /> Enabling Pong Gameplay via CLI against Web Users
                  with API Integration ❌
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* DIV CONTAINER FOR THE DIFFERENT GAME DISPLAYS */}
      <div className="text-center mb-10">
        <h1
          ref={games}
          className={`font-nosifer lg:text-6xl mb-10 ${visibleGames ? "animate-fadeIn" : "opacity-0"
            }`}
        >
          Games
        </h1>
        <div>
          <div
            ref={pong}
            className={`flex flex-col lg:flex-row justify-center items-center mb-4 p-5 
            ${visiblePong ? "animate-fadeIn" : "opacity-0"
              }`}
          >
            <img
              className="order-first lg:-ml-20 lg:mr-40 max-w-[600px] max-h-[400px]"
              src={image}
              alt="Game 1"
            />
            <div className="order-last">
              <p className="mt-5 mb-5 font-nosifer text-xl text-orange-500">
                Pong
              </p>
              Implementation of the orignal
              <br />
              Pong game, released by Atari in 1972,
              <br />
              is one of the earliest arcade video games.
              <br />
              It's a 2D simulation of table tennis where
              <br />
              each playercontrols a paddle on the screen.
              <br />
              The game, created by Allan Alcorn,
              <br />
              established the video game industry
              <br />
              due to its commercial success.
            </div>
          </div>
          <div
            ref={pongai}
            className={`flex flex-col lg:flex-row justify-center items-center mb-4 p-5 
            ${visiblePongai ? "animate-fadeIn" : "opacity-0"
              }`}
          >
            <div className="mt-5 order-last lg:order-first">
              <p className="mt-5 mb-5 font-nosifer text-xl text-orange-500">
                AI Pong
              </p>
              You are against the mighty & challanging AI!
              <br />
              Where you controll only one paddle
              <br />
              The other is taken by the AI!
              <br />
              Can you be the terminator and beat it?
            </div>
            <img
              className="order-first lg:-mr-20 lg:order-last lg:ml-40 max-w-[600px] max-h-[400px]"
              src={image}
              alt="Game 2"
            />
          </div>
          <div
            ref={pong3d}
            className={`flex flex-col lg:flex-row justify-center items-center mb-4 p-5 
            ${visiblePong3d ? "animate-fadeIn" : "opacity-0"
              }`}
          >
            <img
              className="order-first lg:-ml-20 lg:mr-40 max-w-[600px] max-h-[400px]"
              src={image}
              alt="Game 1"
            />
            <div className="order-last">
              <p className="mt-5 mb-5 font-nosifer text-xl text-orange-500">
                3D Pong
              </p>
              Now the the challange is to survive the
              <br />
              Blackhole!
              <br />
              You lose a ball, you lose a planet!
              <br />
              Can you navigate thru the asteroid fields?
            </div>
          </div>
          <div
            ref={game}
            className={`flex flex-col lg:flex-row justify-center items-center mb-10 p-5 
            ${visibleGame ? "animate-fadeIn" : "opacity-0"
              }`}
          >
            <div className="mt-5 order-last lg:order-first">
              <p className="mt-5 mb-5 font-nosifer text-xl text-orange-500">
                wanna be a game
              </p>
              Implementation of the orignal
              <br />
              Pong game, released by Atari in 1972,
              <br />
              is one of the earliest arcade video games.
              <br />
              It's a 2D simulation of table tennis where
              <br />
              each playercontrols a paddle on the screen.
              <br />
              The game, created by Allan Alcorn,
              <br />
              established the video game industry
              <br />
              due to its commercial success.
            </div>
            <img
              className="order-first lg:-mr-20 lg:order-last lg:ml-40 max-w-[600px] max-h-[400px]"
              src={image}
              alt="Game 2"
            />
          </div>
        </div>
      </div>
      {/* DIV CONTAINER FOR THE GITHUB LINK TO THE PROJECT AND TO THE CONTRIBUTORS */}
      <div
        ref={github}
        className={`text-center mt-24 mb-24 ${visibleGithub ? "animate-fadeIn" : "opacity-0"
          }`}
      >
        <p className="mb-5 font-nosifer lg:text-6xl">Github</p>
        <a
          href="https://github.com/zstenger93/Transcendence"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="mb-10 lg:text-3xl underline font-bold hover:text-blue-700 text-orange-500">
            TranscEND
          </p>
        </a>
      </div>
      <div
        ref={contributors}
        className={`text-center mt-10 mb-48 ${visibleContributors ? "animate-fadeIn" : "opacity-0"
          }`}
      >
        <p className="font-nosifer lg:text-6xl mb-10">Contributors</p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a
            href="https://github.com/zstenger93"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zsolt Stenger
          </a>
        </p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a
            href="https://github.com/kvebers"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kārlis Vilhelms Vēbers
          </a>
        </p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a
            href="https://github.com/Jamshidbek2000"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jamshidbek Ergashev
          </a>
        </p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a
            href="https://github.com/AzerSD"
            target="_blank"
            rel="noopener noreferrer"
          >
            Azer Sioud
          </a>
        </p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a
            href="https://github.com/Lacusch"
            target="_blank"
            rel="noopener noreferrer"
          >
            Szabó László
          </a>
        </p>
      </div>
    </div>
  );
}

export default Readme;
