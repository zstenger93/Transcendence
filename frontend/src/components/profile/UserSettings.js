// 2FA on/off
// change avatar
// change password
// change username
// delete the account

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonStyle } from "../buttons/ButtonStyle";

function UserSettings() {
  const { t } = useTranslation();
  const [is2FAEnabled, set2FA] = useState(false);

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
            checked={is2FAEnabled}
            onChange={() => set2FA(!is2FAEnabled)}
            className={`toggle-checkbox absolute block w-6 h-6 rounded-full 
			bg-white border-4 appearance-none cursor-pointer 
			${is2FAEnabled ? "right-0" : "right-4"} 
			ring-0 transition-transform duration-200 ease-in`}
          />
          <span
            className={`toggle-label block overflow-hidden h-6 rounded-full 
			bg-gray-300 cursor-pointer transition-colors duration-200 ease-in 
			${is2FAEnabled ? "bg-green-400" : ""}`}
          ></span>
        </div>
      </div>
      <div className="mb-4">
        <label className="text-gray-300">{t("Change Avatar")}</label>
        <input type="file" accept="image/*" className="mx-auto" />
      </div>

      <div className="mb-4">
        <label className="text-gray-300">{t("New Password ")}</label>
        <input type="password" />
      </div>
	  <div className="mb-4">
		<label className="text-gray-300">{t("Confirm New Password ")}</label>
        <input type="password" />
	  </div>
      <div className="mb-4">
        <label className="text-gray-300">{t("Change Username ")}</label>
        <input type="text" />
      </div>
      <div className="mb-4">
        <button
          className={`w-38 ${ButtonStyle} mx-auto`}
          onClick={() => {
            if (
              window.confirm(t("Are you sure you want to delete your account?"))
            ) {
              /* delete the account */
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
