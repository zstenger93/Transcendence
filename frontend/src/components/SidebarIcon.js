import React from 'react';
import { Link } from 'react-router-dom';

const SidebarIcon = ({ icon, text = "tooltip", to, margin, alwaysShowTooltip, onClick }) => {
    const Component = onClick ? 'button' : Link;
    const componentProps = onClick ? { onClick } : { to };
  
    return (
      <Component
        {...componentProps}
        className={`relative flex items-center justify-center
        h-12 w-12 mt-2 mb-2 mx-auto shadow-lg
        bg-purple-900 bg-opacity-50 text-blue-300 hover:bg-blue-300
        hover:text-purple-900 rounded-3xl hover:rounded-xl transition-all
        duration-300 ease-linear cursor-pointer group ${margin}`}
      >
        {icon}
        <span
          className={`absolute w-auto p-2 m-2 min-w-max left-14 rounded-md
          text-white bg-gray-900 text-xs font-bold transition-all 
          duration-100 ${alwaysShowTooltip ? 'scale-100' : 'scale-0'} 
          origin-left group-hover:scale-100 shadow-md`}
        >
          {text}
        </span>
      </Component>
    );
};
  
export default SidebarIcon;