import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
	return (
		<nav className="bg-gray-800 p-4 mx-auto">
			<ul className="flex justify-center">
				{/* <li className="mr-6">
					<Link to="/" className="text-white font-bold">Welcome</Link>
				</li> */}
				<li className="mr-6">
					<Link to="/home" className="text-white font-bold">Home</Link>
				</li>
				<li className="mr-6">
					<Link to="/matchmaking" className="text-white font-bold">Matchmaking</Link>
				</li>
				<li className="mr-6">
					<Link to="/profile" className="text-white font-bold">Profile</Link>
				</li>
				<li>
					<Link to="/about" className="text-white font-bold">About</Link>
				</li>
			</ul>
		</nav>
	);
}

export default Navigation;
