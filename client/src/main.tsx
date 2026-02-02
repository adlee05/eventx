import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/components/providers/AuthProvider.tsx";
import { ThemeProvider } from "@/components/providers/themeProvider.tsx";
import NotifyProvider from "@/components/providers/notifyProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <NotifyProvider>
            <App />
          </NotifyProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode >
)
