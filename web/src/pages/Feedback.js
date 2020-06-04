import React from 'react';
import { Link } from 'react-router-dom';

import LineChart from '../components/LineChart';
import { SleepData } from '../api';

export default class Feedback extends React.Component {
  render() {
    let uuid = "todo";
    let sleep_data = new SleepData(uuid);
    let sleep_cycle_index = 0; // days ago
    let factors = ["luminosity", "temperature"];
    console.log(sleep_data.get_sleep_cycle(sleep_cycle_index).get_chart_data_for_factors(factors));
    return (
      <div>
        <Link to="/factors">
          <button id="back-button" className="circular ui icon huge button">
            <i className="arrow alternate left icon"></i>
          </button>
        </Link>
        <div id="content-container">
          <LineChart chart_data={ {} } />//sleep_data.get_sleep_cycle().get_chart_data_for_factors(factors)}/>
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
