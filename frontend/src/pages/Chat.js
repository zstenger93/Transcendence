import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
import { getUserDetails } from "../components/API";
// import { ButtonStyle } from "../components/buttons/ButtonStyle";

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

  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log("redirectUri", redirectUri);
      const details = await getUserDetails({ redirectUri });
      console.log("Fetched user details:", details);
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
          console.log("Received a group message");
          setMessages((messages) => [
            ...messages,
            {
              channel: "General",
              text: message,
            },
          ]);
          break;
        case "private_channel":
          console.log("Received a private message");
		  console.log("current: ", currentChannel);
		  console.log("rec: ", data["receiver"]);
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
          console.log("A user has joined the chat");
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
          console.log("A user has left the chat");
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
          console.log("Received an unknown message type");
      }

      console.log("Data from consumer: " + JSON.stringify(data, null, 2));
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
      console.log("currentchannel: ", currentChannel);
      chatSocket.current.send(
        JSON.stringify({
          message: messageInputRef.current.value,
          receiver:
            currentChannel === "General" ? "general_group" : currentChannel,
        })
      );
      console.log("Sent message: " + messageInputRef.current.value);
      messageInputRef.current.value = "";
      setNewMessage("");
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
                      <li onClick={() => handleMessageOption(user)}>Message</li>
                      <li>Friend Request</li>
                      <li>Block</li>
                    </ul>
                  )}
                </li>
              ))
            ) : (
              <li>No users online</li>
            )}
          </ul>
        </div>
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
