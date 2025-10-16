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

  const handleMarkerClick = useCallback(
    (packageId: string) => {
      setDrawerOpen(true);
      // Find the full package object to pass to the modal
      const pkg = travelPackages.travelPackages.find(
        (p: { id: string }) => p.id === packageId
      );
      if (pkg) setActive(pkg);
    },
    [travelPackages]
  );

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    setActive(null);
  }, []);

  // Use the outside click hook for both drawer and modal
  useOutsideClick(drawerRef, closeDrawer);
  useOutsideClick(modalRef, () => setActive(null));

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
  }, [drawerOpen, active]);

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
        onClose={() => setActive(null)}
      />
    </div>
  );
};

export default Home;
