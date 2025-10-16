import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import "./i18n"
import StoreProvider from "./redux/StoreProvider.tsx";
import { APIProvider } from "@vis.gl/react-google-maps";
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

createRoot(document.getElementById('root')!).render(
      <APIProvider apiKey={googleMapsApiKey}>
      <StoreProvider>

  <ThemeProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </ThemeProvider>
      </StoreProvider>
      </APIProvider>
)
