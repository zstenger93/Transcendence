import React, { useState } from "react";
import i18n from "i18next";

const DropDown = ({ icon, text, options, onSelect }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const handleSelect = (value) => {
    onSelect(value);
    setCurrentLanguage(value);
    setDropdownOpen(false);
    i18n.changeLanguage(value);
  };

  return (
    <div className="relative" onClick={(event) => event.stopPropagation()}>
      <button
        className={`relative flex items-center justify-center
		h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
		bg-purple-900 bg-opacity-50 text-blue-300 hover:bg-blue-300
		hover:text-purple-900 rounded-3xl hover:rounded-xl transition-all
		duration-300 ease-linear cursor-pointer group border-r-2 border-b-2
		border-purple-600`}
        onClick={(event) => {
          event.stopPropagation();
          setDropdownOpen(!dropdownOpen);
        }}
      >
        {icon}
        <span
          className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md
			text-white bg-gray-900 text-xs font-bold transition-all duration-100
			scale-0 origin-left group-hover:scale-100"
        >
          {text}
        </span>
      </button>
      {dropdownOpen && (
        <div
          className="absolute left-0 w-22 py-2 mt-2 bg-gray-900 bg-opacity-80
			rounded-xl shadow-xl text-center"
          onClick={(event) => event.stopPropagation()}
        >
          {options.map((option) => (
            <button
              key={option.value}
              className={`w-full py-2 ${
                option.value === currentLanguage
                  ? "text-blue-500 font-bold"
                  : "text-gray-300"
              } hover:bg-indigo-500 hover:text-white`}
              onClick={(event) => handleSelect(option.value, event)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
