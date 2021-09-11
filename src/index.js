import React from 'react';
import reportWebVitals from './reportWebVitals';
// import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import axios from "axios";

axios.defaults.baseURL = 'https://sparklesdigital.net/api/';
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
// axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.interceptors.request.use(request => {
//         console.log(request);
//         // Edit request config
//         return request;
//     }, error => {
//         console.log(error);
//         return Promise.reject(error);
//     });
//
//     axios.interceptors.response.use(response => {
//         console.log(response);
//         // Edit response config
//         return response;
//     }, error => {
//         console.log(error);
//         return Promise.reject(error);
//     });

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
//   rootElement
// );


// import './index.scss';
// import '../node_modules/bootstrap/scss/bootstrap.scss';

// import { StrictMode } from "react";

// import App from "./App";

ReactDOM.render(
  <React.StrictMode>

    <App />

  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
