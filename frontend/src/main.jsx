// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // Still need this import
import UserContext from '../context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
    <div>
      <BrowserRouter>
      <UserContext>
        <App />
      </UserContext>
    </BrowserRouter>  
    </div>
)
