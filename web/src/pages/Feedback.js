import React from 'react';
import { Link } from 'react-router-dom';

import LineChart from '../components/LineChart';

export default class Feedback extends React.Component {
  render() {
    return (
      <div>
        <Link to="/factors">
          <button id="back-button" className="circular ui icon huge button">
            <i className="arrow alternate left icon"></i>
          </button>
        </Link>
        <div id="content-container">
          <LineChart />
          <div id="sensor-feedback">
            <header>What can you do?</header>
            <ul>
              <li>Try installing blackout blinds</li>
              <li>Change bulbs to have warmer light</li>
              <li>Turn off screens and appliances</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
