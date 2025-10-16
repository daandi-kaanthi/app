import React, { useEffect, useRef, useState } from "react";
import { Searchbar } from "../Searchbar";
import { DropdownList } from "../ui/DropdownList/DropDown";
import { useTranslation } from "react-i18next";

interface MapAutocompleteProps {
  onPlaceSelect: (lat: number, lng: number, name: string, zoom?: number) => void;
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapAutocomplete: React.FC<MapAutocompleteProps> = ({ onPlaceSelect }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const serviceRef = useRef<google.maps.places.AutocompleteService>(null);
  const detailsServiceRef = useRef<google.maps.places.Place>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Google Places services
  useEffect(() => {
    const initServices = async () => {
      await google.maps.importLibrary("places");
      serviceRef.current = new google.maps.places.AutocompleteService();
      detailsServiceRef.current = new google.maps.places.Place(
        document.createElement("div")
      );
    };
    initServices();
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);

    if (value && serviceRef.current) {
      serviceRef.current.getPlacePredictions(
        { input: value, language: i18n.language }, // <-- Pass current language here
        (predictions) => setSuggestions(predictions || [])
      );
    } else {
      setSuggestions([]);
    }
  };

  // Accurate place selection using Google Geocoding API
  const selectSuggestion = async (s: any) => {
    try {
      if (!googleMapsApiKey) {
        console.error("Google Maps API key missing");
        return;
      }

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${s.place_id}&key=${googleMapsApiKey}&language=${i18n.language}` // <-- i18n language here
      );

      const data = await response.json();

      if (data.status === "OK" && data.results.length > 0) {
        const result = data.results[0];
        const lat = result.geometry.location.lat;
        const lng = result.geometry.location.lng;
        const name = result.formatted_address || s.description;
        const zoom = 14;

        onPlaceSelect(lat, lng, name, zoom);
        setQuery(result.formatted_address);
        setSuggestions([]);
        setActiveIndex(-1);
      } else {
        console.error("No valid geocoding result found:", data.status);
      }
    } catch (error) {
      console.error("Error fetching geolocation:", error);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) selectSuggestion(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setActiveIndex(-1);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    inputRef.current?.focus();
  };

  return (
    <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-md px-4">
      <Searchbar
        ref={inputRef}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onClear={clearSearch}
        placeholder={t("searchPlaceholder")}
      />
      {suggestions.length > 0 && (
        <DropdownList
          items={suggestions}
          activeIndex={activeIndex}
          onItemClick={selectSuggestion}
          onItemHover={setActiveIndex}
          renderItem={(s) => s.description}
        />
      )}
    </div>
  );
};

export default MapAutocomplete;
