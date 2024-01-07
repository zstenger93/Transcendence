import { HiMiniLanguage } from "react-icons/hi2";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";


function LanguageButton() {
	const { t, i18n } = useTranslation();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  
	const changeLanguage = (lang) => {
	  i18n.changeLanguage(lang);
	  setCurrentLanguage(lang);
	  setDropdownOpen(false);
	};
  
	const languages = [
	  { value: "en", label: "EN" },
	  { value: "fr", label: "FR" },
	  { value: "hu", label: "HU" },
	  { value: "de", label: "DE" },
	  { value: "jp", label: "JP" },
	];
  
	return (
	  <div className="absolute top-0 left-2 mt-10">
		<button
		  className="relative flex items-center justify-center h-12 
		  w-12 mt-2 mb-2 mx-auto shadow-lg bg-purple-900 bg-opacity-50 
		  text-blue-300 hover:bg-blue-300 hover:text-purple-900 
		  rounded-3xl hover:rounded-xl transition-all duration-300 
		  ease-linear cursor-pointer group border-r-2 border-b-2
		  border-purple-600"
		  onClick={() => setDropdownOpen(!dropdownOpen)}
		>
		  <HiMiniLanguage size="32" />
		  <span
			className="absolute w-auto p-2 m-2 min-w-max left-14 
			rounded-md shadow-md text-white bg-gray-900 text-xs 
			font-bold transition-all duration-100 scale-0 origin-left 
			group-hover:scale-100"
		  >
			{t("Language")}
		  </span>
		</button>
		{dropdownOpen && (
		  <div
			className="absolute left-0 w-22 py-2 mt-2 bg-gray-900 
			bg-opacity-80 rounded-xl shadow-xl text-center"
		  >
			{languages.map((lang) => (
			  <button
				key={lang.value}
				className={`w-full py-2 ${
				  lang.value === currentLanguage
					? "text-blue-500 font-bold"
					: "text-gray-300"
				} hover:bg-indigo-500 hover:text-white`}
				onClick={() => changeLanguage(lang.value)}
			  >
				{lang.label}
			  </button>
			))}
		  </div>
		)}
	  </div>
	);
  }

  export default LanguageButton;