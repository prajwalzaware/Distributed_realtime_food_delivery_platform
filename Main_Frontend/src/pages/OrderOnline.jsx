import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
// import itemLocalStorageToDb from "../../../Backend/controller/itemLocalStorageToDb";

const OrderOnline = () => {
  const orderRef = useRef(null);
  const location = useLocation();
  const isFromNavMenu = location.state?.fromMenu;
  const { restaurentDetails } = useOutletContext();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const categoryRefs = useRef({});
  const rightPanelRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const { cart, setCart, isAuthenticated, addCartItemsToDb } =
    useContext(AuthContext);

  const url = "http://localhost:3000";

  useEffect(() => {
    if (!restaurentDetails?._id) {
      setLoading(true);
      return;
    }

    const restaurentId = restaurentDetails._id;
    const getRestauretMenusByRestaurentId = async () => {
      try {
        const response = await axios.get(
          `${url}/restaurent/getRestauretMenusByRestaurentId`,
          { params: { restaurentId } }
        );
        setMenus(response.data.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching menus:", error);
        setError("Failed to load menus. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getRestauretMenusByRestaurentId();
  }, [restaurentDetails._id]);

  useEffect(() => {
    if (!orderRef.current) {
      console.warn("orderRef is not attached to a DOM element");
      return;
    }

    if (!isFromNavMenu) {
      const navHeight = 700;
      const headerOffset = orderRef.current.offsetTop - navHeight;

      window.scrollTo({
        top: headerOffset,
        behavior: "smooth",
      });
    }

    if (isFromNavMenu) {
      const navHeight = 290;
      const headerOffset = orderRef.current.offsetTop - navHeight;

      window.scrollTo({
        top: headerOffset,
        behavior: "smooth",
      });
    }
  }, [isFromNavMenu, menus]);

  // Group menus by category
  const groupedMenus = menus.reduce((acc, menu) => {
    if (!acc[menu.category]) {
      acc[menu.category] = [];
    }
    acc[menu.category].push(menu);
    return acc;
  }, {});

  // Set the first category as active by default
  useEffect(() => {
    if (menus.length > 0) {
      const firstCategory = Object.keys(groupedMenus)[0];
      setActiveCategory(firstCategory);
    }
  }, [menus]);

  // Handle category click
  const handleCategoryClick = (category) => {
    if (categoryRefs.current[category] && rightPanelRef.current) {
      const categoryElement = categoryRefs.current[category];
      const rightPanel = rightPanelRef.current;

      // Calculate the scroll position relative to the right panel
      const scrollPosition = categoryElement.offsetTop - rightPanel.offsetTop;

      // Scroll the right panel to the category section
      rightPanel.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });

      // Set the active category
      setActiveCategory(category);
    }
  };

  

  const handleAddToCart = (menu) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
  
      if (updatedCart[menu._id]) {
        updatedCart[menu._id].quantity += 1;
      } else {
        updatedCart[menu._id] = { ...menu, quantity: 1 };
      }
  
      // Store the updated cart in localStorage (before updating DB)
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  
      return updatedCart;
    });
  };
  
  const handleRemoveFromCart = (menu) => {
    setCart((prevCart) => {
        const updatedCart = { ...prevCart };

        if (updatedCart[menu._id] && updatedCart[menu._id].quantity > 1) {
            updatedCart[menu._id].quantity -= 1;
        } else {
            delete updatedCart[menu._id];
        }

        console.log("🛑 Updated Cart After Removal:", updatedCart); // ✅ DEBUGGING LOG

        // ✅ Remove from localStorage if cart is empty
        if (Object.keys(updatedCart).length === 0) {
            console.log("🛑 Cart is now empty, removing from localStorage...");
            localStorage.removeItem("cartItems");
        } else {
            localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        }

        return updatedCart;
    });
};



  return (
    <div ref={orderRef} className="flex h-screen">
      {/* Always render the orderRef element */}
      {loading ? (
        <div>Loading menus...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          {/* Left Menu */}
          <div className="flex-[1.8] overflow-y-scroll scrollbar-hide max-h-full border-r border-gray-300">
            {Object.keys(groupedMenus).map((category, index) => (
              <div
                key={index}
                className={`p-2 cursor-pointer hover:bg-gray-100 relative ${
                  activeCategory === category ? "border-r-4 border-red-500" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div
            ref={rightPanelRef}
            className="flex-[7] overflow-y-scroll max-h-full pl-5 ml-4 scrollbar-hide"
          >
            {Object.entries(groupedMenus).map(([category, items], index) => (
              <div
                key={index}
                ref={(el) => (categoryRefs.current[category] = el)}
              >
                <h2 className="text-2xl font-bold mb-2">{category}</h2>

                {items.map((menu, itemIndex) => (
                  <div key={itemIndex} className="mb-4">
                    {/* Menu Item Card */}
                    <div className="flex items-center p-4 hover:bg-gray-50 rounded-lg">
                      {/* Image on the Left */}
                      <div className="w-32 h-32 mr-4">
                        <img
                          src={menu.image}
                          alt={menu.menuName}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      {/* Details on the Right */}
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">
                          {menu.menuName}
                        </h3>
                        <p className="text-gray-600 mt-2">{menu.description}</p>
                        <p className="text-gray-800 font-bold mt-2">
                          ₹{menu.price}
                        </p>
                        {menu.isVegetarian && (
                          <span className="text-green-600 text-sm">
                            Vegetarian
                          </span>
                        )}

                        {/* Add/Remove Buttons */}
                        <div className="flex items-center mt-4">
                          <button
                            onClick={() => handleRemoveFromCart(menu)}
                            className="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            -
                          </button>
                          <span className="mx-4 text-lg font-semibold">
                            {cart[menu._id]?.quantity || 0}
                          </span>
                          <button
                            onClick={() => handleAddToCart(menu)}
                            className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            {/* Add extra space at the bottom to ensure the last category is at the top */}
            <div className="h-[calc(100vh-200px)]"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderOnline;
