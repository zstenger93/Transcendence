/* disable eslint */

import React from "react";
import WelcomeMessage from "../components/home/WelcomeMessage";
import Readme from "../components/home/Readme";
import Sidebar from "../components/hamburger_menu/Hamburger";


function ScrollDownIndicator() {
	return (
		<div className="absolute bottom-0 flex justify-center items-center h-24 w-full">
			<span className="animate-bounce text-8xl text-gray-900 text-opacity-40">
				&#8595;
			</span>
		</div>
	);
}

function Home() {
	return (
		<>
			<div className="relative h-screen flex items-center justify-center">
				<WelcomeMessage />
				<ScrollDownIndicator />
				<div className="absolute top-full w-full bg-black home-bg-black-gradient">
					<Sidebar />
					<Readme />
				</div>
			</div>
		</>
	);
}

export default Home;