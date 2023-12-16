import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/welcome.jpg';

function Welcome() {
	const navigate = useNavigate();

	const redirectToHome = () => {
		navigate('/home');
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
			{/* <div className="text-center mb-8">
        <h1 className="text-6xl text-white font-bold mb-4">
          Welcome to<br />Transcendence
        </h1>
        <h1 className="text-6xl text-white font-bold mb-8">
          Where the<br />Core journey<br /> Ends
        </h1>
      </div> */}
			<div className=' flex items-center justify-center h-screen'>
				<button
					className="bg-red-700 bg-opacity-50 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-700"
					onClick={redirectToHome}
				>
					Sign In
				</button>
			</div>
		</div>
	);
}

export default Welcome;
