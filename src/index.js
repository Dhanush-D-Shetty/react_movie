import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppProvider } from "./AppProvider";
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <React.StrictMode>
          <AppProvider>      
              <App />
          </AppProvider>
      </React.StrictMode>
);

reportWebVitals();
