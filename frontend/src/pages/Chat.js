import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/buttons/BackButton";
// import { ButtonStyle } from "../components/buttons/ButtonStyle";

function Chat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentChannel, setCurrentChannel] = useState("General");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatSocket = useRef(null);
  const messageInputRef = useRef(null);
  const mounted = useRef(true);
  const [onlineUsers, setOnlineUsers] = useState(null);

  useEffect(() => {
    if (!chatSocket.current) {
      chatSocket.current = new WebSocket(
        process.env.REACT_APP_LOCAL_URI.replace("https", "wss") + "/chat/"
      );
    }

    const handleNewMessage = (e) => {
      var data = JSON.parse(e.data);

      switch (data["type"]) {
        case "general_channel":
          console.log("Received a group message");
          break;
        case "private_channel":
          console.log("Received a private message");
          break;
        case "notify_user_joined":
          console.log("A user has joined the chat");
          setOnlineUsers(data["online_users"]);
          console.log(data["online_users"]);
          break;
        case "notify_user_left":
          console.log("A user has left the chat");
          setOnlineUsers(data["online_users"]);
          console.log(data["online_users"]);
          break;
        default:
          console.log("Received an unknown message type");
      }

      console.log("Data from consumer: " + JSON.stringify(data, null, 2));
      var message = data["message"];
      setMessages((messages) => [
        ...messages,
        {
          channel: currentChannel,
          text: message,
        },
      ]);
    };

    chatSocket.current.onmessage = handleNewMessage;

    return () => {
      if (!mounted.current) {
        chatSocket.current.close();
      } else {
        mounted.current = false;
      }
    };
  }, [currentChannel]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  const handleSendMessage = (event) => {
    event.preventDefault();
    if (chatSocket.current.readyState === WebSocket.OPEN) {
      chatSocket.current.send(
        JSON.stringify({
          message: messageInputRef.current.value,
          receiver: "general_group",
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
        </div>
        <BackButton navigate={navigate} t={t} />
      </div>
    );
  }

  function OnlineUsersList() {
	console.log(onlineUsers);
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
                <li key={index} className="mb-4">
                  {user}
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
                <p key={index}>
                  {message.text}
                  {/* {message.image && (
                    <img
                      src={message.image}
                      alt=""
                      className="max-h-32 cursor-pointer"
                      onClick={() => handleImageClick(message.image)}
                    />
                  )} */}
                </p>
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
            {/* <input
              type="file"
              id="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div className="flex justify-center">
              <label
                htmlFor="file"
                className={`cursor-pointer ${ButtonStyle}`}
              >
                {t("Choose File")}
              </label>
            </div>
            {uploadedFileName && (
              <p className="text-center">{uploadedFileName}</p>
            )} */}
          </form>
        </div>
        <div className="hidden md:block">
          <OnlineUsersList />
        </div>
      </div>
      {/* {viewingImage && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full 
		  bg-black bg-opacity-50"
          onClick={() => setViewingImage(null)}
        >
          <img src={viewingImage} alt="" className="max-h-full max-w-full" />
        </div>
      )} */}
    </div>
  );
}

export default Chat;
