import { useEffect, useState } from 'react';

/**
 * Unified Map Styling Hook
 * Handles dark mode detection, map control styling, and InfoWindow theming
 * for Google Maps components
 */

// Dark map style configuration
export const DARK_MAP_STYLE: google.maps.MapTypeStyle[] = [
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

// Satellite map dark style configuration
export const DARK_SATELLITE_STYLE: google.maps.MapTypeStyle[] = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }]
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#000000" }, { weight: 2 }]
  }
];

interface UseMapStylingOptions {
  mapRef: React.RefObject<google.maps.Map | null>;
  hasInfoWindow?: boolean;
}

export const useMapStyling = ({ mapRef, hasInfoWindow = false }: UseMapStylingOptions) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 1. Observe dark mode changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 2. Apply control styling (zoom, street view, fullscreen buttons, map type controls)
  useEffect(() => {
    if (!mapRef.current) return;

    const applyControlStyles = () => {
      const bgColor = isDarkMode ? "#121417" : "rgba(255, 255, 255, 0.9)";
      const borderColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";
      const textColor = isDarkMode ? "#ffffff" : "#000000";

      // Style zoom controls
      const zoomControls = document.querySelectorAll(".gm-control-active");
      zoomControls.forEach((control) => {
        const element = control as HTMLElement;
        element.style.backgroundColor = bgColor;
        element.style.border = `1px solid ${borderColor}`;
        element.style.color = textColor;
      });

      // Style street view, fullscreen, and map type controls
      const controls = document.querySelectorAll(
        'button[aria-label*="Street View"], button[aria-label*="Toggle fullscreen"], button[aria-label*="Map"], button[aria-label*="Show satellite imagery"], button[aria-label*="Show street map"]'
      );
      controls.forEach((control) => {
        const element = control as HTMLElement;
        element.style.backgroundColor = bgColor;
        element.style.border = `1px solid ${borderColor}`;
        element.style.color = textColor;
      });

      // Style map type control container
      const mapTypeControls = document.querySelectorAll(".gm-style-mtc");
      mapTypeControls.forEach((control) => {
        const element = control as HTMLElement;
        element.style.backgroundColor = bgColor;
        element.style.border = `1px solid ${borderColor}`;
        element.style.borderRadius = "2px";
      });

      // Style map type buttons (Map/Satellite toggle)
      const mapTypeButtons = document.querySelectorAll(".gm-style-mtc > div");
      mapTypeButtons.forEach((button) => {
        const element = button as HTMLElement;
        element.style.backgroundColor = bgColor;
        element.style.color = textColor;
        element.style.borderRight = `1px solid ${borderColor}`;
      });

      // Style active map type button
      const activeMapTypeButtons = document.querySelectorAll(".gm-style-mtc > div[aria-pressed='true']");
      activeMapTypeButtons.forEach((button) => {
        const element = button as HTMLElement;
        element.style.fontWeight = "bold";
        element.style.backgroundColor = isDarkMode ? "#1a1d21" : "rgba(0, 0, 0, 0.05)";
      });

      // Style pegman (Street View icon)
      const pegman = document.querySelector(".gm-svpc");
      if (pegman) {
        const element = pegman as HTMLElement;
        element.style.backgroundColor = bgColor;
        element.style.border = `1px solid ${borderColor}`;
        element.style.borderRadius = "2px";
      }
    };
    
    // Apply styles multiple times to catch async-loaded controls
    const timer1 = setTimeout(applyControlStyles, 100);
    const timer2 = setTimeout(applyControlStyles, 500);
    const timer3 = setTimeout(applyControlStyles, 1000);

    // Observe DOM changes for dynamically added controls
    const observer = new MutationObserver(applyControlStyles);
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

  // 3. Apply satellite map styling
  useEffect(() => {
    if (!mapRef.current) return;

    const applySatelliteStyles = () => {
      const map = mapRef.current;
      if (!map) return;

      const mapTypeId = map.getMapTypeId();
      
      // Apply dark styling to satellite/hybrid views
      if (isDarkMode && (mapTypeId === 'satellite' || mapTypeId === 'hybrid')) {
        map.setOptions({
          styles: DARK_SATELLITE_STYLE
        });
      } else if (!isDarkMode && (mapTypeId === 'satellite' || mapTypeId === 'hybrid')) {
        map.setOptions({
          styles: []
        });
      } else if (mapTypeId === 'roadmap' || mapTypeId === 'terrain') {
        map.setOptions({
          styles: isDarkMode ? DARK_MAP_STYLE : []
        });
      }
    };

    applySatelliteStyles();

    // Listen for map type changes
    const listener = mapRef.current.addListener('maptypeid_changed', applySatelliteStyles);

    return () => {
      if (listener) {
        google.maps.event.removeListener(listener);
      }
    };
  }, [isDarkMode, mapRef.current]);

  // 4. Style InfoWindow (only if enabled)
  useEffect(() => {
    if (!hasInfoWindow || !mapRef.current) return;

    const updateInfoWindowStyle = () => {
      // Fix inner scroll container (.gm-style-iw-d)
      const scrollContainers = document.querySelectorAll(".gm-style-iw-d");
      scrollContainers.forEach((el) => {
        const div = el as HTMLElement;
        div.style.overflow = "hidden";
        div.style.maxHeight = "none";
      });

      // Style main container (.gm-style-iw-c)
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

      // Style close button
      const closeButtons = document.querySelectorAll(".gm-ui-hover-effect span");
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

    updateInfoWindowStyle();

    const observer = new MutationObserver(updateInfoWindowStyle);
    const mapDiv = mapRef.current.getDiv();
    
    if (mapDiv) {
      observer.observe(mapDiv, { 
        childList: true, 
        subtree: true 
      });
    }

    return () => observer.disconnect();
  }, [isDarkMode, hasInfoWindow, mapRef.current]);

  return { 
    isDarkMode, 
    mapStyles: isDarkMode ? DARK_MAP_STYLE : [] 
  };
};

export default useMapStyling;