import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import StoreProvider from "./redux/StoreProvider";
import "./index.css";

// Lazy-load i18n so it doesn’t block startup
import("./i18n/i18n");

// Lazy-load Auth0Provider only when needed
const LazyAuthProvider = lazy(() =>
  import("@auth0/auth0-react").then((mod) => ({
    default: mod.Auth0Provider,
  }))
);

// Lazy-load the main App
const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StoreProvider>
      <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
        <LazyAuthProvider
          domain={import.meta.env.VITE_AUTH0_DOMAIN!}
          clientId={import.meta.env.VITE_AUTH0_CLIENT_ID!}
          authorizationParams={{
            redirect_uri: window.location.origin,
          }}
        >
          <BrowserRouter>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </LazyAuthProvider>
      </Suspense>
    </StoreProvider>
  </React.StrictMode>
);
