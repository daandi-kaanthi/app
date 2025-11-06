"use client";
import React, { useCallback, useEffect, useState, useRef } from "react";
import PackagesMap from "../components/Map";
import { useSelector } from "react-redux";
import {
  selectedTravelPackages,
  type ITravelPackage,
} from "../redux/slices/Travel/TravelSlice";
import { useJsApiLoader } from "@react-google-maps/api";
import { LoaderOne } from "../components/ui/Text/Loader.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { motion, AnimatePresence } from "framer-motion";
import { UnauthenticatedProfile } from "./Profile/UnauthenticatedProfile.tsx";

// Create a context for map search
export const MapSearchContext = React.createContext<{
  handlePlaceSelect: (lat: number, lng: number, name: string, zoom?: number) => void;
} | null>(null);

const HomePage: React.FC = () => {
  const [active, setActive] = useState<ITravelPackage | null>(null);
  const [searchResult, setSearchResult] = useState<{
    lat: number;
    lng: number;
    name: string;
    zoom?: number;
  } | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const travelPackages = useSelector(selectedTravelPackages);
  const isClosingRef = useRef(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  // ✅ Handle marker clicks
  const handleMarkerClick = useCallback(
    (packageId: string, packageTitle: string) => {
      navigate(`/package/${packageId}/${packageTitle}/dates`);
    },
    [navigate]
  );

  // ✅ Handle place selection from autocomplete
  const handlePlaceSelect = useCallback(
    (lat: number, lng: number, name: string, zoom?: number) => {
      setSearchResult({ lat, lng, name, zoom });
    },
    []
  );

  const clearSearchResult = useCallback(() => {
    setSearchResult(null);
  }, []);

  // ✅ Close popup handler
  const handleClosePopup = useCallback(() => {
    setShowPopup(false);
  }, []);

  // ✅ Browser back button handler
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (window.history.state?.modal || active) {
        isClosingRef.current = false;
        setActive(null);
        event.preventDefault();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [active]);

  // ✅ Visit tracking logic (disabled if verified)
  useEffect(() => {
    const hasBeenVerified = localStorage.getItem("hasBeenVerified");

    // ✅ If authenticated, mark as verified
    if (isAuthenticated) {
      localStorage.setItem("hasBeenVerified", "true");
      localStorage.removeItem("visitCount");
      setShowPopup(false);
      return;
    }

    // ✅ If user has already been verified once, don't show popup ever again
    if (hasBeenVerified === "true") return;

    // ✅ Normal visit counting logic for unauthenticated & unverified users
    const visitCount = parseInt(localStorage.getItem("visitCount") || "0", 10);
    const newCount = visitCount + 1;
    localStorage.setItem("visitCount", newCount.toString());

    const triggerVisits = [1, 5, 10, 15];
    if (triggerVisits.includes(newCount)) {
      setTimeout(() => setShowPopup(true), 10);
    }
  }, [isAuthenticated]);

  // ✅ Load Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoaderOne />
      </div>
    );

  return (
    <MapSearchContext.Provider value={{ handlePlaceSelect }}>
      <div className="fixed inset-0 flex flex-1 flex-col md:relative">
        <PackagesMap
          packages={travelPackages.travelPackages}
          onMarkerClick={handleMarkerClick}
          searchResult={searchResult}
          onSearchComplete={clearSearchResult}
        />
        <Outlet />

        {/* ✅ Unauthenticated popup */}
        <AnimatePresence>
          {showPopup && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md"
              onClick={handleClosePopup}
            >
              <motion.div
                className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 max-w-lg w-[100%]"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <UnauthenticatedProfile
                  getShowSkip={true}
                  onShowSkipButton={handleClosePopup}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </MapSearchContext.Provider>
  );
};

export default HomePage;
