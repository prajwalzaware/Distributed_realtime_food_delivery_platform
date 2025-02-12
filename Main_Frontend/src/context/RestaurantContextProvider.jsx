import { createContext, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Create the context
const RestaurantContext = createContext();

// Create a provider component
const RestaurantContextProvider = ({ children }) => {
  const url = "http://localhost:3000"; // Your backend API URL

  const [restaurantsByLocation, setRestaurantsByLocation] = useState([]);
  const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch restaurants by location (memoized)
  const fetchRestaurants = useCallback(async (locationParam) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/restaurent/getRestaurentsByLocation`, {
        params: { locationParam },
      });
      setRestaurantsByLocation(response.data.data || []);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No restaurants found for this location.");
        setRestaurantsByLocation([]);
      } else {
        toast.error("Failed to fetch restaurants. Please try again later.");
        console.error("Error fetching restaurants:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []); // Memoize the function

  // Fetch top-rated restaurants by location (memoized)
  const fetchTopRatedRestaurants = useCallback(async (locationParam) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${url}/restaurent/getTopRatedRestaurent`, {
        params: {
          locationParam,
          sortBy: "rating",
          limit: 5,
        },
      });

      if (
        response.data.message === "No restaurent found." ||
        response.data.message === "Invalid or missing location parameter. Please provide a valid location."
      ) {
        setTopRatedRestaurants([]);
      } else {
        setTopRatedRestaurants(response.data.data || []);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("No top-rated restaurants found for this location.");
        setTopRatedRestaurants([]);
      } else {
        toast.error("Failed to fetch top-rated restaurants. Please try again later.");
        console.error("Error fetching top-rated restaurants:", error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []); // Memoize the function

  // Context value
  const contextValue = {
    restaurantsByLocation,
    topRatedRestaurants,
    isLoading,
    fetchRestaurants,
    fetchTopRatedRestaurants,
  };

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  );
};

// Custom hook to use the RestaurantContext
const useRestaurant = () => {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used within a RestaurantContextProvider");
  }
  return context;
};

export { RestaurantContext, RestaurantContextProvider, useRestaurant };