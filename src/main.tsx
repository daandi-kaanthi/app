import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./i18n/i18n";
import StoreProvider from "./redux/StoreProvider.tsx";

import { BrowserRouter } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";
createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    <ThirdwebProvider>
      <BrowserRouter>
        <ThemeProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </ThemeProvider>
      </BrowserRouter>
    </ThirdwebProvider>
  </StoreProvider>
);
