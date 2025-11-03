import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <-- IMPORT THIS
import './index.css'; // Your Tailwind CSS
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* --- WRAP YOUR APP IN <BrowserRouter> --- */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
