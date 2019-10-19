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
      data: [100, 50, 0, 67, 12, 89, 65, 0, 100]
    },
    {
      borderColor: 'violet',
      hoverBorderColor: 'white',
      pointRadius: 0,
      fill: false,
      borderWidth: 4,
      data: [30, 96, 87, 12, 50, 90, 50, 0, 100]
    }
  ]
};

export default class LineChart extends Component {
  render() {
    return (
      <div>
        <header id="graph-title">SOME DAY: SOME FACTOR</header>
        <header id="line-graph-score">92%</header>
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
                      type: 'time',
                      time: {
                          unit: 'minute'
                      },
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
