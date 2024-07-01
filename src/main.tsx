import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';
import AuthProvider from './providers/AuthProvider.tsx';
import MovieProvider from './providers/MovieProvider.tsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './assets/css/main.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
);
