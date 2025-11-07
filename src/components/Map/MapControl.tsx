// components/MapControl.tsx (New File)
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MapControlProps {
  map: google.maps.Map | null;
  position: google.maps.ControlPosition;
  children: React.ReactNode;
}

const MapControl: React.FC<MapControlProps> = ({ map, position, children }) => {
  const [controlContainer, setControlContainer] =
    useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!map) return;

    // Create a new div element to hold the control content
    const div = document.createElement("div");
    div.style.pointerEvents = "auto";

    // Add the control to the specified position
    map.controls[position].push(div);
    setControlContainer(div);

    return () => {
      // Use MVCArray's own methods instead of Array.from
      const controlsArray = map.controls[position];
      for (let i = 0; i < controlsArray.getLength(); i++) {
        if (controlsArray.getAt(i) === div) {
          controlsArray.removeAt(i);
          break;
        }
      }
    };
  }, [map, position]);

  if (!controlContainer) {
    return null;
  }

  // Use a React Portal to render the children into the map's control container
  return createPortal(children, controlContainer);
};

export default MapControl;
