/* disable eslint */

import React from "react";
import WelcomeMessage from "../components/home/WelcomeMessage";
import Readme from "../components/home/Readme";
import Sidebar from "../components/hamburger_menu/Hamburger";

function Home() {
	return (
		<>
			<div className="relative h-screen flex items-center justify-center">
				<WelcomeMessage />
				<div className="absolute top-full w-full bg-black bg-opacity-50">
					<Sidebar />
					<Readme />
				</div>
			</div>
		</>
	);
}

export default Home;

// Implementation of the orignal<br />
//               Pong game, released by Atari in 1972,<br />
//               is one of the earliest arcade video games.<br />
//               It's a 2D simulation of table tennis where<br />
//               each playercontrols a paddle on the screen.<br />
//               The game, created by Allan Alcorn,<br />
//               established the video game industry<br />
//               due to its commercial success.