/* disable eslint */

import React from "react";
import WelcomeMessage from "../components/home/WelcomeMessage";
import Readme from "../components/home/Readme";

function Home() {
	return (
		<div className="relative h-screen flex items-center justify-center">
			<WelcomeMessage />
			<div className="absolute top-full w-full bg-black bg-opacity-50">
				<Readme />
			</div>
		</div>
	);
}

export default Home;
