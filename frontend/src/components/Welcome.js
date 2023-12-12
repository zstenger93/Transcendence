import React from 'react';
import '../styles/tailwind.css';

function Welcome() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer">
          Log In
        </button>
      </div>
    </div>
  );
}

export default Welcome;