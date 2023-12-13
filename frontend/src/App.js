import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Matchmaking from './components/Matchmaking';

function App() {
	return (
		<Router>
			<Routes>
				{/* Welcome page without the Navigation */}
				<Route path="/" element={<Welcome />} />
				{/* Use a wrapper route for Home and About that includes the Navigation */}
				<Route
					path="/*"
					element={
						<div>
							<Navigation />
							<Routes>
								<Route path="home" element={<Home />} />
								<Route path="about" element={<About />} />
								<Route path="matchmaking" element={<Matchmaking />} />
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


