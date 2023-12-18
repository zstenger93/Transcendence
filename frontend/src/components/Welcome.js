import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bg0.png';

function Welcome() {
	const navigate = useNavigate();

	const redirectToHome = () => {
		navigate('/home');
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className=' flex items-center justify-center h-screen'>
				<button
					className="bg-red-900 text-white font-bold px-4 py-2 rounded cursor-pointer hover:bg-red-900 hover:bg-opacity-70"
					onClick={redirectToHome}
				>
					Sign In
				</button>
			</div>
		</div>
	);
}

export default Welcome;
