import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
import {
  getUserDetails,
  getUserProfile,
  addUserToFriendList,
  getFriendList,
} from "../components/API";

function Chat({ redirectUri }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentChannel, setCurrentChannel] = useState("General");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatSocket = useRef(null);
  const messageInputRef = useRef(null);
  const mounted = useRef(true);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const userDetailsRef = useRef(null);
  const [userDetails, setUserDetails] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserProfile = async (userName) => {
    //   console.log("redirectUri", redirectUri);
    if (userName) {
      const details = await getUserProfile({ redirectUri, userName });
      setUserDetails(details.data);
    }
    //   console.log("Fetched user details:", details);
  };

  useEffect(() => {
    if (userDetails) {
      //   console.log("user_profile_details: ", userDetails);
      setIsModalOpen(true);
    }
  }, [userDetails]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      //   console.log("redirectUri", redirectUri);
      const details = await getUserDetails({ redirectUri });
      //   console.log("Fetched user details:", details);
      userDetailsRef.current = details;
    };

    fetchUserDetails();
  }, [redirectUri]);

  useEffect(() => {
    if (!chatSocket.current) {
      chatSocket.current = new WebSocket(
        process.env.REACT_APP_LOCAL_URI.replace("https", "wss") + "/chat/"
      );
    }

    const handleNewMessage = (e) => {
      var data = JSON.parse(e.data);
      var message = data["message"];

      switch (data["type"]) {
        case "general_channel":
          //   console.log("Received a group message");
          setMessages((messages) => [
            ...messages,
            {
              channel: "General",
              text: message,
            },
          ]);
          break;
        case "private_channel":
          //   console.log("Received a private message");
          //   console.log("current: ", currentChannel);
          //   console.log("rec: ", data["receiver"]);
          setPrivateMessages((prevMessages) => {
            if (!prevMessages.includes(data["sender"])) {
              return [...prevMessages, data["sender"]];
            } else {
              return prevMessages;
            }
          });
          setMessages((messages) => [
            ...messages,
            {
              channel: data["sender"],
              text: message,
            },
          ]);
          break;
        case "notify_user_joined":
          //   console.log("A user has joined the chat");
          setOnlineUsers(data["online_users"]);
          setMessages((messages) => [
            ...messages,
            {
              channel: currentChannel,
              text: message,
            },
          ]);
          break;
        case "notify_user_left":
          //   console.log("A user has left the chat");
          setOnlineUsers(data["online_users"]);
          setMessages((messages) => [
            ...messages,
            {
              channel: currentChannel,
              text: message,
            },
          ]);
          break;
        default:
        //   console.log("Received an unknown message type");
      }
      //   console.log("Data from consumer: " + JSON.stringify(data, null, 2));
    };

    chatSocket.current.onmessage = handleNewMessage;

    return () => {
      if (!mounted.current) {
        chatSocket.current.close();
      } else {
        mounted.current = false;
      }
    };
    // eslint-disable-next-line
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (chatSocket.current.readyState === WebSocket.OPEN) {
      if (currentChannel !== userDetailsRef.current.data.user.username) {
        chatSocket.current.send(
          JSON.stringify({
            message: messageInputRef.current.value,
            receiver:
              currentChannel === "General" ? "general_group" : currentChannel,
          })
        );
        messageInputRef.current.value = "";
        setNewMessage("");
      } else {
        console.error("Cannot send a private message to yourself.");
      }
    } else {
      console.error(
        "WebSocket is not open. readyState = " + chatSocket.current.readyState
      );
    }
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const [privateMessages, setPrivateMessages] = useState([]);

  const handleMessageOption = (user) => {
    setPrivateMessages((prevMessages) => {
      if (!prevMessages.includes(user)) {
        return [...prevMessages, user];
      } else {
        return prevMessages;
      }
    });
  };

  const openProfile = (user) => {
    fetchUserProfile(user);
  };

  const addFriend = async (user) => {
    if (true) {
      addUserToFriendList({ redirectUri, userName: user });
      const friends = await getFriendList({
        redirectUri,
        userName: "zstenger",
      });
      console.log("Friends: ", friends);
    } else {
      console.error(
        "userDetailsRef.current or userDetailsRef.current.user is undefined"
      );
    }
  };
  const blockUser = (user) => {};
  const unblockuser = (user) => {};

  function ChannelList() {
    const { t } = useTranslation();
    const channels = ["General"];

    return (
      <div
        className="flex flex-col justify-between w-1/7 p-6 text-white
		text-center bg-gray-900 bg-opacity-80 rounded-xl shadow h-full"
      >
        <div>
          <h2 className="mb-8 text-2xl font-nosifer font-bold text-gray-300">
            {t("Channels")}
          </h2>
          <ul>
            {channels.map((channel, index) => (
              <li
                key={index}
                className={`cursor-pointer my-4 ${
                  channel === currentChannel
                    ? "text-purple-500 font-nosifer"
                    : ""
                }`}
                onClick={() => setCurrentChannel(channel)}
              >
                {channel}
              </li>
            ))}
          </ul>
          <h2 className="mb-8 mt-8 text-2xl font-nosifer font-bold text-gray-300">
            {t("Private")}
          </h2>
          <ul>
            {privateMessages.map((user, index) => (
              <li
                key={index}
                className={`cursor-pointer my-4 font-bold ${
                  user === currentChannel ? "text-purple-500 font-nosifer" : ""
                }`}
                onClick={() => setCurrentChannel(user)}
              >
                {user}
              </li>
            ))}
          </ul>
        </div>
        <BackButton navigate={navigate} t={t} />
      </div>
    );
  }

  function OnlineUsersList() {
    const [dropdownUser, setDropdownUser] = useState(null);

    const handleUserClick = (user) => {
      if (dropdownUser === user) {
        setDropdownUser(null);
      } else {
        setDropdownUser(user);
      }
    };

    return (
      <div
        className="flex flex-col justify-between w-1/7 p-6 text-white
		text-center bg-gray-900 bg-opacity-80 rounded-xl shadow h-full"
      >
        <div>
          <h2 className="mb-8 text-2xl font-nosifer font-bold text-gray-300">
            {t("Online")}
          </h2>
          <ul>
            {onlineUsers ? (
              onlineUsers.map((user, index) => (
                <li
                  key={index}
                  className="mb-4 cursor-pointer font-bold"
                  onClick={() => handleUserClick(user)}
                >
                  {user}
                  {dropdownUser === user && (
                    <ul className="bg-purple-500 rounded-xl bg-opacity-20">
                      {user !== userDetailsRef.current.data.user.username && (
                        <li onClick={() => handleMessageOption(user)}>
                          Message
                        </li>
                      )}
                      <li onClick={() => openProfile(user)}>Profile</li>
                      <li onClick={() => addFriend(user)}>Friend Request</li>
                      <li onClick={() => blockUser(user)}>Block</li>
                      <li onClick={() => unblockuser(user)}>Unblock</li>
                    </ul>
                  )}
                </li>
              ))
            ) : (
              <li>No users online</li>
            )}
          </ul>
        </div>
        {isModalOpen && userDetails && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div
              className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20
						text-center sm:block sm:p-0"
            >
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div
                className="inline-block align-bottom rounded-lg text-left
						overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle
						sm:max-w-lg sm:w-full"
              >
                <div className=" bg-blue-500 bg-opacity-25 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-center">
                  <span
                    className="close float-right text-red-500 mouse-pointer text-xl"
                    onClick={closeModal}
                  >
                    &times;
                  </span>
                  <img
                    className="w-24 h-24 rounded-full mb-4 mx-auto"
                    src={userDetails.user.profile_picture}
                    alt="Profile"
                  />
                  <p className="font-nosifer mb-2">
                    {userDetails.user.title} {userDetails.user.username}
                  </p>
                  <p className="font-bold">
                    Intra Level: {userDetails.user.intra_level}
                  </p>
                  <p className="font-bold">Email: {userDetails.user.email}</p>
                  <p className="font-bold">School: {userDetails.user.school}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex w-full md:w-4/6 space-x-2">
        <div className="hidden md:block">
          <ChannelList />
        </div>
        <div
          className="w-full p-6 text-white bg-gray-900 bg-opacity-80 
			rounded-xl shadow"
        >
          <div
            className="overflow-auto h-96 mb-4 border border-purple-500 
		  	rounded-xl p-4 shadow"
          >
            {messages
              .filter((message) => message.channel === currentChannel)
              .map((message, index) => (
                <p key={index}>{message.text}</p>
              ))}
          </div>
          <form onSubmit={handleSendMessage}>
            <textarea
              ref={messageInputRef}
              value={newMessage}
              onChange={handleNewMessageChange}
              onKeyPress={handleKeyPress}
              className="border border-purple-500 bg-gray-900 bg-opacity-80 
			  rounded p-2 w-full"
              placeholder={t("Type your message here...")}
            />
          </form>
        </div>
        <div className="hidden md:block">
          <OnlineUsersList />
        </div>
      </div>
    </div>
  );
}

export default Chat;
