import React from 'react';
import { Link } from 'react-router-dom';

import BarChart from '../components/BarChart';

export default class Home extends React.Component {
  render() {
    return (
      <div id="content-container">
        <BarChart />
      </div>
    );
  }
}
