/* disable eslint */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonStyle } from "../components/buttons/ButtonStyle";
import UserSettings from "../components/profile/UserSettings";
import axios from "axios";

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

function FriendsList() {
  const { t } = useTranslation();
  return (
    <div
      className="bg-gray-900 bg-opacity-80 p-4 rounded-md max-h-96
	overflow-y-auto mb-10 border-r-2 border-b-2 border-purple-600"
    >
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
      rounded-md max-h-96 overflow-y-auto mb-10 sm:w-full
	  border-r-2 border-b-2 border-purple-600"
    >
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

const defaultUserDetails = {
  title: "Mastermind",
  username: "TrasnscEND",
  email: "fake@mail.com",
  about: "I turn people crazy with my clear subject description.",
  age: 42,
  gender: "Computer",
  school: "42 Heilbronn",
  level: "42.42",
  wins: "42",
  profile_picture:
    "https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp",
};

export const getUserDetails = async ({ redirectUri }) => {
  let response = {};
  try {
    const token = localStorage.getItem("access");
    response = await axios.get(`${redirectUri}/api/profile`, {
      headers: {
        withCredentials: true,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
  return response;
};

function Profile({ redirectUri }) {
  const [userDetails, setUserDetails] = useState(null);
  const [imageUrl, setImageUrl] = useState(defaultUserDetails.profile_picture);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await getUserDetails({ redirectUri });
      setUserDetails(response.data.user);
      let asd = response.data.user.profile_picture.replace("/media/", "");
      let url = decodeURIComponent(asd).replace(":", ":/");
      setImageUrl(url);
    };

    fetchUserDetails();
  }, [redirectUri]);

  console.log(userDetails);

  const { t } = useTranslation();
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [showMatchHistory, setShowMatchHistory] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);

  const toggleFriendsList = () => {
    setShowFriendsList(!showFriendsList);
    setShowMatchHistory(false);
    setShowUserSettings(false);
  };

  const toggleMatchHistory = () => {
    setShowMatchHistory(!showMatchHistory);
    setShowFriendsList(false);
    setShowUserSettings(false);
  };

  const toggleUserSettings = () => {
    setShowUserSettings(!showUserSettings);
    setShowFriendsList(false);
    setShowMatchHistory(false);
  };

  return (
    <div
      className="flex flex-col items-center justify-center
    min-h-screen bg-cover bg-center bg-no-repeat shadow-xl"
    >
      <div className="max-w-md flex flex-col items-center">
        <div
          className="bg-gray-900 bg-opacity-80 rounded-xl
			p-6 shadow-md text-center border-r-2 border-b-2 
			border-purple-600"
        >
          <img
            src={imageUrl}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />
          <h2 className="text-gray-300 font-nosifer text-1.5xl font-bold">
            {userDetails?.title || defaultUserDetails.title}{" "}
            {userDetails?.username || defaultUserDetails.username}
          </h2>
          <p className="text-purple-400">
            {userDetails?.email || defaultUserDetails.email}
          </p>

          <div className="mt-8">
            <h3 className="font-nosifer text-gray-300 font-semibold mb-4">
              {t("About Me")}
            </h3>
            <p className="text-purple-400">
              {userDetails?.about || defaultUserDetails.about}
            </p>
          </div>
          <div className="mt-8">
            <h3 className="font-nosifer text-gray-300 font-semibold mb-4">
              {t("User Details")}
            </h3>
            <p className="text-purple-400">
              <strong>{t("School")}:</strong>{" "}
              {userDetails?.school || defaultUserDetails.school}
              <br />
              <strong>{t("Level")}:</strong>{" "}
              {userDetails?.intra_level || defaultUserDetails.level}
              <br />
              <strong>{t("Win Rate")}:</strong>{" "}
              {userDetails?.wins || defaultUserDetails.wins}
            </p>
          </div>
          <div className="mt-8 justify-center space-x-4 text-center">
            <div className="inline-flex space-x-4 justify-center">
              <button
                className={`w-38 ${ButtonStyle}
				${showFriendsList ? "bg-purple-600 text-gray-300" : "text-gray-300"}`}
                onClick={toggleFriendsList}
              >
                {t("Friends")}
              </button>
              <button
                className={`w-38 ${ButtonStyle}
				${showUserSettings ? "bg-purple-600 text-gray-300" : "text-gray-300"}`}
                onClick={toggleUserSettings}
              >
                {t("Settings")}
              </button>
            </div>
            <div className="mt-4 inline-flex justify-center text-center">
              <button
                className={`w-38 ${ButtonStyle}
				${showMatchHistory ? "bg-purple-600 text-gray-300" : "text-gray-300"}`}
                onClick={toggleMatchHistory}
              >
                {t("Match History")}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 mb-10">
          {showFriendsList && <FriendsList />}
          {showMatchHistory && <MatchHistory />}
          {showUserSettings && <UserSettings redirectUri={redirectUri} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
