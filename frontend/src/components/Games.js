import React from 'react';
import backgroundImage from '../images/bg0.png';
import { Link } from 'react-router-dom';

function Games() {
	const tiles = [
		{ name: 'PONG', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&showinfo=0&rel=0&autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ' },
		{ name: 'BRAINFUCK', video: 'https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&showinfo=0&rel=0&autoplay=1&mute=1&loop=1&playlist=dQw4w9WgXcQ' },
	];

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className="flex justify-center space-x-4 flex-wrap">
				{tiles.map((tile, index) => (
					<Link key={index} to="/choosepongmode" className="relative bg-white p-4 rounded shadow border-black border-2 text-black overflow-hidden m-2" style={{ width: '30vw', height: '16.875vw' }}>
						<div style={{ position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', paddingBottom: '56.25%', height: '0', overflow: 'hidden' }}>
							<iframe title={tile.name} src={tile.video} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}></iframe>
						</div>
						<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-4xl font-bold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
							{tile.name}
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Games;