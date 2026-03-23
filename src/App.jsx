import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MyRequestsPage from './Pages/MyRequestsPage';
import ValidationSlipPage from './Pages/ValidationSlipPage';
import Register from './Pages/Register';

import { RequestProvider } from './Context/RequestContext';
import { ToastProvider } from './Context/ToastContext';

import './App.css';

function App() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark(!dark);

  return (
    <BrowserRouter>
      <ToastProvider>
        <RequestProvider>
          <div className={dark ? 'dark' : ''}>
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<MyRequestsPage toggleTheme={toggleTheme} dark={dark} />} />
            </Routes>
          </div>
        </RequestProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
export default App;
