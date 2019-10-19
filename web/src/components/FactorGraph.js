import React from 'react';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import 'chartjs-plugin-datalabels';

const data = {
  labels: [1, 2, 3, 4, 5, 6, 7],
  datasets: [
    {
      backgroundColor: '#ec8b5e',
      borderColor: '#ec8b5e',
      borderWidth: 0.1,
      hoverBackgroundColor: 'rgba(236,139,94,0.7)',
      hoverBorderColor: '#ec8b5e',
      data: [43, 60.5, 12.76, 85, 100, 30, 67, 0, 101]
    }
  ]
};

export default class FactorGraph extends React.Component {
    render() {
        return <Line
          onElementsClick={elems => {
            console.log(elems[0]._datasetIndex + ', ' + elems[0]._index);
            window.location = './factors';
          }}
          data={data}
          width={100}
          height={65}
          options={{
            maintainAspectRatio: true,
            events: ['mousemove'], // this is needed, otherwise onHover is not fired
            onHover: (event, chartElement) => {
              event.target.style.cursor = chartElement[0]
                ? 'pointer'
                : 'default';
            },
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
    }
}
