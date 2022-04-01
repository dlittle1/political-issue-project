import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import UserProvider from './context/UserProvider';
import RequestProvider from './context/RequestProvider';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <RequestProvider>
          <App />
        </RequestProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
