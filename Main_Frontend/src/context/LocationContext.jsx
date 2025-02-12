import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create the context   
const LocationContext = createContext();

// Create a provider component
const LocationContextProvider = ({ children }) => {
  const [location, setLocation] = useState({ name: "Select location" });

  // Fetch location name from coordinates
  const fetchLocationName = async (lat, lng) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.address) {
        if (response.data.address.suburb) {
          return response.data.address.suburb;
        } else if (response.data.address.village) {
          return response.data.address.village;
        }
      } else {
        throw new Error("No address found for the given coordinates.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Unknown location";
    }
  };

  // Detect user's current location
  const handleDetectLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          try {
            const locationName = await fetchLocationName(newLocation.lat, newLocation.lng);
            const locationData = {
              ...newLocation,
              displayName: locationName,
            };

            setLocation(locationData);
            localStorage.setItem("userLocation", JSON.stringify(locationData));
            toast.success(`Location detected: ${locationName}`);
          } catch (error) {
            console.error("Error detecting location:", error);
            toast.error("Failed to retrieve location name.");
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            toast.error("Please enable location access in your browser.");
          } else {
            toast.error("Failed to detect location. Please allow location access.");
          }
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  // Load saved location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      try {
        const parsedLocation = JSON.parse(savedLocation);
        setLocation(parsedLocation);
      } catch (error) {
        console.error("Error parsing location from localStorage:", error);
      }
    } else {
      handleDetectLocation();
    }
  }, []);

  // Context value
  const contextValue = {
    location,
    setLocation,
    handleDetectLocation,
    fetchLocationName,
  };

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use the LocationContext
const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationContextProvider");
  }
  return context;
};

export { LocationContext, LocationContextProvider, useLocation };