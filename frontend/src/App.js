// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Welcome from './components/Welcome';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Welcome />} />
        <Route path="/about" element={<About />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
