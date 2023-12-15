import React from 'react';
import { BsPlus, BsFillLightingFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaInfoCircle, FaHome, FaUser } from 'react-icons/fa';
import { SiGooglechat, SiGameandwatch } from "react-icons/si";


const Sidebar = () => {
	return (
		<div className='fixed top-0 lef-0 h-screen w-16 m-0
						flex flex-col bg-gray-800 text-white shadow-lg'>
			<SidebarIcon icon={<FaHome size="32" />} />
			<SidebarIcon icon={<SiGooglechat size="32" />} />
			<SidebarIcon icon={<SiGameandwatch size="32" />} />
			<SidebarIcon icon={<FaUser size="32" />} />
			<SidebarIcon icon={<FaInfoCircle size="32" />} />
		</div>
	);
}

const SidebarIcon = ({ icon, text = 'tooltip' }) => {
	return (
		<div className='sidebar-icon'>
			{icon}
			<span className='sidebar-tooltip group-hover:scale-100'>{text}</span>
		</div>
	);
}

export default Sidebar;