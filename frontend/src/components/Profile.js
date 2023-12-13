import React, { useState } from 'react';

// Dummy data for friends and match history (replace with actual data)
const friendsListData = ['Zsolt', 'Karlis', 'Jergashe', 'Azer', 'Emotional Damage'];
const matchHistoryData = [
	{ opponent: 'Emotional Damage', result: 'Win' },
	{ opponent: 'Chuck Norris', result: 'Loss' },
	{ opponent: 'Segfault', result: 'Win' },
	{ opponent: 'Jesus', result: 'Loss' },
	{ opponent: 'I did parsing', result: 'Win' },
	{ opponent: 'Karlis', result: 'Loss' },
	{ opponent: 'Azer', result: 'Win' },
	{ opponent: 'Jamshidbek', result: 'Win' },
	{ opponent: 'Zsolt', result: 'Win' },
];

function FriendsList() {
	return (
		<div className="bg-gray-200 p-4 rounded-md max-h-200 overflow-y-auto">
			<h3 className="text-xl font-semibold mb-4">Friends List</h3>
			<ul>
				{friendsListData.map((friend, index) => (
					<li key={index}>{friend}</li>
				))}
			</ul>
		</div>
	);
}

function MatchHistory() {
	return (
		<div className="bg-gray-200 p-4 rounded-md max-h-200 overflow-y-auto">
			<h3 className="text-xl font-semibold mb-4">Match History</h3>
			<table className="w-full border-collapse border border-gray-500">
				<thead>
					<tr className="bg-gray-300">
						<th className="p-2 border">Opponent</th>
						<th className="p-2 border">Result</th>
					</tr>
				</thead>
				<tbody>
					{matchHistoryData.map((match, index) => (
						<tr key={index}>
							<td className="p-2 border">{match.opponent}</td>
							<td className={`p-2 border ${match.result === 'Win' ? 'text-green-500' : 'text-red-500'}`}>
								{match.result}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

function Profile() {
	const userDetails = {
		username: 'TrasnscEND',
		email: 'fake@mail.com',
		about: 'I turn people crazy with my clear subject description.',
		age: 25,
		gender: 'Male',
		school: '42 Heilbronn',
		level: '9.42',
	};

	const [showFriendsList, setShowFriendsList] = useState(false);
	const [showMatchHistory, setShowMatchHistory] = useState(false);

	const toggleFriendsList = () => {
		setShowFriendsList(!showFriendsList);
		setShowMatchHistory(false); // Close match history if open
	};

	const toggleMatchHistory = () => {
		setShowMatchHistory(!showMatchHistory);
		setShowFriendsList(false); // Close friends list if open
	};

	return (
		<div className="bg-gray-100 p-8 flex flex-col max-h-200 overflow-y-auto">
			<div className="flex-grow grid grid-cols-2 gap-8">
				{/* Profile section */}
				<div className="max-w-md bg-white rounded-md p-6 shadow-md">
					<div className="text-center">
						<img
							src="https://raw.githubusercontent.com/zstenger93/Transcendence/master/images/transcendence.webp"
							alt="User Avatar"
							className="w-20 h-20 rounded-full mx-auto mb-4"
						/>
						<h2 className="text-2xl font-semibold">{userDetails.username}</h2>
						<p className="text-gray-600">{userDetails.email}</p>
					</div>

					<div className="mt-8">
						<h3 className="text-xl font-semibold mb-4">About Me</h3>
						<p className="text-gray-700">{userDetails.about}</p>
					</div>

					<div className="mt-8">
						<h3 className="text-xl font-semibold mb-4">User Details</h3>
						<p className="text-gray-700">
							<strong>Age:</strong> {userDetails.age} years old<br />
							<strong>Gender:</strong> {userDetails.gender}<br />
							<strong>School:</strong> {userDetails.school}<br />
							<strong>Level:</strong> {userDetails.level}
						</p>
					</div>

					{/* Buttons for Edit Profile, Friend List, and Match History */}
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

				{/* Friend List or Match History section (conditionally rendered) */}
				<div className="max-w-md">
					{showFriendsList && <FriendsList />}
					{showMatchHistory && <MatchHistory />}
				</div>
			</div>
		</div>
	);
}

export default Profile;
