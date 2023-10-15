import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/auth-context.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TextProvider } from './context/task-context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    
   
    <AuthProvider>
      <TextProvider>
      <App />
      </TextProvider>
    </AuthProvider>
    </BrowserRouter>
    
  </React.StrictMode>,
)
