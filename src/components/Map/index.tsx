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
  MarkerClusterer,
} from "@react-google-maps/api";
import type { ITravelPackage } from "../../redux/slices/Travel/TravelSlice";
import MapCard from "../Card/MapCard";
import ContactDialog from "../ui/Dialog/SignUpForm";
import useMapStyling from "../../hooks/useMapStyling";
import MapAutocomplete from "./MapSearch";
import Stories, { type StoryGroup } from "../Card/StoriesCard";

const groups: StoryGroup[] = [
  {
    id: 1,
    title: "tungnath",
    thumbnail:
      "https://skaya-bucket.s3.us-east-1.amazonaws.com/tungnath/Tungnath+Rudraprayag+Uttarakhand+India.jpeg",

    stories: [
      {
        id: 1,
        type: "image",
        url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/tungnath/Tungnath_Temple_in_winter.jpg",
        duration: 4000,
      },
      {
        id: 2,
        type: "video",
        url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/tungnath/reviews/tungnath.mp4",
      },
    ],
  },
  {
    id: 2,
    title: "kedarnath",
    thumbnail:
      "https://skaya-bucket.s3.us-east-1.amazonaws.com/Kedarnath/Kedarnath+Dham.jpg",
    stories: [
      {
        id: 1,
        type: "image",
        url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/Kedarnath/rishu-bhosale-8Y0Ql4SjGfY-unsplash.jpg",
      },
      {
        id: 2,
        type: "image",
        url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/Kedarnath/pexels-ravikant-14102698.jpg",
      },
      {
        id: 3,
        type: "image",
        url: "https://skaya-bucket.s3.us-east-1.amazonaws.com/Kedarnath/pexels-soubhagya23-18915949.jpg",
      },
    ],
  },
];

interface PackagesMapProps {
  packages: ITravelPackage[];
  onMarkerClick?: (packageId: string, packageTitle: string) => void;
  onMapClick?: (lat: number, lng: number) => void;
  searchResult?: {
    lat: number;
    lng: number;
    name: string;
    zoom?: number;
  } | null;
  onSearchComplete?: () => void;
}

const containerStyle = { width: "100%", height: "100vh" };

const PackagesMap: React.FC<PackagesMapProps> = ({
  packages,
  onMarkerClick,
  onMapClick,
  searchResult,
  onSearchComplete,
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
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [activeStory, setActiveStory] = useState<StoryGroup | null>(null);

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const pendingInfoWindowRef = useRef<{ lat: number; lng: number } | null>(
    null
  );
  const animationTimeoutRef = useRef<any | null>(null);
  const [isStreetViewActive, setIsStreetViewActive] = useState(false);
  const [outOfViewMarkers, setOutOfViewMarkers] = useState<ITravelPackage[]>([]);

  const { isDarkMode, mapStyles } = useMapStyling({
    mapRef,
  });

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
    return { lat: 30, lng: 80 };
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


// Pan so clicked marker is at bottom center
const panToBottomCenter = useCallback(
  (lat: number, lng: number, onComplete?: () => void) => {
    if (!mapInstance) {
      onComplete?.();
      return;
    }
    const mapDiv = mapInstance.getDiv();
    const mapHeight = mapDiv.clientHeight;

    const proj = mapInstance.getProjection();
    if (!proj) {
      mapInstance.panTo({ lat, lng });
      onComplete?.();
      return;
    }

    const zoom = mapInstance.getZoom();
    if (zoom === undefined) {
      mapInstance.panTo({ lat, lng });
      onComplete?.();
      return;
    }

    const worldPoint = proj.fromLatLngToPoint(new google.maps.LatLng(lat, lng));
    if (!worldPoint) {
      mapInstance.panTo({ lat, lng });
      onComplete?.();
      return;
    }

    const yOffset = mapHeight / 4 / Math.pow(2, zoom);
    const newCenter = proj.fromPointToLatLng(
      new google.maps.Point(worldPoint.x, worldPoint.y - yOffset)
    );
    
    if (newCenter) {
      mapInstance.panTo(newCenter);
    }
    
    if (onComplete) {
      setTimeout(onComplete, 300);
    }
  },
  [mapInstance]
);

  const openInfoWindowAt = useCallback(
    (lat: number, lng: number, nearest: ITravelPackage | null, isComingSoon: boolean) => {
      pendingInfoWindowRef.current = { lat, lng };
      panToBottomCenter(lat, lng, () => {
        if (
          pendingInfoWindowRef.current?.lat === lat &&
          pendingInfoWindowRef.current?.lng === lng
        ) {
          setClickedPosition({ lat, lng });
          setNearestPackage(nearest);
          setShowComingSoon(isComingSoon);
          pendingInfoWindowRef.current = null;
        }
      });
    },
    [panToBottomCenter]
  );


  const handleMarkerClick = useCallback(
    (pkg: ITravelPackage) => {
      onMarkerClick?.(pkg.id, pkg.translations.en.title);
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

  // Handle external search result
  useEffect(() => {
    if (searchResult && mapInstance && packagesWithGeo.length) {
      handlePlaceSelect(
        searchResult.lat,
        searchResult.lng,
        searchResult.name,
        searchResult.zoom
      );
      // Clear the search result after processing
      onSearchComplete?.();
    }
  }, [
    searchResult,
    mapInstance,
    packagesWithGeo.length,
    handlePlaceSelect,
    onSearchComplete,
  ]);

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
      setIsStreetViewActive(isVisible);
      if (isVisible) {
        closeInfoWindow();
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
        window.history.pushState({ streetView: true }, "");
      } else {
        if (window.history.state?.streetView) {
          window.history.back();
        }
      }
    });

    const handlePopState = (event: PopStateEvent) => {
      if (streetView.getVisible()) {
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
      const scrollContainers = document.querySelectorAll(".gm-style-iw-d");
      scrollContainers.forEach((el) => {
        const div = el as HTMLElement;
        div.style.overflow = "hidden";
        div.style.maxHeight = "none";
      });

      const containers = document.querySelectorAll(".gm-style-iw-c");
      containers.forEach((el) => {
        const div = el as HTMLElement;
        div.style.backgroundColor = isDarkMode ? "#121417" : "#ffffff";
        div.style.color = isDarkMode ? "#ffffff" : "#000000";
        div.style.borderRadius = "12px";
        div.style.padding = "10px";
        div.style.overflow = "hidden";
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

  // Close button css
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

  // Check for markers outside current view
  useEffect(() => {
    if (!mapInstance) return;

    const checkMarkersInView = () => {
      const bounds = mapInstance.getBounds();
      if (!bounds) return;

      const markersOutOfView = packagesWithGeo.filter((pkg) => {
        const markerPos = new google.maps.LatLng(
          pkg.geoLocation![0],
          pkg.geoLocation![1]
        );
        return !bounds.contains(markerPos);
      });

      setOutOfViewMarkers(markersOutOfView);
    };

    checkMarkersInView();

    const boundsListener = mapInstance.addListener("bounds_changed", checkMarkersInView);
    const idleListener = mapInstance.addListener("idle", checkMarkersInView);

    return () => {
      boundsListener.remove();
      idleListener.remove();
    };
  }, [mapInstance, packagesWithGeo]);

  // Pan to show all markers
  const handleShowAllMarkers = useCallback(() => {
    if (!mapInstance || packagesWithGeo.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    packagesWithGeo.forEach((pkg) => {
      bounds.extend(
        new google.maps.LatLng(pkg.geoLocation![0], pkg.geoLocation![1])
      );
    });

    mapInstance.fitBounds(bounds, { top: 80, right: 50, bottom: 50, left: 50 });
  }, [mapInstance, packagesWithGeo]);

  return (
    <div className={`relative w-full h-screen z-1`}>
      {clickedPosition && (
        <div className="absolute inset-0 z-10 bg-transparent pointer-events-none" />
      )}
      <div className="absolute top-10 md:top-2 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-2xl px-4">
      <Stories
        storyGroups={groups}
        activeGroup={activeStory}
        setActiveGroup={setActiveStory}
      />
        {!isStreetViewActive && (
          <MapAutocomplete onPlaceSelect={handlePlaceSelect} />
        )}
      </div>

      {/* Out of view markers indicator */}
      {outOfViewMarkers.length > 0 && !isStreetViewActive && (
        <button
          onClick={handleShowAllMarkers}
          className={`absolute bottom-24 right-4 z-20 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 ${
            isDarkMode
              ? "bg-[#121417] text-white border border-white/10"
              : "bg-white text-gray-800 border border-gray-200"
          }`}
        >
          <div className="relative">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="3" fill="currentColor" />
              <circle cx="6" cy="8" r="2" fill="currentColor" opacity="0.7" />
              <circle cx="18" cy="8" r="2" fill="currentColor" opacity="0.7" />
              <circle cx="8" cy="16" r="2" fill="currentColor" opacity="0.5" />
              <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.5" />
            </svg>
          </div>
          <span className="font-medium text-sm">
            {outOfViewMarkers.length} location{outOfViewMarkers.length !== 1 ? "s" : ""} outside view
          </span>
        </button>
      )}

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={6}
        onLoad={(map) => {
          setMapInstance(map);
          mapRef.current = map;
        }}
        onClick={handleMapClick}
        options={{
          styles: isDarkMode ? mapStyles : [],
          gestureHandling: "greedy",
          disableDoubleClickZoom: true,
          draggableCursor: "pointer",
          disableDefaultUI: true,
          streetViewControl: true,
          streetViewControlOptions: {
            position: 4,
          },
          zoomControl: true,
          zoomControlOptions: {
            position: 8,
          },
        }}
      >
        <MarkerClusterer
          options={{
            gridSize: 16, // smaller = tighter clusters (default is 60)
            minimumClusterSize: 4, // min markers to form a cluster
            maxZoom: 10, // optional: prevents clustering beyond this zoom
          }}
        >
          {(clusterer) => (
            <>
              {packagesWithGeo.map((pkg) => (
                <Marker
                  key={pkg.id}
                  position={{
                    lat: pkg.geoLocation![0],
                    lng: pkg.geoLocation![1],
                  }}
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