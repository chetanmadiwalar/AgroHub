import React from 'react';
import ReactDOM from 'react-dom';
import dotenv from 'dotenv';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';


import store from './store';
import './bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

dotenv.config('./../.env');

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
