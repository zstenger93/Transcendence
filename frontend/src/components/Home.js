import React from 'react';
import backgroundImage from '../images/welcome.jpg';
import Navigation from './Navigation';

function Home() {
    return (
        <div className="flex flex-col h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <Navigation />
        </div>
    );
}

export default Home;