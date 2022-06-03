import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  /* var dataArr = Object.entries(chartData)
                            //numero de labels
  var sortedArray = dataArr.slice(0,8).sort(function(a, b) {
    return b[1] - a[1];
  }); */

  
  return (
    <div>
      <Line data={chartData}></Line>
    </div>
  );
}

export default BarChart;