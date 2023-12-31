import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const friendsListData = [
  {
    name: "Zsolt",
    intra: "zstenger",
    profileLink: "https://profile.intra.42.fr/users/zstenger",
  },
  {
    name: "Karlis",
    intra: "kvebers",
    profileLink: "https://profile.intra.42.fr/users/kvebers",
  },
  {
    name: "Jergashe",
    intra: "jergahse",
    profileLink: "https://profile.intra.42.fr/users/jergashe",
  },
  {
    name: "Azer",
    intra: "asioud",
    profileLink: "https://profile.intra.42.fr/users/asioud",
  },
  {
    name: "Emotional Damage",
    intra: "ed",
    profileLink: "https://github.com/zstenger93/Transcendence",
  },
];

const matchHistoryData = [
  {
    opponent: "EmotionalDmg",
    result: "Win",
    score: "5 - 2",
    game: "Pong",
    type: "Original",
  },
  {
    opponent: "ChuckNorris",
    result: "Loss",
    score: "1 - 4",
    game: "Pong",
    type: "Modded",
  },
  {
    opponent: "Segfault",
    result: "Win",
    score: "3 - 0",
    game: "Pong",
    type: "Original",
  },
  {
    opponent: "I did parsing",
    result: "Win",
    score: "6 - 3",
    game: "Pong",
    type: "Original",
  },
  {
    opponent: "Jesus",
    result: "Loss",
    score: "0 - 3",
    game: "Pong",
    type: "Modded",
  },
  {
    opponent: "Karlis",
    result: "Loss",
    score: "1 - 4",
    game: "Pong",
    type: "Modded",
  },
  {
    opponent: "Azer",
    result: "Win",
    score: "5 - 2",
    game: "Pong",
    type: "Original",
  },
  {
    opponent: "Jamshidbek",
    result: "Win",
    score: "3 - 0",
    game: "Pong",
    type: "Modded",
  },
  {
    opponent: "Zsolt",
    result: "Win",
    score: "4 - 1",
    game: "Pong",
    type: "Original",
  },
];

const userDetails = {
  title: "Mastermind",
  username: "TrasnscEND",
  email: "fake@mail.com",
  about: "I turn people crazy with my clear subject description.",
  age: 42,
  gender: "Computer",
  school: "42 Heilbronn",
  level: "42.42",
  winRate: "42%",
};

function FriendsList() {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-900 bg-opacity-80 p-4 rounded-md max-h-96 overflow-y-auto mb-10">
      <h3 className="text-xl text-gray-300 font-nosifer font-bold mb-4 text-center">
        {t("Friends")}
      </h3>
      <table
        className="bg-purple-900 bg-opacity-60 w-full border-collapse border 
		border-gray-500 mx-auto"
      >
        <thead>
          <tr>
            <th className="p-2 border border-gray-900 mx-auto">{t("Name")}</th>
            <th className="p-2 border text-center border-gray-900 mx-auto">
              {t("Intra")}
            </th>
          </tr>
        </thead>
        <tbody>
          {friendsListData.map((friend, index) => (
            <tr key={index} className="bg-white bg-opacity-10">
              <td className="p-2 border border-gray-900 mx-auto">
                {friend.name}
              </td>
              <td className="p-2 border text-center border-gray-900 mx-auto">
                <a
                  href={friend.profileLink}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {friend.intra}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MatchHistory() {
  const { t } = useTranslation();
  return (
    <div
      className="bg-gray-900 bg-opacity-80 p-6 shadow-xl
      rounded-md max-h-96 overflow-y-auto mb-10 sm:w-full">
      <h3 className="text-xl text-gray-300 font-nosifer font-bold mb-4 text-center">
        {t("Match History")}
      </h3>
      <table
        className="bg-purple-900 bg-opacity-60 w-full border-collapse border 
		  border-gray-900 mx-auto"
      >
        <thead>
          <tr>
            <th className="p-2 border border-gray-900 mx-auto">
              {t("Opponent")}
            </th>
            <th className="p-2 border text-center border-gray-900 mx-auto">
              {t("Result")}
            </th>
            <th className="p-2 border text-center border-gray-900 mx-auto">
              {t("Score")}
            </th>
            <th className="p-2 border text-center border-gray-900 mx-auto">
              {t("Game")}
            </th>
            <th className="p-2 border text-center border-gray-900 mx-auto">
              {t("Type")}
            </th>
          </tr>
        </thead>
        <tbody>
          {matchHistoryData.map((match, index) => (
            <tr key={index} className="bg-white bg-opacity-10">
              <td className="p-2 border border-gray-900 mx-auto">
                {match.opponent}
              </td>
              <td
                className={`p-2 border text-center border-gray-900 mx-auto ${
                  match.result === t("Win") ? "text-green-700" : "text-red-700"
                }`}
              >
                {t(match.result)}
              </td>
              <td className="p-2 border text-center border-gray-900 mx-auto">
                {match.score}
              </td>
              <td className="p-2 border text-center border-gray-900 mx-auto">
                {match.game}
              </td>
              <td
                className={`p-2 border text-center border-gray-900 mx-auto ${
                  match.type === t("Original")
                    ? "text-blue-700"
                    : "text-yellow-700"
                }`}
              >
                {t(match.type)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Profile() {
  const { t } = useTranslation();
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [showMatchHistory, setShowMatchHistory] = useState(false);

  const toggleFriendsList = () => {
    setShowFriendsList(!showFriendsList);
    setShowMatchHistory(false);
  };

  const toggleMatchHistory = () => {
    setShowMatchHistory(!showMatchHistory);
    setShowFriendsList(false);
  };

  // THIS IS TOTALLY GARBAGE
  // useEffect(() => {
  //   const originalBackground = document.body.style.background;
  
  //   document.body.style.background = "url('src/images/morty2.png') center center/cover no-repeat";
  
  //   document.body.classList.add('overflow-y-auto');
  
  //   return () => {
  //     document.body.style.background = originalBackground;
  
  //     document.body.classList.remove('overflow-y-auto');
  //   };
  // }, []);

  return (
    <div
    className="flex flex-col items-center justify-center
    min-h-screen bg-cover bg-center bg-no-repeat shadow-xl"
    >
      <div className="max-w-md flex flex-col items-center">
        <div
          className="bg-gray-900 bg-opacity-80 rounded-md
			    p-6 shadow-md text-center"
        >
          <img
            src="https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp"
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-gray-300 font-nosifer text-1.5xl font-bold">
            {userDetails.title} {userDetails.username}
          </h2>
          <p className="text-purple-400">{userDetails.email}</p>

          <div className="mt-8">
            <h3 className="font-nosifer text-gray-300 font-semibold mb-4">
              {t("About Me")}
            </h3>
            <p className="text-purple-400">{userDetails.about}</p>
          </div>
          <div className="mt-8">
            <h3 className="font-nosifer text-gray-300 font-semibold mb-4">
              {t("User Details")}
            </h3>
            <p className="text-purple-400">
              <strong>{t("Age")}:</strong> {userDetails.age} {t("years old")}
              <br />
              <strong>{t("Gender")}:</strong> {userDetails.gender}
              <br />
              <strong>{t("School")}:</strong> {userDetails.school}
              <br />
              <strong>{t("Level")}:</strong> {userDetails.level}
              <br />
              <strong>{t("Win Rate")}:</strong> {userDetails.winRate}
            </p>
          </div>
          <div className="mt-8 flex justify-center space-x-4">
            <button
              className={`w-36 bg-blue-300 bg-opacity-80 font-bold py-2 px-4 rounded 
              border-b-2 border-r-2 border-purple-600
              ${
                showFriendsList
                ?
                "bg-purple-600 text-white"
                :
                "text-gray-700 hover:bg-purple-600 hover:text-white"
              }`}
              onClick={toggleFriendsList}
            >
              {t("Friends")}
            </button>
            <button
              className={`w-36 bg-blue-300 bg-opacity-80 font-bold py-2 px-4 rounded 
              border-b-2 border-r-2 border-purple-600
              ${
                showMatchHistory ? "bg-purple-600 text-white" : "text-gray-700 hover:bg-purple-600 hover:text-white"
              }`}
              onClick={toggleMatchHistory}
            >
              {t("Match History")}
            </button>
          </div>
        </div>
        <div className="mt-8 mb-10">
          {showFriendsList && <FriendsList />}
          {showMatchHistory && <MatchHistory />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
