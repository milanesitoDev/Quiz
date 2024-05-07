import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';
import{ HomeApp } from './HomeApp.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HomeApp/>
  </React.StrictMode>
);

