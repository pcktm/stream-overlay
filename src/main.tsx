import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fontsource/merriweather';
import '@fontsource/inter';
import './style/index.scss';
import {supabase} from './utils/client';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
