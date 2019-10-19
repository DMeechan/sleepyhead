import React from 'react';

import BarChart from '../components/BarChart';
import { SleepData } from '../api';

export default class Overview extends React.Component {
  render() {
    let uuid = "todo";
    let sleep_data = new SleepData(uuid);
    console.log(sleep_data.get_last_n_cycles_chart_data(7));
    return (
      <div id="content-container">
        <BarChart chartData={sleep_data.get_last_n_cycles_chart_data(7)}/>
      </div>
    );
  }
}
