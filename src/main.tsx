import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";
import "./i18n/i18n";
import StoreProvider from "./redux/StoreProvider.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

import { BrowserRouter } from "react-router-dom";
// import { ThirdwebProvider } from "thirdweb/react";
createRoot(document.getElementById("root")!).render(
  <StoreProvider>
    {/* <ThirdwebProvider> */}
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN!}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID!}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <BrowserRouter>
          <ThemeProvider>
            <StrictMode>
              <App />
            </StrictMode>
          </ThemeProvider>
        </BrowserRouter>
      </Auth0Provider>
    {/* </ThirdwebProvider> */}
  </StoreProvider>
);
