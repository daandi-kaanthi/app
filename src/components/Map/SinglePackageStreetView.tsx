import React from "react";
import { GoogleMap, StreetViewPanorama } from "@react-google-maps/api";

interface SingleMapProps {
  pkg: {
    id: string;
    name: string;
    geoLocation: number[];
  };
}

const containerStyle = {
  width: "500px",   // ✅ set custom width
  height: "400px",  // ✅ set custom height
  borderRadius: "10px",
  overflow: "hidden",
};

const SinglePackageStreetView: React.FC<SingleMapProps> = ({ pkg }) => {
  const center = {
    lat: pkg.geoLocation[0],
    lng: pkg.geoLocation[1],
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} options={{ disableDefaultUI: true }}>
        <StreetViewPanorama
          options={{
            pov: { heading: 120, pitch: 0 },
            enableCloseButton: false,
            position:center,
            visible:true
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default SinglePackageStreetView;
