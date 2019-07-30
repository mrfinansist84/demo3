import React from 'react';
import './Chart.css';
import Chart from 'react-apexcharts'

function PieChart(props) {

  return (
    <Chart
    options={props.options}
    series={props.series}
    type="radialBar"
    width="500"
  />

  )
}

export default PieChart;