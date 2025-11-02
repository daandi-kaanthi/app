import React, { useCallback, useEffect, useState, useRef } from "react";
import PackagesMap from "../components/Map";
import { useSelector } from "react-redux";
// import { type AppDispatch } from "../redux/store";
// import { fetchTravelPackagesApi } from "../redux/slices/Travel/TravelApiSlice.tsx";
import {
  selectedTravelPackages,
  type ITravelPackage,
} from "../redux/slices/Travel/TravelSlice";
import { useJsApiLoader } from "@react-google-maps/api";
import { LoaderOne } from "../components/ui/Text/Loader.tsx";
import { Outlet, useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const [active, setActive] = useState<ITravelPackage | null>(null);
  const travelPackages = useSelector(selectedTravelPackages);
  // const dispatch = useDispatch<AppDispatch>();
  const isClosingRef = useRef(false);

  const navigate = useNavigate();
  const handleMarkerClick = useCallback(
    (packageId: string,packageTitle:String) => {
      navigate(`/package/${packageId}/${packageTitle}/overview`);
    },
    [navigate]
  );

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (window.history.state?.modal || active) {
        // Prevent the closing ref check in this case
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

  // useEffect(() => {
  //   dispatch(
  //     fetchTravelPackagesApi({
  //       status: "active",
  //       select: "title,dateAvailabilities,geoLocationLat,geoLocationLng",
  //     })
  //   );
  // }, [dispatch]);

  // Load Google Maps API
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
    <div className="fixed inset-0 flex flex-1 flex-col md:relative">
      <PackagesMap
        packages={travelPackages.travelPackages}
        onMarkerClick={handleMarkerClick}
      />
      {/* Modal for larger screens */}
      <Outlet />
    </div>
  );
};

export default HomePage;
