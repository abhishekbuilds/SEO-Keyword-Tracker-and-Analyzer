import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Wordcloud from 'highcharts/modules/wordcloud';

// Apply Wordcloud module
Wordcloud(Highcharts);

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ResultsPage() {
  const { state } = useLocation();
  const { data } = state; // Assuming data is passed like this

  // Highcharts options for the word cloud
  const wordCloudOptions = {
    series: [
      {
        type: 'wordcloud',
        data: Object.entries(data.wordFrequencies).map(([word, weight]) => ({
          name: word,
          weight,
        })),
        name: 'Frequency',
      },
    ],
    title: {
      text: '',
    },
  };

  // Preparing the data for the chart
  const chartData = {
    labels: Object.keys(data.processingTimes),
    datasets: [
      {
        label: 'Processing Times',
        data: Object.values(data.processingTimes),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className='flex flex-row w-full p-5 bg-gray-100'>
      {/* Word Frequencies Table */}
      <div className='flex-initial w-1/2 h-full pr-4'>
        <h2 className='text-xl font-semibold text-gray-700 mb-2'>
          Word Frequencies
        </h2>
        <div className='bg-white shadow overflow-hidden border-b border-gray-200 rounded-lg max-h-screen overflow-y-scroll'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead>
              <tr>
                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Word
                </th>
                <th className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                  Frequency
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {Object.entries(data.wordFrequencies).map(([word, frequency]) => (
                <tr key={word}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {word}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                    {frequency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Processing Times Chart and Word Cloud */}
      <div className='flex-initial w-1/2 h-full pl-4 space-y-8'>
        <h2 className='text-xl font-semibold text-gray-700 mb-2'>
          Processing Times
        </h2>
        <Line data={chartData} />
        <div>
          <HighchartsReact highcharts={Highcharts} options={wordCloudOptions} />
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
