import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const data = {
  labels: ['', '', '', '', '', '', ''],
  datasets: [
    {
      borderColor: '#ec8b5e',
      hoverBorderColor: 'white',
      pointRadius: 0,
      fill: false,
      borderWidth: 4,
      data: [20, 25, 23, 30, 40, 65, 45, 17, 24]
    },
    {
      borderColor: 'violet',
      hoverBorderColor: 'white',
      pointRadius: 0,
      fill: false,
      borderWidth: 4,
      data: [60, 55, 87, 74, 87, 42, 52, 42, 45]
    }
  ]
};

export default class LineChart extends Component {
  render() {
    return (
      <div>
        <header id="graph-title">FRIDAY: LIGHT QUALITY</header>
        <header id="line-graph-score">22%</header>
        <div id="line-graph-container">
          <Line
            data={data}
            width="100"
            height="70"
            options={{
              maintainAspectRatio: true,
              tooltips: {
                enabled: false
              },
              legend: {
                display: false
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      zeroLineColor: 'white'
                    }
                  }
                ],
                yAxes: [
                  {
                    gridLines: {
                      color: 'transparent'
                    },
                    gridLines: {
                      zeroLineColor: 'white'
                    },
                    ticks: {
                      fontColor: 'white',
                      fontFamily: '"Josefin Sans", sans-serif',
                      fontSize: 25
                    }
                  }
                ]
              },
              plugins: {
                datalabels: {
                  display: false
                }
              }
            }}
          />
        </div>
      </div>
    );
  }
}
