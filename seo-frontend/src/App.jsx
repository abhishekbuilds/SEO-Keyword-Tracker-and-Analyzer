import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage'; // Assuming this file is in the same directory

function App() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/results' element={<ResultsPage />} />
    </Routes>
  );
}

export default App;
