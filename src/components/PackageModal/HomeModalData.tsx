import React, { useContext } from "react";
import MapAutocomplete from "../Map/MapSearch";
import { MapSearchContext } from "../../pages/HomePage";

interface TravelExplorerProps {
  id?: string;
}

const TravelExplorer: React.FC<TravelExplorerProps> = () => {
  const searchContext = useContext(MapSearchContext);

  if (!searchContext) {
    console.error("TravelExplorer must be used within MapSearchContext");
    return (
      <div className="p-6 text-center text-red-500">
        Error: Search context not available
      </div>
    );
  }
  const { handlePlaceSelect } = searchContext;

  return (
    <div className="flex flex-col items-center justify-center min-h-[100px] px-2 py-2 gap-4">
      {/* Search bar always visible */}
      <MapAutocomplete onPlaceSelect={handlePlaceSelect} />
    </div>
  );
};

export default TravelExplorer;
