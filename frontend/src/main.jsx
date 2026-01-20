import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { BookingProvider } from "./context/BookingContext";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  // <AuthProvider>
  //   <App />
  // </AuthProvider>

  <BookingProvider>
    <App />
  </BookingProvider>
)
