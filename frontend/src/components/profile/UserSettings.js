/* disable eslint */

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ButtonStyle } from "../buttons/ButtonStyle";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  activate2FA,
  deactivate2FA,
  deleteAccount,
  changePassword,
  changeAvatar,
} from "../API";

function UserSettings({ setProfilePicture, redirectUri }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({ TwoFA: false });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      changePassword({ redirectUri, password });
    } else {
      alert("Passwords do not match");
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await getUserDetails({ redirectUri });
      setUserDetails(response.data.user);
    };

    fetchUserDetails();
  }, [redirectUri]);

  return (
    <div
      className="bg-gray-900 bg-opacity-80 p-6 shadow-xl
		rounded-md max-h-96 overflow-y-auto mb-10 sm:w-full
		border-r-2 border-b-2 border-purple-600 text-center justify-center"
    >
      <h3 className="text-xl text-gray-300 font-nosifer font-bold mb-4 text-center">
        {t("Settings")}
      </h3>
      <div className="mb-4">
        <label className="text-gray-300">{t("2 Factor Authentication")}</label>
        <div className="relative inline-block w-10 ml-2 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={userDetails?.TwoFA}
            onChange={async () => {
              const newTwoFA = !userDetails?.TwoFA;
              setUserDetails({ ...userDetails, TwoFA: newTwoFA });

              if (newTwoFA) {
                await activate2FA({ redirectUri });
              } else {
                await deactivate2FA({ redirectUri });
              }
            }}
            className={`toggle-checkbox absolute block w-6 h-6 rounded-full 
			bg-white border-4 appearance-none cursor-pointer 
			${userDetails?.TwoFA ? "right-0" : "right-4"} 
			ring-0 transition-transform duration-200 ease-in`}
          />
          <span
            className={`toggle-label block overflow-hidden h-6 rounded-full 
			bg-gray-300 cursor-pointer transition-colors duration-200 ease-in 
			${userDetails?.TwoFA ? "bg-green-400" : ""}`}
          ></span>
        </div>
      </div>

      <div className="mb-4">
        <label className={`inline-block mr-2 ${ButtonStyle} mx-auto`}>
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setProfilePicture(true);
                changeAvatar({ redirectUri, file });
              }
            }}
          />
          {t("Choose File")}
        </label>
      </div>

      {!userDetails?.ft_user && (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-gray-300">{t("New Password ")}</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-300">
              {t("Confirm New Password ")}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <button className={`mx-auto block mb-2 ${ButtonStyle}`} type="submit">
            Submit
          </button>
        </form>
      )}

      <div className="mb-4">
        <button
          className={`w-38 ${ButtonStyle} mx-auto`}
          onClick={async () => {
            if (
              window.confirm(t("Are you sure you want to delete your account?"))
            ) {
              const accountDeleted = await deleteAccount({ redirectUri });
              if (accountDeleted) {
                navigate("/");
              }
            }
          }}
        >
          {t("Delete Account")}
        </button>
      </div>
    </div>
  );
}

export default UserSettings;
