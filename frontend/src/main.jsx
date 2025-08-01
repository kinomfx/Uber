

import { StrictMode } from 'react'; // It's good practice to keep this!
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from '../context/UserContext.jsx'; // Import the provider
import CaptainContext from '../context/CaptainContext.jsx'; // Import the CaptainContext
createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <CaptainContext>
      <UserProvider>
          <App />
      </UserProvider>
    </CaptainContext>
    </BrowserRouter>
  
);