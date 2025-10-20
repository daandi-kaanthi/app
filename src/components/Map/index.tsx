import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
  MarkerClusterer,
} from "@react-google-maps/api";
import type { ITravelPackage } from "../../redux/slices/Travel/TravelSlice";
import MapAutocomplete from "./MapSearch";
import MapCard from "../Card/MapCard";
import { LoaderOne } from "../ui/Text/Loader";
import ContactDialog from "../ui/Dialog/SignUpForm";

// Dark map style fallback
const DARK_MAP_STYLE = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
];

interface PackagesMapProps {
  packages: ITravelPackage[];
  onMarkerClick?: (packageId: string) => void;
  onMapClick?: (lat: number, lng: number) => void;
}

const containerStyle = { width: "100%", height: "100vh" };

const PackagesMap: React.FC<PackagesMapProps> = ({
  packages,
  onMarkerClick,
  onMapClick,
}) => {
  const [clickedPosition, setClickedPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [nearestPackage, setNearestPackage] = useState<ITravelPackage | null>(
    null
  );
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const pendingInfoWindowRef = useRef<{ lat: number; lng: number } | null>(
    null
  );
  const animationTimeoutRef = useRef<any | null>(null);
  const [isStreetViewActive, setIsStreetViewActive] = useState(false);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  // Observe dark mode
  useEffect(() => {
    const checkTheme = () =>
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Apply control background styling based on theme
  useEffect(() => {
    if (!mapRef.current) return;

    const applyControlStyles = () => {
      const zoomControls = document.querySelectorAll(".gm-control-active");
      zoomControls.forEach((control) => {
        const element = control as HTMLElement;
        if (isDarkMode) {
          element.style.backgroundColor = "#121417";
          element.style.border = "1px solid rgba(255, 255, 255, 0.1)";
        } else {
          element.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          element.style.border = "1px solid rgba(0, 0, 0, 0.1)";
        }
      });

      const svControls = document.querySelectorAll(
        'button[aria-label*="Street View"], button[aria-label*="Toggle fullscreen"]'
      );
      svControls.forEach((control) => {
        const element = control as HTMLElement;
        if (isDarkMode) {
          element.style.backgroundColor = "#121417";
          element.style.border = "1px solid rgba(255, 255, 255, 0.1)";
        } else {
          element.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          element.style.border = "1px solid rgba(0, 0, 0, 0.1)";
        }
      });
    };

    const timer1 = setTimeout(applyControlStyles, 100);
    const timer2 = setTimeout(applyControlStyles, 500);
    const timer3 = setTimeout(applyControlStyles, 1000);

    const observer = new MutationObserver(() => {
      applyControlStyles();
    });

    const mapContainer = mapRef.current.getDiv();
    if (mapContainer) {
      observer.observe(mapContainer, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, [isDarkMode, mapRef.current]);

  const packagesWithGeo = useMemo(
    () =>
      packages.filter(
        (pkg) =>
          pkg.geoLocation &&
          Array.isArray(pkg.geoLocation) &&
          pkg.geoLocation.length === 2
      ),
    [packages]
  );

  // Auto-center on packages
  const mapCenter = useMemo(() => {
    if (!packagesWithGeo.length) return { lat: 22, lng: 78 };
    const sum = packagesWithGeo.reduce(
      (acc, pkg) => ({
        lat: acc.lat + pkg.geoLocation![0],
        lng: acc.lng + pkg.geoLocation![1],
      }),
      { lat: 0, lng: 0 }
    );
    return {
      lat: sum.lat / packagesWithGeo.length,
      lng: sum.lng / packagesWithGeo.length,
    };
  }, [packagesWithGeo]);

  const getDistanceInKm = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestPackage = useCallback(
    (
      lat: number,
      lng: number
    ): { package: ITravelPackage | null; distance: number } => {
      if (!packagesWithGeo.length) return { package: null, distance: Infinity };

      let nearest: ITravelPackage | null = null;
      let minDistance = Infinity;

      for (const pkg of packagesWithGeo) {
        const d = getDistanceInKm(
          lat,
          lng,
          pkg.geoLocation![0],
          pkg.geoLocation![1]
        );
        if (d < minDistance && d <= 250) {
          // Only consider packages within 100km
          minDistance = d;
          nearest = pkg;
        }
      }

      return { package: nearest, distance: minDistance };
    },
    [packagesWithGeo]
  );

  // Smooth pan with callback
  const smoothPanTo = useCallback(
    (lat: number, lng: number, onComplete?: () => void) => {
      if (!mapInstance) {
        onComplete?.();
        return;
      }

      // Clear any pending animations
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      // Smooth pan animation
      mapInstance.panTo({ lat, lng });

      // Wait for animation to complete (Google Maps panTo takes ~500ms)
      animationTimeoutRef.current = setTimeout(() => {
        onComplete?.();
      }, 100);
    },
    [mapInstance]
  );

  // Open InfoWindow at position with smooth animation
  const openInfoWindowAt = useCallback(
    (
      lat: number,
      lng: number,
      nearest: ITravelPackage | null,
      isComingSoon: boolean
    ) => {
      if (!mapInstance) return;

      // Store pending position
      pendingInfoWindowRef.current = { lat, lng };

      // Smooth pan first
      smoothPanTo(lat, lng, () => {
        // Only show InfoWindow if this is still the latest request
        if (
          pendingInfoWindowRef.current &&
          pendingInfoWindowRef.current.lat === lat &&
          pendingInfoWindowRef.current.lng === lng
        ) {
          setClickedPosition({ lat, lng });
          setNearestPackage(nearest);
          setShowComingSoon(isComingSoon);
          pendingInfoWindowRef.current = null;
        }
      });
    },
    [mapInstance, smoothPanTo]
  );

  const handleMarkerClick = useCallback(
    (pkg: ITravelPackage) => {
      onMarkerClick?.(pkg.id);
      setClickedPosition(null);
      setSearchedLocation(null);
      setNearestPackage(null);
    },
    [onMarkerClick]
  );

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (!e.latLng || !mapInstance) return;

      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      // Find nearest package
      const { package: nearest } = findNearestPackage(lat, lng);

      // Clear search location when clicking on map
      setSearchedLocation(null);

      // Smooth pan and open InfoWindow
      openInfoWindowAt(lat, lng, nearest, true);

      onMapClick?.(lat, lng);
    },
    [mapInstance, findNearestPackage, openInfoWindowAt, onMapClick]
  );

  const handlePlaceSelect = useCallback(
    (lat: number, lng: number, name: string, zoom?: number) => {
      if (!packagesWithGeo.length || !mapInstance) return;
      console.log(lat, lng);

      const { package: nearest, distance: minDistance } = findNearestPackage(
        lat,
        lng
      );
      const threshold = 1;
      const isComingSoon = minDistance >= threshold;

      // Set zoom if provided
      if (zoom) {
        mapInstance.setZoom(zoom);
      }

      // Update searched location
      setSearchedLocation({ lat, lng, name });

      // If close to a package, navigate to it
      if (!isComingSoon && nearest) {
        smoothPanTo(lat, lng, () => {
          handleMarkerClick(nearest);
        });
      } else {
        // Otherwise show coming soon
        openInfoWindowAt(lat, lng, nearest, isComingSoon);
      }
    },
    [
      packagesWithGeo,
      mapInstance,
      findNearestPackage,
      handleMarkerClick,
      openInfoWindowAt,
      smoothPanTo,
    ]
  );

  const closeInfoWindow = useCallback(() => {
    // Clear pending operations
    pendingInfoWindowRef.current = null;
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    setClickedPosition(null);
    setNearestPackage(null);
    setSearchedLocation(null);
  }, []);

  // Street View listener
  useEffect(() => {
    if (!mapRef.current) return;

    const streetView = mapRef.current.getStreetView();
    const listener = streetView.addListener("visible_changed", () => {
      const isVisible = streetView.getVisible();
      if (isVisible) {
        closeInfoWindow();
      }
    });

    return () => listener.remove();
  }, [mapRef.current, closeInfoWindow]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const streetView = mapRef.current.getStreetView();
    const listener = streetView.addListener("visible_changed", () => {
      const isVisible = streetView.getVisible();
      setIsStreetViewActive(isVisible); // Track visibility
      if (isVisible) {
        closeInfoWindow(); // Optional: close InfoWindow
      }
    });

    return () => listener.remove();
  }, [mapRef.current, closeInfoWindow]);

  // Handle Street View visibility and browser history
  useEffect(() => {
    if (!mapRef.current) return;
    const streetView = mapRef.current.getStreetView();

    const visibilityListener = streetView.addListener("visible_changed", () => {
      const isVisible = streetView.getVisible();
      setIsStreetViewActive(isVisible);

      if (isVisible) {
        closeInfoWindow();
        // Push a state to history when Street View opens
        window.history.pushState({ streetView: true }, "");
      } else {
        // Remove the history state when Street View closes
        if (window.history.state?.streetView) {
          window.history.back();
        }
      }
    });

    // Handle browser back button
    const handlePopState = (event: PopStateEvent) => {
      if (streetView.getVisible()) {
        // Close Street View when back button is pressed
        streetView.setVisible(false);
        event.preventDefault();
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      visibilityListener.remove();
      window.removeEventListener("popstate", handlePopState);
    };
  }, [mapRef.current, closeInfoWindow]);

  // Street View listener with custom positioning
  useEffect(() => {
    if (!mapRef.current) return;

    const streetView = mapRef.current.getStreetView();

    // Configure Street View options
    streetView.setOptions({
      addressControl: true,
      addressControlOptions: {
        position: 10,
      },
      fullscreenControl: true,
      fullscreenControlOptions: {
        position: 4,
      },
      zoomControl: true,
      zoomControlOptions: {
        position: 8,
      },
      panControlOptions: {
        position: 4,
      },
    });

    const listener = streetView.addListener("visible_changed", () => {
      const isVisible = streetView.getVisible();
      if (isVisible) {
        closeInfoWindow();
      }
    });

    return () => listener.remove();
  }, [mapRef.current, closeInfoWindow, isStreetViewActive]);

  // Update InfoWindow background based on dark/light mode
  useEffect(() => {
    const updateInfoWindowStyle = () => {
      // Fix inner scroll container (.gm-style-iw-d)
      const scrollContainers = document.querySelectorAll(".gm-style-iw-d");
      scrollContainers.forEach((el) => {
        const div = el as HTMLElement;
        div.style.overflow = "hidden"; // remove scroll
        div.style.maxHeight = "none"; // remove height restriction
      });

      // Style main container (.gm-style-iw-c)
      const containers = document.querySelectorAll(".gm-style-iw-c");
      containers.forEach((el) => {
        const div = el as HTMLElement;
        div.style.backgroundColor = isDarkMode ? "#121417" : "#ffffff";
        div.style.color = isDarkMode ? "#ffffff" : "#000000";
        div.style.borderRadius = "12px";
        div.style.padding = "10px";
        div.style.overflow = "hidden"; // prevent spill
        div.style.boxShadow = "0 4px 16px rgba(0,0,0,0.25)";
      });
    };

    updateInfoWindowStyle();

    const observer = new MutationObserver(updateInfoWindowStyle);
    const mapDiv = mapRef.current?.getDiv();
    if (mapDiv) {
      observer.observe(mapDiv, { childList: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [isDarkMode, clickedPosition]);

  //close button css
  useEffect(() => {
    const applyStyles = () => {
      const closeButtons = document.querySelectorAll(
        ".gm-ui-hover-effect span"
      );
      closeButtons.forEach((span) => {
        const el = span as HTMLElement;
        el.style.backgroundColor = isDarkMode ? "#000" : "#fff";
        el.style.borderRadius = "50%";
        el.style.width = "24px";
        el.style.height = "24px";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.boxShadow = isDarkMode
          ? "0 2px 6px rgba(0,0,0,0.6)"
          : "0 2px 6px rgba(0,0,0,0.2)";
        // Fix for icon color visibility
        el.style.filter = isDarkMode
          ? "invert(1) brightness(1.8)"
          : "invert(0) brightness(0.2)";
        el.style.transition = "all 0.3s ease";
      });
    };

    applyStyles();

    const observer = new MutationObserver(applyStyles);
    const mapDiv = mapRef.current?.getDiv();
    if (mapDiv) observer.observe(mapDiv, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [isDarkMode, clickedPosition]);

  if (!isLoaded)
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoaderOne />
      </div>
    );

  return (
    <div className={`relative w-full  z-1`}>
      {clickedPosition && (
        <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />
      )}
      {!isStreetViewActive && (
        <MapAutocomplete onPlaceSelect={handlePlaceSelect} />
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={4}
        onLoad={(map) => {
          setMapInstance(map);
          mapRef.current = map;
        }}
        onClick={handleMapClick}
        options={{
          styles: isDarkMode ? DARK_MAP_STYLE : [],
          gestureHandling: "greedy",
          disableDoubleClickZoom: true,
          draggableCursor: "pointer",
          disableDefaultUI: true,
          zoomControl: true,
          zoomControlOptions: {
            position: 8,
          },
          streetViewControl: true,
          streetViewControlOptions: {
            position: 4,
          },
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: 4,
          },
        }}
      >
        {packagesWithGeo.map((pkg, i) => (
          <Marker
            key={`package-${pkg.id}-${i}`}
            position={{ lat: pkg.geoLocation![0], lng: pkg.geoLocation![1] }}
            onClick={() => handleMarkerClick(pkg)}
          />
        ))}
             <MarkerClusterer >
          {(clusterer) => (
            <>
              {packagesWithGeo.map((pkg) => (
                <Marker
                  key={pkg.id}
                  position={{ lat: pkg.geoLocation![0], lng: pkg.geoLocation![1] }}
                  onClick={() => handleMarkerClick(pkg)}
                  clusterer={clusterer}
                />
              ))}
            </>
          )}
        </MarkerClusterer>
        {searchedLocation && (
          <Marker
            key="searched-location"
            position={{ lat: searchedLocation.lat, lng: searchedLocation.lng }}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
        {clickedPosition && (
          <InfoWindow position={clickedPosition} onCloseClick={closeInfoWindow}>
            <MapCard
              comingSoon={showComingSoon}
              nearestId={nearestPackage?.id || ""}
              onViewDetails={() =>
                nearestPackage && handleMarkerClick(nearestPackage)
              }
              // onOpenContact={() => setOpenContactDialog(true)}
            />
          </InfoWindow>
        )}
        <ContactDialog
          open={openContactDialog}
          onClose={() => setOpenContactDialog(false)}
          onSubmit={(data) => {
            console.log("Contact form submitted:", data);
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default PackagesMap;
