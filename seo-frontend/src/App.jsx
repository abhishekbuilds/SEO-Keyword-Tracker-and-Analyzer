import React, { useState } from 'react';
import axios from 'axios';

const algorithms = [
  'Naive String',
  'Rabin Karp',
  'KMP',
  'Boyer Moore',
  'Aho-Corasick',
];

const URLValidator = (url) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(url);
};

function App() {
  const [url, setUrl] = useState('');
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleAlgorithmChange = (algorithm) => {
    const newSelection = new Set(selectedAlgorithms);
    if (newSelection.has(algorithm)) {
      newSelection.delete(algorithm);
    } else {
      newSelection.add(algorithm);
    }
    setSelectedAlgorithms(newSelection);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedAlgorithms(new Set(algorithms));
    } else {
      setSelectedAlgorithms(new Set());
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = () => {
    if (!URLValidator(url)) {
      alert('Please enter a valid URL.');
      return;
    }
    if (selectedAlgorithms.size === 0) {
      alert('Please select at least one algorithm.');
      return;
    }

    // Prepare data for Axios request
    const requestData = {
      url,
      algorithms: Array.from(selectedAlgorithms),
    };

    // Axios request (Replace 'your-endpoint-url' with your actual endpoint URL)
    axios
      .post('your-endpoint-url', requestData)
      .then((response) => {
        console.log(response.data);
        // Handle response here
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  return (
    <div className='max-w-md mx-auto my-10 bg-white p-5 rounded-lg shadow'>
      <h1 className='text-2xl font-bold text-center mb-5'>
        SEO Keyword and Analyzer Tool
      </h1>
      <input
        type='text'
        className='input border border-gray-300 p-2 w-full rounded'
        placeholder='Enter URL'
        value={url}
        onChange={handleUrlChange}
      />
      <div className='flex items-center mt-4'>
        <input
          id='selectAll'
          type='checkbox'
          className='mr-2'
          checked={selectAll}
          onChange={handleSelectAll}
        />
        <label htmlFor='selectAll' className='text-gray-700'>
          Select All
        </label>
      </div>
      <div className='mt-2'>
        {algorithms.map((algorithm, index) => (
          <div key={index} className='mt-2 flex items-center'>
            <input
              id={`algorithm-${index}`}
              type='checkbox'
              className='mr-2'
              checked={selectedAlgorithms.has(algorithm)}
              onChange={() => handleAlgorithmChange(algorithm)}
            />
            <label htmlFor={`algorithm-${index}`} className='text-gray-700'>
              {algorithm}
            </label>
          </div>
        ))}
      </div>
      <button
        className='mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded'
        onClick={handleSubmit}>
        Analyze
      </button>
    </div>
  );
}

export default App;
