import React from 'react';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function ResultsPage() {
  const { state } = useLocation();
  const { data } = state; // Assuming the data is passed in this way

  // Preparing the data for the chart
  const chartData = {
    labels: Object.keys(data.processingTimes),
    datasets: [{
      label: 'Processing Times',
      data: Object.values(data.processingTimes),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h2>Word Frequencies</h2>
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(data.wordFrequencies).map(([word, frequency]) => (
              <tr key={word}>
                <td>{word}</td>
                <td>{frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Processing Times</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}
export default ResultsPage;