// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// const AuthContext = createContext();
// import { toast } from "react-toastify";

// const AuthContextProvider = ({ children }) => {
//   const url = "http://localhost:3000";

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [profileDetails, setProfileDetails] = useState({
//     name: "",
//   });

//   const [location, setLocation] = useState({ name: "Select location" });
//   console.log(location);
//   const [restaurantsByLocation, setRestaurantsByLocation] = useState([]);
//   const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);
//   const [cart, setCart] = useState({}); // Track added menu items

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cartItems");

//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cart));
//     console.log("cartItems", cart);
//   }, [cart]);

//   // console.log(location)
//   useEffect(() => {
//     const savedLocation = localStorage.getItem("userLocation");
//     if (savedLocation) {
//       try {
//         const parsedLocation = JSON.parse(savedLocation); // Parse JSON string
//         setLocation(parsedLocation); // Update the state
//       } catch (error) {
//         console.error("Error parsing location from localStorage:", error);
//       }
//     } else {
//       handleDetectLocation();
//     }
//   }, []);

//   useEffect(() => {
//     let locationParam = location;

//     const fetchRestaurants = async () => {
//       try {
//         // Fetch all restaurants by location
//         const response = await axios.get(
//           `${url}/restaurent/getRestaurentsByLocation`,
//           {
//             params: { locationParam },
//           }
//         );
//         // if (response.data.data.length === 0) {
//         //   console.log("No restaurants found, retrying...");
//         //   fetchRestaurants();
//         //   return;
//         // }
//         if (response.data.data === 0) {
//           fetchRestaurants();
//         }

//         setRestaurantsByLocation(response.data.data || []);
//         console.log("All Restaurants:", response.data.data);
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.log("No restaurants found for this location.");
//           setRestaurantsByLocation([]);
//         } else {
//           console.error("Error fetching restaurants:", error);
//         }
//       }
//     };

//     const fetchTopRestaurants = async () => {
//       try {
//         // Fetch top-rated restaurants by location
//         const topRatedResponse = await axios.get(
//           `${url}/restaurent/getTopRatedRestaurent`,
//           {
//             params: {
//               locationParam,
//               sortBy: "rating", // Assuming the backend supports this parameter
//               limit: 5, // Assuming the backend can limit results
//             },
//           }
//         );

//         if (
//           topRatedResponse.data.message === "No restaurent found." ||
//           topRatedResponse.data.message ===
//             "Invalid or missing location parameter. Please provide a valid location."
//         ) {
//           setTopRatedRestaurants([]);
//         } else {
//           setTopRatedRestaurants(topRatedResponse.data.data || []);
//           console.log("Top Rated Restaurants:", topRatedResponse.data.data);
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.log("No top-rated restaurants found for this location.");
//           setTopRatedRestaurants([]);
//         } else {
//           console.error("Error fetching top-rated restaurants:", error);
//         }
//       }
//     };

//     fetchTopRestaurants();
//     fetchRestaurants();
//   }, [location]);
//   // Check authentication status on app load
//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const response = await axios.get(`${url}/auth/check`, {
//           withCredentials: true, // Ensures cookies are sent in the request
//         });
//         // console.log("Auth check response:", response.data);

//         if (response.data.authenticated) {
//           // const resp = await axios.get(`{url}/auth/getTokenExpiry`, {
//           //   withCredentials: true,
//           // });
//           // console.log(resp.data.data);
//           // setInterval(() => {
//             // checkAuthStatus();
//           // }, 6000); // Check every 5 minutes
//           // return () => clearInterval(interval); // Cleanup interval on component unmount
//           setIsAuthenticated(true);
//           await getProfileDetails(); // Fetch profile details if authenticated
//         } else {
//           setIsAuthenticated(false);
//           toast.error("Session Exipred");
//         }
//       } catch (error) {
//         setIsAuthenticated(false); // User is not authenticated
//       }
//     };
//     // const interval = setInterval(() => {
//     checkAuthStatus();
//     // }, 6000); // Check every 5 minutes

//     // return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [isAuthenticated]);

//   useEffect(() => {
//     console.log(isAuthenticated, "auth");
//   }, [isAuthenticated]);

//   const getProfileDetails = async () => {
//     try {
//       const response = await axios.get(`${url}/user/profileDetails`, {
//         withCredentials: true,
//       });
//       // console.log("Profile details:", response.data);

//       // Update profile details state if data is available
//       if (response.data && response.data.data.name) {
//         setProfileDetails((prevDetails) => ({
//           ...prevDetails,
//           name: response.data.data.name,
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching profile details:", error);
//     }
//   };
//   // console.log(profileDetails.name);

//   const logout = () => {
//     setIsAuthenticated(false);
//     setProfileDetails({});
//   };

//   const handleDetectLocation = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const newLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           try {
//             // Await fetchLocationName to get the resolved value
//             const locationName = await fetchLocationName(
//               newLocation.lat,
//               newLocation.lng
//             );

//             // console.log("Resolved location name:", locationName); // Log resolved value
//             const locationData = {
//               ...newLocation,
//               displayName: locationName,
//             };

//             setLocation(locationData);
//             console.log(location, "loca");
//             // Save both lat/lng and readable location
//             localStorage.setItem("userLocation", JSON.stringify(locationData)); // Store as JSON

//             toast.success(`Location detected: ${locationData.displayName}`);
//           } catch (error) {
//             console.error("Error detecting location:", error);
//             toast.error("Failed to retrieve location name.");
//           }
//         },
//         (error) => {
//           if (error.code === error.PERMISSION_DENIED) {
//             toast.error("Please enable location access in your browser.");
//           } else {
//             toast.error(
//               "Failed to detect location. Please allow location access."
//             );
//           }
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by your browser.");
//     }
//   };

//   const fetchLocationName = async (lat, lng) => {
//     const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;

//     try {
//       const response = await axios.get(url);
//       console.log(response, "abc");
//       if (response.data && response.data.address) {
//         if (response.data.address.suburb) {
//           return response.data.address.suburb;
//         } else if (response.data.address.village) {
//           return response.data.address.village;
//         }
//       } else {
//         throw new Error("No address found for the given coordinates.");
//       }
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       return "Unknown location";
//     }
//   };

//   const contextValue = {
//     isAuthenticated,
//     setIsAuthenticated,
//     profileDetails,
//     setProfileDetails,
//     logout,
//     location,
//     setLocation,
//     handleDetectLocation,
//     fetchLocationName,
//     restaurantsByLocation,
//     topRatedRestaurants,
//     cart,
//     setCart,
//   };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };
// const useAuth = () => {
//   return useContext(AuthContext);
// };

// export { AuthContext, AuthContextProvider, useAuth };

// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { Navigate } from "react-router-dom";

// const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//   const url = "http://localhost:3000";

//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [profileDetails, setProfileDetails] = useState({ name: "" });
//   const [location, setLocation] = useState(null);
//   const [restaurantsByLocation, setRestaurantsByLocation] = useState([]);
//   const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);
//   const [cart, setCart] = useState({});
//   const [loadingLocation, setLoadingLocation] = useState(true);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cartItems");
//     if (savedCart) setCart(JSON.parse(savedCart));
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cart));
//   }, [cart]);

//   useEffect(() => {
//     const savedLocation = localStorage.getItem("userLocation");
//     if (savedLocation) {
//       try {
//         setLocation(JSON.parse(savedLocation));
//       } catch (error) {
//         console.error("Error parsing location from localStorage:", error);
//       }
//     } else {
//       handleDetectLocation();
//     }
//     setLoadingLocation(false);
//   }, []);

//   useEffect(() => {
//     if (!location || loadingLocation) return;

//     const fetchRestaurants = async () => {
//       try {
//         let locationParam = location;
//         const { data } = await axios.get(
//           `${url}/restaurent/getRestaurentsByLocation`,
//           {
//             params: { locationParam },
//           }
//         );
//         setRestaurantsByLocation(data.data || []);
//       } catch (error) {
//         console.error("Error fetching restaurants:", error);
//       }
//     };

//     const fetchTopRestaurants = async () => {
//       try {
//         let locationParam = location;
//         const { data } = await axios.get(
//           `${url}/restaurent/getTopRatedRestaurent`,
//           {
//             params: {
//               locationParam,
//               sortBy: "rating",
//               limit: 5,
//             },
//           }
//         );
//         setTopRatedRestaurants(data.data || []);
//       } catch (error) {
//         console.error("Error fetching top-rated restaurants:", error);
//       }
//     };

//     fetchRestaurants();
//     fetchTopRestaurants();
//   }, [location, loadingLocation]);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         const { data } = await axios.get(`${url}/auth/check`, {
//           withCredentials: true,
//         });
//         setIsAuthenticated(data.authenticated);
//         if (data.authenticated) await getProfileDetails();
//         console.log(isAuthenticated, "auth");
//       } catch {
//         setIsAuthenticated(false);
//         toast.error("Session Expired");
//       }
//     };
//     checkAuthStatus();
//   }, [isAuthenticated]);

//   const getProfileDetails = async () => {
//     try {
//       const { data } = await axios.get(`${url}/user/profileDetails`, {
//         withCredentials: true,
//       });
//       if (data?.data?.name) setProfileDetails({ name: data.data.name });
//     } catch (error) {
//       console.error("Error fetching profile details:", error);
//     }
//   };

//   const fetchLocationName = async (lat, lng) => {
//     try {
//       const { data } = await axios.get(
//         `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
//       );
//       return (
//         data?.address?.suburb || data?.address?.village || "Unknown location"
//       );
//     } catch (error) {
//       console.error("Error fetching location:", error);
//       return "Unknown location";
//     }
//   };

//   const handleDetectLocation = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const newLocation = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           try {
//             const locationName = await fetchLocationName(
//               newLocation.lat,
//               newLocation.lng
//             );
//             const locationData = { ...newLocation, displayName: locationName };
//             setLocation(locationData);
//             localStorage.setItem("userLocation", JSON.stringify(locationData));
//             toast.success(`Location detected: ${locationData.displayName}`);
//           } catch (error) {
//             console.error("Error detecting location:", error);
//             toast.error("Failed to retrieve location name.");
//           }
//         },
//         (error) => {
//           if (error.code === error.PERMISSION_DENIED) {
//             toast.error("Please enable location access in your browser.");
//           } else {
//             toast.error(
//               "Failed to detect location. Please allow location access."
//             );
//           }
//         }
//       );
//     } else {
//       toast.error("Geolocation is not supported by your browser.");
//     }
//   };
//   const logout = async () => {
//     try {
//       console.log("logout context triggered");
//       const response = await axios.get(url + "/user/logOutUser", {
//         withCredentials: true,
//       });
//       console.log(response.data.message)
//       if (response.data.message === "Successfully logged out") {
//         toast.success(response.data.message);

//         setIsAuthenticated(false);
//         console.log(isAuthenticated, "last auth ");
//         setProfileDetails({});
//       }
//     } catch (error) {
//       toast.error("Error logging out: " + error.message);
//     }
//   };
//   const contextValue = {
//     isAuthenticated,
//     setIsAuthenticated,
//     profileDetails,
//     setProfileDetails,
//     logout,
//     location,
//     setLocation,
//     handleDetectLocation, // ✅ Included
//     fetchLocationName, // ✅ Included
//     restaurantsByLocation,
//     topRatedRestaurants,
//     cart,
//     setCart,
//   };
//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);
// export { AuthContext, AuthContextProvider, useAuth };

import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const url = "http://localhost:3000";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileDetails, setProfileDetails] = useState({ name: "" });
  const [location, setLocation] = useState(null);
  const [restaurantsByLocation, setRestaurantsByLocation] = useState([]);
  const [topRatedRestaurants, setTopRatedRestaurants] = useState([]);
  const [cart, setCart] = useState({});
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     addCartItemsToDb();
  //   }
  // }, [isAuthenticated]);

  const fetchCartFromDb = async () => {
    try {
      const response = await axios.get(`${url}/cart/getUserCart`, {
        withCredentials: true,
      });

      if (response.data.cart && Array.isArray(response.data.cart.items)) {
        const cartData = response.data.cart.items.reduce((acc, item) => {
          if (item.menuId) {
            acc[item.menuId] = { ...item, _id: item.menuId };
          }
          return acc;
        }, {});

        setCart(cartData);
        localStorage.setItem("cartItems", JSON.stringify(cartData)); // ✅ Sync with localStorage
        console.log(cartData, "✅ Updated cart from fetchCartFromDb");
      } else {
        setCart({});
        localStorage.removeItem("cartItems"); // ✅ Ensure localStorage clears if cart is empty
        console.log("🛑 No items found in cart, setting cart to empty.");
      }
    } catch (error) {
      console.error("❌ Error fetching cart from DB:", error);
    }
  };

  const addCartItemsToDb = async () => {
    try {
      const localStorageCart =
        JSON.parse(localStorage.getItem("cartItems")) || {};

      if (Object.keys(localStorageCart).length === 0) {
        console.log("🛑 LocalStorage cart is empty, skipping API call.");
        return;
      }

      console.log("🟢 Cart being sent to backend:", localStorageCart); // ✅ DEBUGGING LOG

      const response = await axios.post(
        `${url}/cart/itemLocalStorageToDb`,
        { items: localStorageCart }, // 🔴 Ensure items object is sent correctly
        { withCredentials: true }
      );

      console.log("🟢 Cart items added to DB:", response.data);
    } catch (error) {
      console.error("❌ Error adding cart items to DB:", error);
    }
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      try {
        setLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error("Error parsing location:", error);
      }
    } else {
      handleDetectLocation();
    }
    setLoadingLocation(false);
  }, []);

  const fetchRestaurants = useCallback(async () => {
    if (!location) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${url}/restaurent/getRestaurentsByLocation`,
        {
          params: { locationParam: location },
        }
      );
      setRestaurantsByLocation(data.data || []);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  const fetchTopRestaurants = useCallback(async () => {
    if (!location) return;
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${url}/restaurent/getTopRatedRestaurent`,
        {
          params: { locationParam: location, sortBy: "rating", limit: 5 },
        }
      );
      setTopRatedRestaurants(data.data || []);
    } catch (error) {
      console.error("Error fetching top-rated restaurants:", error);
    } finally {
      setIsLoading(false);
    }
  }, [location]);

  useEffect(() => {
    if (!loadingLocation) {
      fetchRestaurants();
      fetchTopRestaurants();
    }
  }, [fetchRestaurants, fetchTopRestaurants, loadingLocation]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { data } = await axios.get(`${url}/auth/check`, {
          withCredentials: true,
        });

        if (data?.token) {
          const decoded = jwt.decode(data.token);
          const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

          if (decoded.exp > currentTime) {
            setIsAuthenticated(data.authenticated);

            scheduleAutoLogout(decoded.exp - currentTime);
          } else {
            logout();
          }
        } else {
          logout();
        }

        if (data.authenticated) {
          await getProfileDetails();
        }
      } catch {
        setIsAuthenticated(false);
        // toast.error("Session Expired");
      }
    };
    checkAuthStatus();
  }, []);

  // const scheduleAutoLogout = (timeRemaining) => {
  //   setTimeout(async() => {
  //     toast.error("🔒 Session expired, logging out...");
  //     await logout();
  //     setIsAuthenticated(false); // Ensure state updates
  //     window.location.reload();
  //   }, timeRemaining * 1000); // Convert seconds to milliseconds
  // };
  const scheduleAutoLogout = (timeRemaining) => {
    setTimeout(async () => {
      toast.error("🔒 Session expired, logging out...");

      await logout(); // ✅ Ensure logout completes before proceeding

      console.log("🛑 Logout complete, waiting before reload...");

      // ✅ Wait a short time before reload to ensure state updates
      setTimeout(() => {
        window.location.reload();
      }, 500); // Small delay (500ms) to allow UI updates
    }, timeRemaining * 1000); // Convert to milliseconds
  };

  const logout = async () => {
    try {
      // ✅ Save cart items before logging out
      await addCartItemsToDb();
      toast.error("🔒 Saving cart & logging out...");

      // ✅ Clear cart from localStorage BEFORE API call
      localStorage.removeItem("cartItems");
      setCart({}); // Reset cart state
      console.log("🛑 Cart cleared from LocalStorage!");

      // ✅ Wait for logout API to complete
      const response = await axios.get(url + "/user/logOutUser", {
        withCredentials: true,
      });

      if (response.data.message === "Successfully logged out") {
        toast.success(response.data.message);

        // ✅ Ensure UI updates before reloading
        setIsAuthenticated(false);
        setProfileDetails({});

        console.log("✅ User logged out successfully!");
      }
    } catch (error) {
      toast.error("Error logging out: " + error.message);
    }
  };

  //     const logout = async () => {
  //       try {
  //         await addCartItemsToDb();
  //         toast.error("🔒 call generated from scheduleAutoLogout");

  //         const response = await axios.get(url + "/user/logOutUser", {
  //           withCredentials: true,
  //         });

  //         if (response.data.message === "Successfully logged out") {
  //           toast.success(response.data.message);
  //           setIsAuthenticated(false);
  //           setProfileDetails({});

  //           // ✅ Clear localStorage
  //           localStorage.removeItem("cartItems");

  //           // ✅ Update cart state to trigger re-render
  //           setCart({});

  //           console.log("🛑 User logged out, cart cleared!");
  //         }
  //       } catch (error) {
  //         toast.error("Error logging out: " + error.message);
  //       }
  //     };
  // };

  const getProfileDetails = async () => {
    try {
      const { data } = await axios.get(`${url}/user/profileDetails`, {
        withCredentials: true,
      });
      if (data?.data?.name) setProfileDetails({ name: data.data.name });
    } catch (error) {
      console.error("Error fetching profile details:", error);
    }
  };

  const fetchLocationName = useCallback(async (lat, lng) => {
    try {
      const { data } = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      return (
        data?.address?.suburb || data?.address?.village || "Unknown location"
      );
    } catch (error) {
      console.error("Error fetching location:", error);
      return "Unknown location";
    }
  }, []);

  const handleDetectLocation = useCallback(async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          try {
            const locationName = await fetchLocationName(
              newLocation.lat,
              newLocation.lng
            );
            const locationData = { ...newLocation, displayName: locationName };
            setLocation(locationData);
            localStorage.setItem("userLocation", JSON.stringify(locationData));
            toast.success(`Location detected: ${locationData.displayName}`);
          } catch (error) {
            console.error("Error detecting location:", error);
            toast.error("Failed to retrieve location name.");
          }
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            toast.error("Please enable location access in your browser.");
          } else {
            toast.error(
              "Failed to detect location. Please allow location access."
            );
          }
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  }, [fetchLocationName]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      setIsAuthenticated,
      profileDetails,
      setProfileDetails,
      location,
      setLocation,
      handleDetectLocation,
      fetchLocationName,
      restaurantsByLocation,
      topRatedRestaurants,
      cart,
      setCart,
      isLoading,
      logout,
      addCartItemsToDb,
      fetchCartFromDb,
    }),
    [
      isAuthenticated,
      profileDetails,

      location,
      restaurantsByLocation,
      topRatedRestaurants,
      cart,
      isLoading,
      fetchLocationName,
      handleDetectLocation,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { AuthContext, AuthContextProvider, useAuth };
