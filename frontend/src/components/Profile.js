import React from 'react';

function Profile() {
  const userDetails = {
    username: 'Username',
    email: 'user@example.com',
    about: 'I turn coffee into code.',
    age: 25,
    gender: 'Male',
    school: '42 Heilbronn',
    level: '9.42',
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-md p-6 shadow-md">
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
      </div>
    </div>
  );
}

export default Profile;
