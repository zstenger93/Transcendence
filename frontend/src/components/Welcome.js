import React from 'react';
import '../styles/tailwind.css';

function Welcome() {
  const openGitHub = () => {
    // Replace 'YOUR_GITHUB_URL' with the actual GitHub URL you want to open
    const githubUrl = 'https://github.com';
    window.open(githubUrl, '_blank');
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer"
          onClick={openGitHub}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export default Welcome;
