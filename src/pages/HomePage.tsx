"use client";
import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
  Suspense,
} from "react";
import { useSelector } from "react-redux";
import {
  selectedTravelPackages,
  type ITravelPackage,
} from "../redux/slices/Travel/TravelSlice";
import { useJsApiLoader } from "@react-google-maps/api";
import { LoaderOne } from "../components/ui/Text/Loader.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { AnimatePresence } from "framer-motion";
import { UnauthenticatedProfile } from "./Profile/UnauthenticatedProfile.tsx";
import ModalContainer from "../components/PackageModal/ModalContainer.tsx";
const PackagesMap = React.lazy(() => import("../components/Map"));

// Create a context for map search
export const MapSearchContext = React.createContext<{
  handlePlaceSelect: (
    lat: number,
    lng: number,
    name: string,
    zoom?: number
  ) => void;
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

  const rawTravelPackages = useSelector(selectedTravelPackages);
  const isClosingRef = useRef(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  // Only memoize if you are transforming/filtering them
  const travelPackages = useMemo(() => {
    // Example: sort or filter or enrich packages here
    return rawTravelPackages;
  }, [rawTravelPackages]);

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
    if (isAuthenticated) {
      localStorage.setItem("hasBeenVerified", "true");
      localStorage.removeItem("visitCount");
      setShowPopup(false);
      return;
    }

    if (localStorage.getItem("hasBeenVerified") === "true") return;

    const visitCount = +localStorage.getItem("visitCount")! + 1 || 1;
    localStorage.setItem("visitCount", visitCount.toString());
    if ([1, 5, 10, 15].includes(visitCount))
      setTimeout(() => setShowPopup(true), 10);
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
        <Suspense
          fallback={
            <div className="flex items-center justify-center w-full h-screen">
              <LoaderOne />
            </div>
          }
        >
          <PackagesMap
            packages={travelPackages.travelPackages}
            onMarkerClick={handleMarkerClick}
            searchResult={searchResult}
            onSearchComplete={clearSearchResult}
          />
        </Suspense>

        <Outlet />

        {/* ✅ Unauthenticated popup */}
        <AnimatePresence>
          {showPopup && (
            <ModalContainer id="">
              <UnauthenticatedProfile
                getShowSkip={true}
                onShowSkipButton={handleClosePopup}
              />
            </ModalContainer>
          )}
        </AnimatePresence>
      </div>
    </MapSearchContext.Provider>
  );
};

export default HomePage;
