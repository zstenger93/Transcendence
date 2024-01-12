/* disable eslint */

import React from "react";
import image from "../../images/transcendence.webp";

function Readme() {
  const GreenCheck = () => <span style={{ color: "green" }}>&#x2714;</span>;
  const Major = () => <span className="text-orange-500">Major module:</span>;
  const Minor = () => <span className="text-blue-500">Minor module:</span>;
  return (
    <div className="max-w-none text-white">
      <div className="text-center mt-10 mb-10 font-nosifer lg:text-8xl">
        The Project
      </div>
      <div>
        <div className="mt-10 mb-10">
          <div className="text-center mb-10">
            <p className="font-bold">16 Major & 11 Minor module</p>
          </div>
          <div className="flex flex-wrap justify-start">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
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
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
              <h3 className="font-nosifer mb-5">User Management</h3>
              <ul>
                <li>
                  <Major /> Standard user management, authentication, users
                  across tournaments ❌
                </li>
                <li>
                  <Major /> Implementing a remote authentication <GreenCheck />
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
              <h3 className="font-nosifer mb-5">
                Gameplay and User Experience
              </h3>
              <ul>
                <li>
                  <Major /> Remote players ❌
                </li>
                <li>
                  <Major /> Multiplayer (more than 2) ❌
                </li>
                <li>
                  <Major /> Add Another Game with User History and Matchmaking
                  ❌
                </li>
                <li>
                  <Minor /> Game customization options ❌
                </li>
                <li>
                  <Major /> Live chat ❌
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
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
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
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
                  <Major /> Implement Two-Factor Authentication (2FA) and JWT ❌
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
              <h3 className="font-nosifer mb-5">Devops</h3>
              <ul>
                <li>
                  <Major /> Infrastructure Setup for Log Management ❌
                </li>
                <li>
                  <Minor /> Monitoring system ❌
                </li>
                <li>
                  <Major /> Designing the Backend as Microservices ❌
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
              <h3 className="font-nosifer mb-5">Graphics</h3>
              <ul>
                <li>
                  <Major /> Use advanced 3D techniques <GreenCheck />
                </li>
              </ul>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
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
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 text-center mb-10 xl:pr-10 xl:pl-10">
              <h3 className="font-nosifer mb-5">Object Oriented</h3>
              <ul>
                <li>
                  <Major /> Replacing Basic Pong with Server-Side Pong and
                  Implementing an API ❌
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
      <div className="text-center mb-10">
        <h1 className="font-nosifer lg:text-6xl mb-10">Games</h1>
        <div>
          <div className="flex flex-col lg:flex-row justify-center items-center mb-4 p-5">
            <img className="order-first lg:-ml-20 lg:mr-40 max-w-[600px] max-h-[400px]" src={image} alt="Game 1" />
            <p className="order-last">
              <p className="mt-5 font-nosifer text-xl text-orange-500">Pong</p>
              Implementation of the orignal<br />
              Pong game, released by Atari in 1972,<br />
              is one of the earliest arcade video games.<br />
              It's a 2D simulation of table tennis where<br />
              each playercontrols a paddle on the screen.<br />
              The game, created by Allan Alcorn,<br />
              established the video game industry<br />
              due to its commercial success.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center mb-4 p-5">
            <p className="mt-5 order-last lg:order-first">
              <p className="mt-5 font-nosifer text-xl text-orange-500">Pong</p>
              Implementation of the orignal<br />
              Pong game, released by Atari in 1972,<br />
              is one of the earliest arcade video games.<br />
              It's a 2D simulation of table tennis where<br />
              each playercontrols a paddle on the screen.<br />
              The game, created by Allan Alcorn,<br />
              established the video game industry<br />
              due to its commercial success.</p>
            <img className="order-first lg:-mr-20 lg:order-last lg:ml-40 max-w-[600px] max-h-[400px]" src={image} alt="Game 2" />
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center mb-4 p-5">
            <img className="order-first lg:-ml-20 lg:mr-40 max-w-[600px] max-h-[400px]" src={image} alt="Game 1" />
            <p className="order-last">
              <p className="mt-5 font-nosifer text-xl text-orange-500">Pong</p>
              Implementation of the orignal<br />
              Pong game, released by Atari in 1972,<br />
              is one of the earliest arcade video games.<br />
              It's a 2D simulation of table tennis where<br />
              each playercontrols a paddle on the screen.<br />
              The game, created by Allan Alcorn,<br />
              established the video game industry<br />
              due to its commercial success.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center mb-10 p-5">
            <p className="mt-5 order-last lg:order-first">
              <p className="mt-5 font-nosifer text-xl text-orange-500">Pong</p>
              Implementation of the orignal<br />
              Pong game, released by Atari in 1972,<br />
              is one of the earliest arcade video games.<br />
              It's a 2D simulation of table tennis where<br />
              each playercontrols a paddle on the screen.<br />
              The game, created by Allan Alcorn,<br />
              established the video game industry<br />
              due to its commercial success.</p>
            <img className="order-first lg:-mr-20 lg:order-last lg:ml-40 max-w-[600px] max-h-[400px]" src={image} alt="Game 2" />
          </div>
        </div>
      </div>
      <div className="text-center mt-10 mb-10">
        <p className="mb-5 font-nosifer lg:text-6xl">Github</p>
        <a href="https://github.com/zstenger93/Transcendence">
          <p className="mb-10 lg:text-3xl underline font-bold hover:text-blue-700 text-orange-500">
            TranscEND
          </p>
        </a>
      </div>
      <div className="text-center mb-10 mt-10">
        <p className="font-nosifer lg:text-6xl mb-10">Contributors</p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a href="https://github.com/zstenger93" target="_blank" rel="noopener noreferrer">
            Zsolt Stenger
          </a>
        </p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a href="https://github.com/kvebers" target="_blank" rel="noopener noreferrer">
            Kārlis Vilhelms Vēbers
          </a>
        </p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a href="https://github.com/Jamshidbek2000" target="_blank" rel="noopener noreferrer">
            Jamshidbek Ergashev
          </a>
        </p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a href="https://github.com/AzerSD" target="_blank" rel="noopener noreferrer">
            Azer Sioud
          </a>
        </p>
        <p className="font-bold mb-2 underline hover:text-blue-700 text-orange-500">
          <a href="https://github.com/Lacusch" target="_blank" rel="noopener noreferrer">
            Szabó László
          </a>
        </p>
      </div>
    </div>
  );
}

export default Readme;
