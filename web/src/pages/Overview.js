import React from 'react';

import { getData } from '../data';

import BarChart from '../components/BarChart';

export default class Overview extends React.Component {
  render() {
    getData();

    return (
      <div id="content-container">
        <BarChart />
      </div>
    );
  }
}
