import React from 'react';
import backgroundImage from '../images/bg0.png';

function About() {
	const teamMembers = [
		{ name: 'Zsolt', title: 'Mr. Git', description: 'Description 1', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
		{ name: 'Jergashe', title: '"Can I drop the table?"', description: 'Description 2', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
		{ name: 'Azer', title: 'DevOoOoops', description: 'Description 3', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
		{ name: 'Karlis', title: '"I can fix it"', description: 'Description 4', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
		{ name: 'Laszlo', title: 'Mr. Git', description: 'Description 5', image: 'https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp' },
	];

	const firstRowMembers = teamMembers.slice(0, 2);
	const secondRowMembers = teamMembers.slice(2);

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className="grid grid-cols-2 gap-4">
				{firstRowMembers.map((member, index) => (
					<div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-900">
						<img className="w-full" src={member.image} alt={member.name} />
						<div className="px-6 py-4">
							<div className="font-bold text-white font-nosifer text-center text-xl mb-2">{member.name}</div>
							<div className="text-white font-roboto text-center text-sm mb-2">{member.title}</div>
							<p className="text-white text-center text-base">{member.description}</p>
						</div>
					</div>
				))}
			</div>
			<div className="grid grid-cols-3 gap-4">
				{secondRowMembers.map((member, index) => (
					<div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4 bg-gray-900">
						<img className="w-full" src={member.image} alt={member.name} />
						<div className="px-6 py-4">
							<div className="font-bold text-white font-nosifer text-center text-xl mb-2">{member.name}</div>
							<div className="text-white font-roboto text-center text-sm mb-2">{member.title}</div>
							<p className="text-white text-center text-base">{member.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default About;