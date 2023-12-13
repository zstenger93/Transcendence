import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex">
        <li className="mr-6">
          <Link to="/">Welcome</Link>
        </li>
        <li className="mr-6">
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
