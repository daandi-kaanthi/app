import React, { useCallback, useEffect, useState, useRef } from "react";
import PackagesMap from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch } from "../redux/store";
import { fetchTravelPackagesApi } from "../redux/slices/Travel/TravelApiSlice.tsx";
import { useOutsideClick } from "../hooks/use-outside-click";
import {
  selectedTravelPackages,
  type ITravelPackage,
} from "../redux/slices/Travel/TravelSlice";
import { PackageModal } from "../components/PackageModal/index.tsx";

const Home: React.FC = () => {
  const [active, setActive] = useState<ITravelPackage | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const travelPackages = useSelector(selectedTravelPackages);
  const dispatch = useDispatch<AppDispatch>();
  const drawerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  const handleMarkerClick = useCallback(
    (packageId: string) => {
      setDrawerOpen(true);
      // Find the full package object to pass to the modal
      const pkg = travelPackages.travelPackages.find(
        (p: { id: string }) => p.id === packageId
      );
      if (pkg) {
        setActive(pkg);
        // Push state to history when modal opens
        window.history.pushState({ modal: true, packageId }, "");
      }
    },
    [travelPackages]
  );

  const closeDrawer = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    
    setDrawerOpen(false);
    setActive(null);
    
    // Remove history state if it exists
    if (window.history.state?.modal) {
      window.history.back();
    }
    
    // Reset the closing flag after a short delay
    setTimeout(() => {
      isClosingRef.current = false;
    }, 100);
  }, []);

  const closeModal = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    
    setActive(null);
    
    // Remove history state if it exists
    if (window.history.state?.modal) {
      window.history.back();
    }
    
    // Reset the closing flag after a short delay
    setTimeout(() => {
      isClosingRef.current = false;
    }, 100);
  }, []);

  // Use the outside click hook for both drawer and modal
  useOutsideClick(drawerRef, closeDrawer);
  useOutsideClick(modalRef, closeModal);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (window.history.state?.modal || active) {
        // Prevent the closing ref check in this case
        isClosingRef.current = false;
        setActive(null);
        setDrawerOpen(false);
        event.preventDefault();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [active]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDrawer();
      }
    }

    if (drawerOpen || active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, active, closeDrawer]);

  useEffect(() => {
    dispatch(
      fetchTravelPackagesApi({
        status: "active",
        select: "title,dateAvailabilities,geoLocationLat,geoLocationLng",
      })
    );
  }, [dispatch]);

  return (
    <div>
      <PackagesMap
        packages={travelPackages.travelPackages}
        onMarkerClick={handleMarkerClick}
      />
      {/* Modal for larger screens */}
      <PackageModal
        ref={modalRef}
        id={(active && active.id) || ""}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;