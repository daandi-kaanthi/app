import React, { useRef, useCallback, useState } from "react";
import MapAutocomplete from "../Map/MapSearch";

export default function TravelExplorer() {
  const [mapHandler, setMapHandler] = useState<
    ((lat: number, lng: number, name: string, zoom?: number) => void) | null
  >(null);

  const handlePlaceSelect = useCallback(
    (lat: number, lng: number, name: string, zoom?: number) => {
      if (mapHandler) {
        mapHandler(lat, lng, name, zoom);
      }
    },
    [mapHandler]
  );

  return (
    <div className="relative w-full h-full">
      {/* ✅ Autocomplete outside the map */}
        <MapAutocomplete onPlaceSelect={handlePlaceSelect} />

 
    </div>
  );
}
