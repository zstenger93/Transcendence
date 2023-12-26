import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Chat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentChannel, setCurrentChannel] = useState("General");
  const [viewingImage, setViewingImage] = useState(null);
  const [pastedImage, setPastedImage] = useState(null);
  const [uploadedFileName, setUploadedFileName] = React.useState("");
  const [onlineUsers] = useState([
    "kvebers",
    "Jesus",
    "asioud",
    "zstenger",
    "jergashe",
  ]);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPastedImage(reader.result);
        setUploadedFileName(file.name);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (event) => {
    if (event.clipboardData.files.length > 0) {
      const file = event.clipboardData.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setPastedImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (image) => {
    setViewingImage(image);
  };

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (newMessage || pastedImage) {
      setMessages((messages) => [
        ...messages,
        {
          channel: currentChannel,
          text: newMessage,
          image: pastedImage,
        },
      ]);

      setNewMessage("");
      setPastedImage(null);
      setUploadedFileName("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSendMessage(event);
    }
  };

  function ChannelList() {
    const channels = ["General", "Random", "Memes"];

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
                className={`cursor-pointer my-4 ${channel === currentChannel ? 'text-purple-500 font-nosifer' : ''}`}
                onClick={() => setCurrentChannel(channel)}
              >
                {channel}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="bg-purple-900 bg-opacity-80 hover:bg-purple-700 
		  text-white font-bold py-2 px-4 rounded  border-b-2 border-r-2 border-purple-600"
        >
          {t("Back")}
        </button>
      </div>
    );
  }

  function OnlineUsersList() {
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
            {onlineUsers.map((user, index) => (
              <li key={index} className="mb-4">
                {user}
              </li>
            ))}
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
                  {message.image && (
                    <img
                      src={message.image}
                      alt=""
                      className="max-h-32 cursor-pointer"
                      onClick={() => handleImageClick(message.image)}
                    />
                  )}
                </p>
              ))}
          </div>
          <form onSubmit={handleSendMessage}>
            <textarea
              value={newMessage}
              onChange={handleNewMessageChange}
              onKeyPress={handleKeyPress}
              onPaste={handlePaste}
              className="border border-purple-500 bg-gray-900 bg-opacity-80 
			  rounded p-2 w-full"
              placeholder={t("Type your message here...")}
            />
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <div className="flex justify-center">
              <label
                htmlFor="file"
                className="cursor-pointer bg-purple-900 hover:bg-purple-700 
				text-white font-bold py-2 px-4 rounded  border-b-2 border-r-2 border-purple-600"
              >
                {t("Choose File")}
              </label>
            </div>
            {uploadedFileName && (
              <p className="text-center">{uploadedFileName}</p>
            )}
          </form>
        </div>
        <div className="hidden md:block">
          <OnlineUsersList />
        </div>
      </div>
      {viewingImage && (
        <div
          className="fixed top-0 left-0 flex items-center justify-center w-full h-full 
		  bg-black bg-opacity-50"
          onClick={() => setViewingImage(null)}
        >
          <img src={viewingImage} alt="" className="max-h-full max-w-full" />
        </div>
      )}
    </div>
  );
}

export default Chat;
