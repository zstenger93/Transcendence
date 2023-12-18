import React from 'react';
import Home from './components/Home';
import Chat from './components/Chat';
import Games from './components/Games';
import About from './components/About';
import Sidebar from './components/Sidebar';
import Welcome from './components/Welcome';
import Profile from './components/Profile';
import Matchmaking from './components/Matchmaking';
import backgroundImage from './images/welcome.jpg';
import OriginalPong from './components/OriginalPong';
import ChoosePongMode from './components/ChoosePongMode';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Welcome />} />
				<Route
					path="/*"
					element={
						<div className="bg-cover bg-center h-screen w-full" style={{
							backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover',
							backgroundPosition: 'center',
							backgroundRepeat: 'no-repeat'
						}}>
							<Sidebar />
							<Routes>
								<Route path="/" element={<Navigate to="/home" />} />
								<Route path="home" element={<Home />} />
								<Route path="chat" element={<Chat />} />
								<Route path="matchmaking" element={<Matchmaking />} />
								<Route path="games" element={<Games />} />
								<Route path="profile" element={<Profile />} />
								<Route path="about" element={<About />} />
								<Route path="originalpong" element={<OriginalPong />} />
								<Route path="choosepongmode" element={<ChoosePongMode />} />
							</Routes>
						</div>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;


