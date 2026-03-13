import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MyRequestsPage from './Pages/MyRequestsPage';
import ValidationSlipPage from './Pages/ValidationSlipPage';
import Register from './Pages/Register';

import { RequestProvider } from './Context/RequestContext';
import { ToastProvider } from './Context/ToastContext';

import './App.css';

function App() {
  return (
    <>
      <Register />
    </>
  );
}

export default App;
