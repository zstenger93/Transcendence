import React from 'react';
import backgroundImage from '../images/welcome.jpg';
import WelcomeMessage from './WelcomeMessage';

function Home() {
    return (
        <div className="flex flex-col h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <WelcomeMessage />
        </div>
    );
}

export default Home;