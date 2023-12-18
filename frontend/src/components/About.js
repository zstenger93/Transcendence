import React from 'react';
import backgroundImage from '../images/welcome.jpg';

function About() {
	const teamMembers = [
		{ name: 'Zsolt', description: 'Description 1', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
		{ name: 'Jergashe', description: 'Description 2', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
		{ name: 'Azer', description: 'Description 3', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
		{ name: 'Karlis', description: 'Description 4', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
	];

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className="grid grid-cols-2 gap-4">
				{teamMembers.map((member, index) => (
					<div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-900">
						<img className="w-full" src={member.image} alt={member.name} />
						<div className="px-6 py-4">
							<div className="font-bold text-white text-xl mb-2">{member.name}</div>
							<p className="text-white text-base">{member.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default About;