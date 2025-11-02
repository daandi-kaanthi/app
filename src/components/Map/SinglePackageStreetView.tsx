import { useEffect, useRef, useState } from "react";

interface SinglePackageStreetViewProps {
  pkg: {
    id: string;
    name: string;
    geoLocation: number[];
  };
}

export default function SinglePackageStreetView({ pkg }: SinglePackageStreetViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"street" | "aerial">("street");
  const mapRef = useRef<google.maps.Map | null>(null);
  const streetViewRef = useRef<google.maps.StreetViewPanorama | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (mode === "street") {
      const svService = new google.maps.StreetViewService();
      const radius = 500; // search within 500m

      svService.getPanorama(
        { location: { lat: pkg.geoLocation[0], lng: pkg.geoLocation[1] }, radius },
        (data, status) => {
          if (status === "OK" && data?.location?.latLng) {
            streetViewRef.current = new google.maps.StreetViewPanorama(
              containerRef.current!,
              {
                position: data.location.latLng,
                pov: { heading: 100, pitch: 0 },
                zoom: 1,
                visible: true,
              }
            );

            // Force resize (fix blank issue)
            setTimeout(() => {
              google.maps.event.trigger(streetViewRef.current!, "resize");
            }, 500);
          } else {
            console.warn("No Street View available nearby.");
            // Optionally fallback to aerial
            setMode("aerial");
          }
        }
      );
    } else {
      mapRef.current = new google.maps.Map(containerRef.current, {
        center: { lat: pkg.geoLocation[0], lng: pkg.geoLocation[1] },
        zoom: 18,
        tilt: 45, // Enables 3D angle
        mapTypeId: "satellite", // Aerial/Satellite view
      });
    }
  }, [mode, pkg]);

  return (
    <div>
      {/* Map Container */}
      <div
        ref={containerRef}
        style={{
          height: "350px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
        className="w-[100%]  border border-neutral-300 dark:border-neutral-600" 
      />
    </div>
  );
}
