import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";
import TruckIcon from "../../assets/1338081574.svg";
import { useMapStyling } from "../../hooks/useMapStyling";
import DayWiseTimelineCard from "../Card/DayWiseTimelineCard";
import { useTranslation } from "react-i18next";

/* ---------- Types ---------- */
interface DayActivity {
  day: number;
  title: string;
  location?: { lat: number; lng: number };
  activities: string[];
  stay: string;
  meals: string;
}

interface TravelDayMapProps {
  day: DayActivity;
  allDays: DayActivity[];
  isSelected?: boolean;
  currentDayIndex: number;
}

/* ---------- Constants ---------- */
const containerStyle = { width: "100%", height: "100%" };

/* Adventure gradient stops */
const GRADIENT_STOPS = [
  { r: 3, g: 86, b: 40 }, // dark green (#035628)
  { r: 16, g: 97, b: 59 }, // forest-ish (#10613B)
  { r: 100, g: 67, b: 30 }, // mountain brown (#64431E)
  { r: 133, g: 187, b: 243 }, // sky blue (#85BBF3)
];

/* Map options */
const MAP_OPTIONS: google.maps.MapOptions = {
  disableDefaultUI: false,
  zoomControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  zoomControlOptions: {
    position: 8, // RIGHT_BOTTOM
  },
  mapTypeControlOptions: {
    position: 9, // BOTTOM_RIGHT
  },
};

/* ---------- Helpers ---------- */
function interpColor(
  c1: { r: number; g: number; b: number },
  c2: { r: number; g: number; b: number },
  t: number
) {
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const b = Math.round(c1.b + (c2.b - c1.b) * t);
  return `rgb(${r},${g},${b})`;
}

function colorForPosition(t: number) {
  const n = GRADIENT_STOPS.length;
  const scaled = t * (n - 1);
  const idx = Math.floor(scaled);
  const localT = Math.min(1, Math.max(0, scaled - idx));
  if (idx >= n - 1)
    return `rgb(${GRADIENT_STOPS[n - 1].r},${GRADIENT_STOPS[n - 1].g},${GRADIENT_STOPS[n - 1].b})`;
  return interpColor(GRADIENT_STOPS[idx], GRADIENT_STOPS[idx + 1], localT);
}

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

/* ---------- SVG markers ---------- */
const pulsingMarkerSvg = encodeURI(
  `<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'>
    <defs>
      <radialGradient id='g' cx='50%' cy='40%'>
        <stop offset='0%' stop-color='rgba(255,80,80,0.95)'/>
        <stop offset='60%' stop-color='rgba(255,80,80,0.6)' />
        <stop offset='100%' stop-color='rgba(255,80,80,0.0)' />
      </radialGradient>
    </defs>
    <g transform='translate(40,40)'>
      <circle r='6' fill='white' />
      <circle r='12' fill='url(#g)'>
        <animate attributeName='r' from='8' to='28' dur='1.4s' repeatCount='indefinite' />
        <animate attributeName='opacity' from='0.9' to='0.0' dur='1.4s' repeatCount='indefinite' />
      </circle>
      <circle r='8' fill='#ef4444' stroke='white' stroke-width='2' />
    </g>
  </svg>`
);

const pulsingMarkerDataUrl = `data:image/svg+xml;utf8,${pulsingMarkerSvg}`;

/* ---------- Component ---------- */
const TravelDayMap: React.FC<TravelDayMapProps> = ({
  day,
  allDays,
  currentDayIndex,
}) => {
  const {t} = useTranslation()
  const mapRef = useRef<google.maps.Map | null>(null);
  const animRef = useRef<number | null>(null);
  const prevDayIndexRef = useRef<number>(currentDayIndex);

  const [selectedDay, setSelectedDay] = useState<DayActivity | null>(null);
  const [animProgress, setAnimProgress] = useState<number>(1);

  // Use unified styling hook
  const { mapStyles, isDarkMode } = useMapStyling({
    mapRef,
    hasInfoWindow: !!selectedDay,
  });

  // Track all visited locations up to current day
  const visitedLocations = useMemo(() => {
    return allDays
      .slice(0, currentDayIndex + 1)
      .filter((d) => d.location)
      .map((d) => new google.maps.LatLng(d.location!.lat, d.location!.lng));
  }, [allDays, currentDayIndex]);

  // Build dense path for smooth animation
  const densePath = useMemo(() => {
    const SP_PER_SEGMENT = 20;
    const points: google.maps.LatLng[] = [];

    for (let i = 0; i < visitedLocations.length; i++) {
      const a = visitedLocations[i];
      points.push(a);
      if (i < visitedLocations.length - 1) {
        const b = visitedLocations[i + 1];
        for (let s = 1; s < SP_PER_SEGMENT; s++) {
          const t = s / SP_PER_SEGMENT;
          const lat = a.lat() + (b.lat() - a.lat()) * t;
          const lng = a.lng() + (b.lng() - a.lng()) * t;
          points.push(new google.maps.LatLng(lat, lng));
        }
      }
    }
    return points;
  }, [visitedLocations]);

  // Animated path based on progress
  const animatedPath = useMemo(() => {
    if (!densePath || densePath.length === 0) return [];
    if (densePath.length === 1) return [densePath[0]];

    const targetIdx = Math.floor(animProgress * (densePath.length - 1));
    const localT = animProgress * (densePath.length - 1) - targetIdx;

    const basePoints = densePath.slice(0, targetIdx + 1);

    if (localT > 0 && targetIdx < densePath.length - 1) {
      const start = densePath[targetIdx];
      const end = densePath[targetIdx + 1];
      const lat = start.lat() + (end.lat() - start.lat()) * localT;
      const lng = start.lng() + (end.lng() - start.lng()) * localT;
      basePoints.push(new google.maps.LatLng(lat, lng));
    }

    return basePoints;
  }, [densePath, animProgress]);

  /* ---------- PROGRESSIVE Animation ---------- */
  useEffect(() => {
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }

    if (!densePath || densePath.length === 0) {
      setAnimProgress(0);
      prevDayIndexRef.current = currentDayIndex;
      return;
    }

    if (densePath.length === 1) {
      setAnimProgress(1);
      prevDayIndexRef.current = currentDayIndex;
      return;
    }

    const prevDayIndex = prevDayIndexRef.current;
    const isBackward = currentDayIndex < prevDayIndex;
    const isForward = currentDayIndex > prevDayIndex;

    const prevLocCount = allDays
      .slice(0, prevDayIndex + 1)
      .filter((d) => d.location).length;

    const prevDenseLen =
      prevLocCount > 1 ? (prevLocCount - 1) * 20 + prevLocCount : prevLocCount;

    const startProgress =
      prevDenseLen > 0 ? Math.min(prevDenseLen / densePath.length, 1) : 0;

    if (isBackward) {
      const DURATION = 1500;
      const startTime = Date.now();
      const startPos = animProgress;
      const targetProgress = 1;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const rawT = Math.min(elapsed / DURATION, 1);
        const easedT = easeInOut(rawT);

        const newProgress = startPos + (targetProgress - startPos) * easedT;
        setAnimProgress(newProgress);

        if (rawT < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          prevDayIndexRef.current = currentDayIndex;
        }
      };

      animate();
    } else if (isForward && prevDayIndex >= 0) {
      const DURATION = 1500;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const rawT = Math.min(elapsed / DURATION, 1);
        const easedT = easeInOut(rawT);

        const newProgress = startProgress + (1 - startProgress) * easedT;
        setAnimProgress(newProgress);

        if (rawT < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          prevDayIndexRef.current = currentDayIndex;
        }
      };

      animate();
    } else {
      const DURATION = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const rawT = Math.min(elapsed / DURATION, 1);
        const easedT = easeInOut(rawT);

        setAnimProgress(easedT);

        if (rawT < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          prevDayIndexRef.current = currentDayIndex;
        }
      };

      animate();
    }

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [currentDayIndex, densePath, allDays]);

  /* ---------- Auto-fit bounds ---------- */
  useEffect(() => {
    if (!mapRef.current) return;

    if (!visitedLocations || visitedLocations.length === 0) {
      if (day?.location) {
        mapRef.current.panTo(
          new google.maps.LatLng(day.location.lat, day.location.lng)
        );
        mapRef.current.setZoom(7);
      }
      return;
    }

    const bounds = new google.maps.LatLngBounds();
    visitedLocations.forEach((p) => bounds.extend(p));

    mapRef.current.fitBounds(bounds, {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    });

    if (visitedLocations.length === 1) {
      setTimeout(() => mapRef.current?.setZoom(10), 100);
    }
  }, [visitedLocations, day]);

  /* ---------- Gradient segments ---------- */
  const gradientSegments = useMemo(() => {
    const segments: {
      path: google.maps.LatLng[];
      color: string;
      opacity: number;
    }[] = [];
    if (!densePath || densePath.length < 2) return segments;

    const totalCount = densePath.length - 1;
    const visibleCount = Math.floor(animProgress * totalCount);

    for (let i = 0; i < densePath.length - 1; i++) {
      const t = i / totalCount;
      const color = colorForPosition(t);
      const opacity = i <= visibleCount ? 1 : 0.15;

      segments.push({
        path: [densePath[i], densePath[i + 1]],
        color,
        opacity,
      });
    }

    return segments;
  }, [densePath, animProgress]);

  const defaultCenter = useMemo(
    () =>
      day.location
        ? { lat: day.location.lat, lng: day.location.lng }
        : { lat: 28.6139, lng: 77.209 },
    [day]
  );

  /* ---------- Render ---------- */
  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={7}
      onLoad={(map) => {
        mapRef.current = map;
      }}
      options={{
        ...MAP_OPTIONS,
        gestureHandling: "greedy",
        styles: [
          ...(mapStyles || []), // Keep dark/light mode
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "transit",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          }, // cities
          {
            featureType: "administrative.province",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          }, // states
        ],
      }}
    >
      {/* Gradient segments */}
      {gradientSegments.map((seg, idx) => (
        <Polyline
          key={`seg-${idx}`}
          path={seg.path}
          options={{
            strokeColor: seg.color,
            strokeOpacity: seg.opacity,
            strokeWeight: 5,
            geodesic: true,
          }}
        />
      ))}

      {/* Trail effect */}
      {animatedPath.length > 1 && (
        <Polyline
          path={animatedPath}
          options={{
            strokeColor: "#ef4444",
            strokeOpacity: 0.9,
            strokeWeight: 3,
            geodesic: true,
          }}
        />
      )}

      {/* Day markers */}
      {visitedLocations.map((pos, idx) => {
        const dayData = allDays.slice(0, currentDayIndex + 1).filter(d => d.location)[idx];
        const isCurrent = idx === visitedLocations.length - 1 && animProgress >= 0.95;

        const icon = {
          url: isCurrent
            ? pulsingMarkerDataUrl
            : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: isCurrent
            ? new google.maps.Size(40, 40)
            : new google.maps.Size(32, 32),
          anchor: isCurrent
            ? new google.maps.Point(20, 20)
            : new google.maps.Point(16, 16),
        };

        const withLabelIcon = {
          ...icon,
          labelOrigin: new google.maps.Point(16, -10),
        };

        return (
          <Marker
            key={`m-${idx}`}
            position={pos}
            onClick={() => setSelectedDay(dayData)}
            icon={withLabelIcon as any}
            label={{
              text: isCurrent ? `${t("day")}  ${dayData.day}: ${dayData.title}` : `${t("day")}  ${dayData.day}`,
              color: isDarkMode ? "#ffffff" : "black",
              fontSize: isCurrent ? "12px" : "11px",
              fontWeight: "700",
            }}
            zIndex={isCurrent ? 999 : undefined}
          />
        );
      })}

      {/* Road trip truck */}
      {animatedPath.length > 0 && (
        <Marker
          position={animatedPath[animatedPath.length - 1]}
          icon={{
            url: TruckIcon,
            scaledSize: new google.maps.Size(86, 36),
            anchor: new google.maps.Point(53, 28),
          }}
          zIndex={1000}
        />
      )}

      {selectedDay?.location && (
        <InfoWindow
          position={
            new google.maps.LatLng(
              selectedDay.location.lat,
              selectedDay.location.lng
            )
          }
          onCloseClick={() => setSelectedDay(null)}
        >
          <DayWiseTimelineCard
            day={selectedDay.day} // ✅ Use selectedDay
            title={selectedDay.title} // ✅ Use selectedDay
          />
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(TravelDayMap);
