import React, { useEffect, useRef, useState } from "react";
import { Searchbar } from "../Searchbar";
import { DropdownList } from "../ui/DropdownList/DropDown";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
import { User, X } from "lucide-react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { UnauthenticatedProfile } from "../../pages/Profile/UnauthenticatedProfile";
import { useNavigate } from "react-router-dom";

interface MapAutocompleteProps {
  onPlaceSelect: (
    lat: number,
    lng: number,
    name: string,
    zoom?: number
  ) => void;
}

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const MapAutocomplete: React.FC<MapAutocompleteProps> = ({ onPlaceSelect }) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const serviceRef = useRef<google.maps.places.AutocompleteService>(null);
  const detailsServiceRef = useRef<google.maps.places.Place>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

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

  const handleClosePopup = () => {
    setShowPopup(false);
  };
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
      setActiveIndex(
        (prev) => (prev - 1 + suggestions.length) % suggestions.length
      );
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
    <div className=" z-1000 w-full max-w-4xl">
      <div className="flex w-full items-center gap-3  py-0 ">
        {/* 🔍 Searchbar — full width */}
        <div className="flex-1">
          <Searchbar
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClear={clearSearch}
            placeholder={t("searchPlaceholder")}
          />
        </div>
        {/* 👤 User Icon or Profile Picture */}
        {isAuthenticated ? (
          <div onClick={() => navigate("/profile")} className="flex-shrink-0">
            <img
              src={user?.picture}
              alt="User"
              className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 hover:scale-105 transition"
            />
          </div>
        ) : (
          <User
            className="w-7 h-7 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-blue-500 flex-shrink-0"
            onClick={() => setShowPopup(true)}
          />
        )}
      </div>

      {suggestions.length > 0 && (
        <DropdownList
          items={suggestions}
          activeIndex={activeIndex}
          onItemClick={selectSuggestion}
          onItemHover={setActiveIndex}
          renderItem={(s) => s.description}
        />
      )}

      {/* ⚡ Popup for unauthenticated users */}
      {showPopup &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-md"
            onClick={handleClosePopup}
          >
            <motion.div
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 max-w-lg w-[90%]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <UnauthenticatedProfile
                getShowSkip={true}
                onShowSkipButton={handleClosePopup}
              />
              <button
                onClick={handleClosePopup}
                className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default MapAutocomplete;
