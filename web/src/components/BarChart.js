import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const weekday = new Array(7);
weekday[0] = 'Sunday';
weekday[1] = 'Monday';
weekday[2] = 'Tuesday';
weekday[3] = 'Wednesday';
weekday[4] = 'Thursday';
weekday[5] = 'Friday';
weekday[6] = 'Saturday';

const getWeekday = (today, i) => {
  return today - i >= 0 ? today - i : 7 + (today - i);
};

const weekDays = () => {
  const labels = new Array(7);
  for (let i = 0; i <= 6; i += 1) {
    labels[i] = weekday[getWeekday(new Date().getDay(), i)];
  }
  return labels.reverse();
};

const data = {
  labels: weekDays(),
  datasets: [
    {
      backgroundColor: '#ec8b5e',
      borderColor: '#ec8b5e',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(236,139,94,0.8)',
      hoverBorderColor: '#ec8b5e',
      data: [43, 60.5, 12.76, 20, 45, 30, 67, 0, 100]
    }
  ]
};

export default class BarChart extends Component {
  render() {
    return (
      <div>
        <header id="bar-graph-title">THIS WEEK</header>
        <Bar
          data={data}
          width={100}
          height={65}
          options={{
            maintainAspectRatio: true,
            tooltips: {
              enabled: false
            },
            legend: {
              display: false
            },
            plugins: {
              datalabels: {
                display: true,
                color: 'white',
                align: 'end',
                anchor: 'end',
                font: {
                  size: 40,
                  family: '"Josefin Sans", sans-serif'
                }
              }
            },
            labels: {
              color: 'white'
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    color: 'transparent'
                  },
                  ticks: {
                    fontColor: 'white',
                    fontFamily: '"Josefin Sans", sans-serif',
                    fontSize: 25
                  }
                }
              ],
              yAxes: [
                {
                  gridLines: {
                    color: 'transparent'
                  },
                  ticks: {
                    fontColor: 'transparent'
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}