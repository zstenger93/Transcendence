import React from 'react';
import backgroundImage from '../images/welcome.jpg';

function Chat() {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
		</div>
	);
}

export default Chat;