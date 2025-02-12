import assets from "../../assets/assets.js";
import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = ({ clickHandle }) => {
  const url = "http://localhost:3000";
  const {
    location,
    setLocation,
    handleDetectLocation,
    isAuthenticated,
    profileDetails,
    logout,
    cart,
  } = useContext(AuthContext);

  const [showLocationPopover, setShowLocationPopover] = useState(false);
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const [showCartPopover, setShowCartPopover] = useState(false);
  // const [suggestions, setSuggetions] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  const [hoverTimeout, setHoverTimeout] = useState(null);
  const [hoverTimeoutCart, setHoverTimeoutCart] = useState(null);

  const toggleLocationPopover = () => setShowLocationPopover((prev) => !prev);
  // const toggleCartPopover = () => setShowCartPopover((prev) => !prev);

  const handleMouseEnterCart = () => {
    if (hoverTimeoutCart) {
      clearTimeout(hoverTimeoutCart); // Clear any existing timeout to prevent unintended hiding
    }
    setShowCartPopover(true);
  };

  const handleLogOut = async () => {
    logout();
  };

  const handleMouseLeaveCart = () => {
    const timeout = setTimeout(() => {
      setShowCartPopover(false);
    }, 100); // Delay hiding by 300ms
    setHoverTimeoutCart(timeout);
  };

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout); // Clear any existing timeout to prevent unintended hiding
    }
    setShowProfilePopover(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setShowProfilePopover(false);
    }, 100); // Delay hiding by 300ms
    setHoverTimeout(timeout);
  };

  // const handlesetSuggetion = (suggestion) => {
  //   setLocation(suggestion);
  //   toast.success(`Location set to: ${suggestion.name}`);
  //   console.log(suggestion);
  //   localStorage.setItem("userLocation", JSON.stringify(suggestion)); // Save as JSON string
  //   setSearchQuery(""); // Clear the search query
  //   setSuggetions([]);
  // };

  // let debounceTimer;

  // const locAutoCompleteHandler = (e) => {
  //   const query = e;
  //   setSearchQuery(e);
  //   clearTimeout(debounceTimer); // Clear the previous timer
  //   debounceTimer = setTimeout(async () => {
  //     if (query.length < 2 && !query) {
  //       console.log("Enter at least 2 characters to search.");
  //       return [];
  //     }

  //     const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&countrycodes=in&bounded=1`;

  //     try {
  //       const response = await axios.get(url);
  //       console.log("resoponce suggestion:", response.data);
  //       setSuggetions(
  //         response.data.map((loc) => ({
  //           displayName: loc.display_name,
  //           name: loc.name,
  //           suburb: loc.address?.suburb || "",
  //           state_district: loc.address?.state_district || "",
  //           county: loc.address?.county || "",
  //           city: loc.address?.city || "",
  //         }))
  //       );
  //       // console.log("sugge",suggestions)
  //     } catch (error) {
  //       console.error("Error fetching location suggestions:", error);
  //     }
  //   }, 10); // Debounce delay set to 300ms
  // };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debounceTimer = useRef(null);

  const handlesetSuggetion = (suggestion) => {
    setLocation(suggestion);
    toast.success(`Location set to: ${suggestion.displayName}`);
    localStorage.setItem("userLocation", JSON.stringify(suggestion)); // Save as JSON string
    setSearchQuery(""); // Clear search input
    setSuggestions([]);
  };

  const locAutoCompleteHandler = useCallback((query) => {
    setSearchQuery(query);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current); // Clear previous timer
    }

    debounceTimer.current = setTimeout(async () => {
      if (!query || query.length < 2) {
        console.log("Enter at least 2 characters to search.");
        setSuggestions([]);
        return;
      }

      try {
        const { data } = await axios.get(
          `https://nominatim.openstreetmap.org/search`,
          {
            params: {
              q: query,
              format: "json",
              addressdetails: 1,
              countrycodes: "in",
              bounded: 1,
            },
          }
        );

        setSuggestions(
          data.map((loc) => ({
            displayName: loc.display_name,
            name:
              loc.name || loc.address?.city || loc.address?.state || "Unknown",
            suburb: loc.address?.suburb || "",
            state_district: loc.address?.state_district || "",
            county: loc.address?.county || "",
            city: loc.address?.city || "",
          }))
        );
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    }, 300);
  }, []);

  return (
    <div className="main_div mt-2 flex items-center gap-5">
      {/* Logo */}
      <div className="Navbar_logo_wrapper">
        <Link to="/">
          <img
            className="Navbar_logo w-40 mt-1"
            src={assets.EazyEat_logo}
            alt="EazyEats Logo"
          />
        </Link>
      </div>

      {/* Location and Search */}
      <div className="Navbar_locationAndSearch_wrapper w-7/12 flex flex-row gap-2 p-3 items-center border border-solid rounded-md shadow-md">
        <img
          className="location_logo w-4 opacity-80"
          src={assets.location_svg}
          alt="Location Icon"
        />
        <div className="Navbar_locationAndSearch relative">
          <input
            type="text"
            value={searchQuery}
            className="outline-none w-24 placeholder:text-md placeholder:text-gray-400"
            placeholder={
              location?.displayName || location?.name || "Select Location"
            } ////
            onChange={(e) => locAutoCompleteHandler(e.target.value)}
            onFocus={toggleLocationPopover}
            onBlur={() => setTimeout(() => setShowLocationPopover(false), 300)} // Delay to handle click inside dropdown
          />
          {showLocationPopover && (
            <div
              style={{ left: "155px" }}
              className="absolute top-full mt-4 transform -translate-x-1/2 w-96 bg-white border border-gray-200 rounded-lg shadow-lg p-4"
            >
              {suggestions.length === 0 || searchQuery.length === 0 ? (
                // Only display this component when suggestions array is empty
                <ul className="list-none p-0 m-0">
                  <li
                    className="text-custom-red cursor-pointer flex gap-2 mt-2 mb-2"
                    onClick={handleDetectLocation}
                  >
                    <img src={assets.detect_location} alt="Detect Location" />
                    <p className="text-lg">Detect Current Location</p>
                  </li>
                </ul>
              ) : (
                // Display suggestions when suggestions array has items
                <div className="max-h-48 overflow-y-auto">
                  <ul className="m-0">
                    {suggestions.map((suggestion, index) => (
                      <li
                        className="text-gray-800 font-md hover:bg-gray-100 cursor-pointer p-4 flex gap-2 mt-2 mb-2"
                        key={index}
                        onClick={() => handlesetSuggetion(suggestion)}
                      >
                        <div>
                          <span className="font-bold">
                            {suggestion.displayName}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        <hr className="border h-6 ml-2" />
        <div className="Search flex flex-row gap-2 items-center ml-2">
          <img className="w-6" src={assets.search_logo} alt="Search Icon" />
          <input
            className="w-80 outline-none placeholder:text-md placeholder:text-gray-400"
            type="text"
            placeholder="Search for restaurant, cuisine, or a dish"
          />
        </div>
      </div>

      {/* Right Navbar Options */}

      <div className="right_navbar flex text-center items-center  gap-4">
        {/* Offers */}
        <div className="flex gap-1 hover:scale-105 duration-200">
          <img className="w-7" src={assets.offers} alt="Offers Icon" />
          <p className="text-lg">Offers</p>
        </div>
        {/* Cart */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnterCart} // Attach to the parent
          onMouseLeave={handleMouseLeaveCart} // Attach to the parent
        >
          {/* Cart Icon */}
          <div className="flex gap-1 items-center hover:scale-105 duration-200 cursor-pointer">
            <img className="w-7" src={assets.cart_icon} alt="Cart Icon" />
            <p className="text-lg">Cart</p>
          </div>

          {/* Popover */}
          {showCartPopover && (
            <div className=" absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-64 bg-white  border border-gray-200 rounded-md shadow-lg p-4">
              {/* Popover Arrow */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>

              {/* Popover Content */}
              <div className="flex flex-col space-y-4">
                {Object.keys(cart).length === 0 ? (
                  // Empty Cart Message
                  <div className="text-center p-4">
                    <p className="font-bold text-lg text-gray-800 mb-2">
                      Your cart is empty.
                    </p>
                    <p className="text-sm text-gray-600">
                      Good food is always cooking! Go ahead, order some yummy
                      items from the menu.
                    </p>
                  </div>
                ) : (
                  // Cart Items
                  Object.keys(cart).map((itemId) => (
                    <div key={itemId} className="flex items-start space-x-4">
                      {/* Product Image */}
                      <img
                        className="w-16 h-16 object-cover rounded-lg"
                        src={cart[itemId].image}
                        alt={cart[itemId].name}
                      />

                      {/* Product Details */}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {cart[itemId].name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {cart[itemId].quantity}
                        </p>
                        <p className="text-sm text-gray-600">
                          Price: ${cart[itemId].price}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Button (Optional) */}
              {Object.keys(cart).length > 0 && (
                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Proceed to Checkout
                </button>
              )}
            </div>
          )}
        </div>

        {/* Profile / Auth */}

        <div
          className="relative"
          onMouseEnter={handleMouseEnter} // Attach to the parent
          onMouseLeave={handleMouseLeave} // Attach to the parent
        >
          {isAuthenticated ? (
            // Authenticated User: Show profile icon and name
            <div className="flex gap-1 items-center hover:scale-105 duration-200 cursor-pointer">
              <i
                className="fa-regular fa-user text-custom-red"
                style={{ fontSize: "20px", marginTop: "2px" }}
              ></i>
              <p className="text-lg text-custom-red">
                {profileDetails?.name?.split(" ")[0] || "User"}
              </p>
            </div>
          ) : (
            // Unauthenticated User: Show Sign In button
            <div
              className="flex gap-1 items-center hover:scale-105 duration-200 cursor-pointer"
              onClick={clickHandle} // Directly open sign-in window on click
            >
              <i
                className="fa-regular fa-user text-gray-800"
                style={{ fontSize: "20px", marginTop: "2px" }}
              ></i>
              <p className="text-lg">Sign In</p>
            </div>
          )}

          {/* Popover for Authenticated Users */}
          {isAuthenticated && showProfilePopover && (
            <div className=" absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
              {/* Popover Arrow */}
              <div className="absolute  top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>

              {/* Popover Content */}
              <div className="flex flex-col items-center justify-center">
                <button className="text-red-500 hover:text-red-600">
                  Profile
                </button>
                <button className="text-red-500 hover:text-red-600">
                  Orders
                </button>
                <button className="text-red-500 hover:text-red-600">
                  Orders
                </button>
                <button className="text-red-500 hover:text-red-600">
                  Orders
                </button>
                <button className="text-red-500 hover:text-red-600">
                  Orders
                </button>
                <button className="text-red-500 hover:text-red-600">
                  Orders
                </button>

                <button className="text-red-500 hover:text-red-600">
                  Favourites
                </button>
                <button
                  onClick={handleLogOut}
                  className="text-red-500 hover:text-red-600"
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
