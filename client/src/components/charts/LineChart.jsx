import React, { useState } from 'react';
import { buildLineXAxis, makeBodyFatLine, lineChartOptions, compileLineData, buildLineYAxis } from '../../data/chartData';
import { Line } from 'react-chartjs-2';
import ChartHeader from './ChartsHeader';


const LineChart = ({ datapoints }) => {
  const [hiddenData, setHiddenData] = useState([]);

  const handleClick = (e, legendItem) => {
    const datasetIndex = legendItem.datasetIndex;
    const currentIndex = hiddenData.indexOf(datasetIndex);

    if (currentIndex === -1) {
      setHiddenData([...hiddenData, datasetIndex]);
    } else {
      setHiddenData([...hiddenData.slice(0, currentIndex), ...hiddenData.slice(currentIndex + 1)]);
    }
  };

  const xAxis = buildLineXAxis(datapoints);
  const bodyFat = makeBodyFatLine(datapoints);
  const weight = buildLineYAxis(datapoints);
  const data =  {
      labels: xAxis,
      datasets: [{
        label: 'Body Fat',
        yAxisID: 'left',
        spanGaps: true,
        data: bodyFat,
        backgroundColor: 'rgb(45, 149, 147, 0.5)',
        borderColor: 'rgb(45, 149, 147, 0.5)',
        pointBorderColor:'rgb(45, 149, 147, 1)',
        borderWidth: 4,
        tension: 0.4
      },
      {
        label: 'Weight',
        yAxisID: 'right',
        spanGaps: true,
        data: weight,
        backgroundColor: 'rgba(37, 36, 93, 0.5)',
        borderColor: 'rgba(37, 36, 93, 0.5)',
        pointBorderColor: 'rgba(37, 36, 93, 1)',
        borderWidth: 4,
        tension: 0.2
      }
      ]
    };
  
  const options = {
    onClick: handleClick,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        legend: {
          onClick: (legendItem) => {
            const chartInstance = legendItem.chart;
            const meta = chartInstance.getDatasetMeta(legendItem.datasetIndex);
      
            // toggle the hidden property of the corresponding dataset
            meta.hidden = meta.hidden === null ? !chartInstance.data.datasets[legendItem.datasetIndex].hidden : null;
      
            // update the chart to reflect the changes
            chartInstance.update();
          },
        },
      }
    },
    scales: {
      left: {
        id: 'left',
        type: 'linear',
        position: 'left',
        beginAtZero: false,
        scaleLabel: {
          display: true,
          labelString: 'My X-Axis Label'
        }
      },
      right: {
        id: 'right',
        type: 'linear',
        position: 'right',
        beginAtZero: false,
        grid: {
          drawOnChartArea: false
        },
        ticks: {
          callback: function(value) {
            return `${value} %`;
          }
        }
      }
    }
  }

  return (
    <div>
      <ChartHeader title="Weight Change" />
      <Line data={data} options={options}></Line>
    </div>


  )
}

export default LineChart;