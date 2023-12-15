import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Matchmaking from './components/Matchmaking';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import backgroundImage from './images/welcome.jpg';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route
					path="/*"
					element={
						<div className="bg-cover bg-center h-screen w-full" style={{ backgroundImage: `url(${backgroundImage})` }}>
							<Sidebar />
							<Routes>
								<Route path="home" element={<Home />} />
								<Route path="chat" element={<Chat />} />
								<Route path="matchmaking" element={<Matchmaking />} />
								<Route path="about" element={<About />} />
								<Route path="profile" element={<Profile />} />
								<Route path="/" element={<Navigate to="/home" />} />
							</Routes>
						</div>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;


