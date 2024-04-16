import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const ItemResult = ({ data }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data && data.result) {
      const ctx = document.getElementById('myChart');
      const labels = [];
      const percentages = [];

      // Calculate percentage for each candidate
      const totalVotes = data.result.reduce((acc, curr) => acc + parseInt(curr.voted), 0);
      data.result.forEach(candidate => {
        const percentage = (parseInt(candidate.voted) / totalVotes) * 100;
        // Get candidate name
        labels.push(`Candidate ${candidate.id}`);
        percentages.push(percentage.toFixed(2));
      });

      // Create the chart
      if (ctx) {
        const newChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              data: percentages,
              backgroundColor: [
                'red', 'blue', 'green', 'orange', 'purple' // Add more colors if needed
              ]
            }]
          },
          options: {
            responsive: true
          }
        });
        setChart(newChart);
      }
    }
  }, [data]);

  return (
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
      <div id ="status">Status</div>
    </div>
  );
};

export default ItemResult;
