import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Nav() {
  return (
    <nav>
      <h1>Navigation</h1>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/disaster-list">
          <li>Disaster List</li>
        </Link>
        <Link to="/disaster-map">
          <li>Disaster Map</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
