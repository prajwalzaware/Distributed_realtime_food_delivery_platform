
import { useContext, useEffect, useState, useRef } from "react";
import {  Outlet, useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import assets from "../../assets/assets";

const GetFoodRestaurentDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { location: authLocation } = useContext(AuthContext);
  const url = "http://localhost:3000";

  const { item, restaurentId } = useParams();
  const [restaurentDetails, setRestaurentDetails] = useState({ images: [] });
  const menuRefs = useRef([]);

  const menuItems = [
    { name: "Overview", path: "overview" },
    { name: "Order Online", path: "order-online" },
    { name: "Reviews", path: "reviews" },
    { name: "Photos", path: "photos" },
    { name: "Menu", path: "menu" },
  ];

  // Set default menu to "Order Online" without scroll behavior
  useEffect(() => {
    if (location.pathname.endsWith(restaurentId)) {
      navigate(`/GetFoodRestaurentDetails/${item}/${restaurentId}/order-online`, { 
        state: { fromMenu: false } 
      });
    }
  }, [location.pathname, item, restaurentId, navigate]);

  useEffect(() => {
    const getRestauretByRestaurentId = async () => {
      try {
        const response = await axios.get(
          `${url}/restaurent/getRestauretByRestaurentId`,
          { params: { restaurentId } }
        );
        const data = response.data.data || {};
        setRestaurentDetails(data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    if (restaurentId) {
      getRestauretByRestaurentId();
    }
  }, [restaurentId]);

  // Function to handle menu navigation
  const handleMenuClick = (path) => {
    navigate(`/GetFoodRestaurentDetails/${item}/${restaurentId}/${path}`, {
      state: { fromMenu: true }
    });
  };

  // Function to determine if a menu item is active
  const isActiveMenu = (path) => {
    return location.pathname.includes(path);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="pathJourney relative gap-x-3 mt-6 text-xs text-gray-400 flex">
        <p>Home</p>
        <p>/</p>
        <p>{"India"}</p>
        <p>/</p>
        <p>{authLocation?.city}</p>
        <p>/</p>
        <p>{restaurentDetails?.location || "Unknown"}</p>
        <p>/</p>
        <p>{restaurentDetails?.restaurantName || "Loading..."}</p>
      </div>

      {/* Header Section */}
      <div className="headerSection pt-4 mt-4 flex flex-row gap-4 sticky top-0 bg-white z-20 ">
        <div className="flex-[7] text-left">
          <h2 className="font-poppins text-[36px] font-medium opacity-90 leading-[43px]">
            {restaurentDetails?.restaurantName || "Loading..."}
          </h2>
          <p className="mt-3 text-neutral-500 font-poppins text-base leading-normal">
            {restaurentDetails?.category}, {restaurentDetails?.subCategory}
          </p>
          <p className="text-neutral-500 font-poppins text-base font-light leading-loose">
            {restaurentDetails?.location}
          </p>
          <div className="flex gap-2 mt-1 box-content">
            <div className="border border-gray-300 rounded-2xl px-[5px] pb-1 flex">
              <p className="opacity-70">
                Open now 12midnight – 2am, 10am – 12midnight (Today)
              </p>
            </div>
            <p className="mx-1 opacity-70 text-md">|</p>
            <div className="flex gap-2 items-center mb-1">
              <img src={assets.call} className="size-4" alt="call" />
              <p className="opacity-70 underline decoration-gray-600">
                {restaurentDetails?.contact || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-3 text-xl pb-3">
            <button className="border border-gray-500 rounded-md px-2 tracking-tight font-poppins text-[15px] opacity-80 flex items-center gap-2 py-1">
              <img src={assets.direction} alt="" />
              Direction
            </button>
            <button className="border border-gray-500 rounded-md px-2 tracking-tight font-poppins text-[15px] opacity-80 flex items-center gap-2 py-1">
              <img src={assets.share} alt="" />
              Share
            </button>
            <button className="border border-gray-500 rounded-md px-2 tracking-tight font-poppins text-[15px] opacity-80 flex items-center gap-2 py-1">
              Reviews
            </button>
          </div>
        </div>
        <div className="z-50 flex-[3] place-items-end">
          <div className="flex gap-2">
            <div className="mt-2">
              <div className="flex gap-1 items-center border bg-green-700 rounded-lg px-2 p-1 text-white">
                {restaurentDetails.rating}
                <img className="size-4" src={assets.star} alt="" />
              </div>
            </div>
            <div>
              <p className="font-bold">5,234</p>
              <p>Delivery Ratings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="imageSection flex max-h-80 gap-2 mt-3">
        <div className="flex-[6] overflow-hidden">
          <img
            className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
            src={restaurentDetails?.mainRestaurentImage || assets.placeholder}
            alt="Main Restaurant"
          />
        </div>
        <div className="flex-[2] flex flex-col gap-2 overflow-hidden">
          <div className="flex-1">
            <img
              className="h-[155px] w-full object-cover transform transition-transform duration-300 hover:scale-105"
              src={restaurentDetails?.images[0] || assets.placeholder}
              alt="Top Image"
            />
          </div>
          <div className="flex-1">
            <img
              className="h-[155px] w-full object-cover transform transition-transform duration-300 hover:scale-105"
              src={restaurentDetails?.images[1] || assets.placeholder}
              alt="Bottom Image"
            />
          </div>
        </div>
        <div className="flex-[2] overflow-hidden relative">
          <img
            className="h-full w-full object-cover transform transition-transform duration-300 hover:scale-105"
            src={restaurentDetails.images[2] || assets.placeholder}
            alt="Third Restaurant Image"
          />
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center cursor-pointer"
            onClick={() => handleMenuClick('photos')}
          >
            <p className="text-white font-open-sans font-semibold text-lg">
              View Gallery
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-[221px] bg-white z-10 border-b border-gray-200">
        <div className="flex gap-[70px] py-3 pl-4 text-lg">
          {menuItems.map((menu, index) => (
            <button
              key={menu.path}
              onClick={() => handleMenuClick(menu.path)}
              ref={(el) => (menuRefs.current[index] = el)}
              className={`
                relative cursor-pointer transition-colors duration-200
                ${isActiveMenu(menu.path) ? 'text-red-500 font-medium' : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              {menu.name}
              <div
                className={`absolute bottom-[-12px] left-0 h-[3px] bg-red-500 transition-all duration-300
                  ${isActiveMenu(menu.path) ? 'w-full' : 'w-0'}
                `}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="mt-4">
        <Outlet context={{ restaurentDetails }} />
      </div>
    </div>
  );
};

export default GetFoodRestaurentDetails;