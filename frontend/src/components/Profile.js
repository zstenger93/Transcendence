import React, { useState } from 'react';
import backgroundImage from '../images/welcome.jpg';


const friendsListData = [
	{ name: 'Zsolt', intra: 'zstenger', profileLink: 'https://profile.intra.42.fr/users/zstenger' },
	{ name: 'Karlis', intra: 'kvebers', profileLink: 'https://profile.intra.42.fr/users/kvebers' },
	{ name: 'Jergashe', intra: 'jergahse', profileLink: 'https://profile.intra.42.fr/users/jergashe' },
	{ name: 'Azer', intra: 'asioud', profileLink: 'https://profile.intra.42.fr/users/asioud' },
	{ name: 'Emotional Damage', intra: 'ed', profileLink: 'https://github.com/zstenger93/Transcendence' },
];

const matchHistoryData = [
	{ opponent: 'Emotional Damage', result: 'Win', score: '5 - 2', game: 'Pong', type: 'Original' },
	{ opponent: 'Chuck Norris', result: 'Loss', score: '1 - 4', game: 'Pong', type: 'Modded' },
	{ opponent: 'Segfault', result: 'Win', score: '3 - 0', game: 'Pong', type: 'Original' },
	{ opponent: 'I did parsing', result: 'Win', score: '6 - 3', game: 'Pong', type: 'Original' },
	{ opponent: 'Jesus', result: 'Loss', score: '0 - 3', game: 'Pong', type: 'Modded' },
	{ opponent: 'Karlis', result: 'Loss', score: '1 - 4', game: 'Pong', type: 'Modded' },
	{ opponent: 'Azer', result: 'Win', score: '5 - 2', game: 'Pong', type: 'Original' },
	{ opponent: 'Jamshidbek', result: 'Win', score: '3 - 0', game: 'Pong', type: 'Modded' },
	{ opponent: 'Zsolt', result: 'Win', score: '4 - 1', game: 'Pong', type: 'Original' },
];

const userDetails = {
	title: 'Mastermind',
	username: 'TrasnscEND',
	email: 'fake@mail.com',
	about: 'I turn people crazy with my clear subject description.',
	age: 42,
	gender: 'Computer',
	school: '42 Heilbronn',
	level: '42.42',
	winRate: '42%',
};

function FriendsList() {
	return (
		<div className="bg-blue-500 bg-opacity-40 p-4 rounded-md max-h-200 overflow-y-auto">
			<h3 className="text-xl font-bold mb-4 text-center">Friend List</h3>
			<table className="w-full border-collapse border border-gray-500 mx-auto">
				<thead>
					<tr className="bg-gray-300">
						<th className="p-2 border">Name</th>
						<th className="p-2 border text-center">Intra</th>
					</tr>
				</thead>
				<tbody>
					{friendsListData.map((friend, index) => (
						<tr key={index} className='bg-grey-300'>
							<td className="p-2 border">{friend.name}</td>
							<td className="p-2 border text-center">
								<a href={friend.profileLink} className='text-blue-700 underline' target="_blank" rel="noopener noreferrer">
									{friend.intra}
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function MatchHistory() {
	return (
		<div className="bg-blue-500 bg-opacity-40 p-6 shadow-md rounded-md max-h-200 overflow-y-auto">
			<h3 className="text-xl font-bold mb-4 text-center">Match History</h3>
			<table className="w-full border-collapse border border-gray-500 mx-auto">
				<thead>
					<tr className="bg-gray-300">
						<th className="p-2 border">Opponent</th>
						<th className="p-2 border text-center">Result</th>
						<th className="p-2 border text-center">Score</th>
						<th className="p-2 border text-center">Game</th>
						<th className="p-2 border text-center">Type</th>
					</tr>
				</thead>
				<tbody>
					{matchHistoryData.map((match, index) => (
						<tr key={index} className='bg-gray-300'>
							<td className="p-2 border">{match.opponent}</td>
							<td className={`p-2 border text-center ${match.result === 'Win' ? 'text-green-700' : 'text-red-700'}`}>
								{match.result}
							</td>
							<td className="p-2 border text-center">{match.score}</td>
							<td className="p-2 border text-center">{match.game}</td>
							<td className={`p-2 border text-center ${match.type === 'Original' ? 'text-blue-700' : 'text-yellow-700'}`}>{match.type}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function Profile() {
	const [showFriendsList, setShowFriendsList] = useState(false);
	const [showMatchHistory, setShowMatchHistory] = useState(false);

	const toggleFriendsList = () => {
		setShowFriendsList(!showFriendsList);
		setShowMatchHistory(false);
	};

	const toggleMatchHistory = () => {
		setShowMatchHistory(!showMatchHistory);
		setShowFriendsList(false);
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
			<div className="max-w-md flex flex-col items-center">
				<div className="bg-red-500 bg-opacity-40 rounded-md p-6 shadow-md text-center">
					<img
						src="https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp"
						alt="User Avatar"
						className="w-20 h-20 rounded-full mx-auto mb-4"
					/>
					<h2 className="text-black text-2xl font-bold">{userDetails.title} {userDetails.username}</h2>
					<p className="text-black-600">{userDetails.email}</p>

					<div className="mt-8">
						<h3 className="text-xl font-semibold mb-4">About Me</h3>
						<p className="text-black-700">{userDetails.about}</p>
					</div>

					<div className="mt-8">
						<h3 className="text-xl font-semibold mb-4">User Details</h3>
						<p className="text-black-700">
							<strong>Age:</strong> {userDetails.age} years old<br />
							<strong>Gender:</strong> {userDetails.gender}<br />
							<strong>School:</strong> {userDetails.school}<br />
							<strong>Level:</strong> {userDetails.level}<br />
							<strong>Win Rate:</strong> {userDetails.winRate}
						</p>
					</div>

					<div className="mt-8 flex justify-center space-x-4">
						<button
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={toggleFriendsList}
						>
							Friend List
						</button>
						<button
							className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
							onClick={toggleMatchHistory}
						>
							Match History
						</button>
					</div>
				</div>

				<div className="mt-8">
					{showFriendsList && <FriendsList />}
					{showMatchHistory && <MatchHistory />}
				</div>
			</div>
		</div>
	);
}

export default Profile;
