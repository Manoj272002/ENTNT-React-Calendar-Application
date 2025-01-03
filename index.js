// Importing necessary libraries
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18 syntax for client-side rendering
import './index.css'; // Your global CSS file (if applicable)
import App from './App'; // Your main App component
import reportWebVitals from './reportWebVitals'; // Performance measuring utility
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

// Creating the root element to render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the root element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
