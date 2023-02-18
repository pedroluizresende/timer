import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TimerProvider from './context/TimerProvider';

import './styles/main.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TimerProvider> 
    <App />
 </TimerProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
