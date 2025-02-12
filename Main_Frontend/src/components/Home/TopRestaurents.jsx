// import assets from "../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { useRestaurant } from "../../context/RestaurantContextProvider";
// import { useLocation } from "../../context/LocationContext";

// import {  useState, useEffect } from "react";

// const TopRestaurents = () => {
//   const {  topRatedRestaurants } = useRestaurant();
//   const { location } = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   // Simulate loading process
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000); // Simulates a 1-second loader
//     return () => clearTimeout(timer);
//   }, [topRatedRestaurants]);
  

//   // Loader display
//   if (loading) {
//     return (
//       <div className="mt-9 flex justify-center items-center">
//         <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FF4F4F] rounded-full animate-spin"></div>
//         <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
//       </div>
//     );
//   }
//     // Handle No Restaurants Found
//     if (!topRatedRestaurants || topRatedRestaurants.length === 0) {
//       return (
//         <>
//         <p className="mt-10 text-2xl font-poppins font-bold">
//         Top restaurant chains in{" "}
//         {location.name === "Select location"
//           ? "Mumbai"
//           : location.name || location.displayName}
//       </p>
//         <div className="mt-9 flex justify-center items-center flex-col">
          
//           <p className="text-lg font-bold text-gray-700">
//             Oops! We are not serving in this location yet.
//           </p>
//           <p className="text-md text-gray-500">Try searching in another location.</p>
//         </div>
//         </>
//       );
//     }

//   return (
//     <div>
//       {/* Display Location-Specific Heading */}
//       <p className="mt-10 text-2xl font-poppins font-bold">
//         Top restaurant chains in{" "}
//         {location.name === "Select location"
//           ? "Mumbai"
//           : location.name || location.displayName}
//       </p>

//       {/* Render fallback message if no restaurants are found */}
     
//         {/* /* Restaurant Cards Section */ }
//         <div className="flex gap-6 mt-9 items-center overflow-x-auto scrollbar-hide scroll-smooth">
//           {topRatedRestaurants.map((item, index) => (
//             <div
//               key={index}
//               className="relative hover:scale-95 duration-200"
//               onClick={() => navigate(`/GetFoodRestaurentDetails/${item.category}/${item._id}`)}
//             >
//               {/* Restaurant Image */}
//               <div className="w-80 h-56 overflow-hidden">
//                 <img
//                   className="w-full h-full object-cover object-bottom rounded-2xl"
//                   src={item.mainRestaurentImage}
//                   alt=""
//                 />
//                 <p
//                   style={{ top: "150px" }}
//                   className="absolute text-xl ml-3 text-white font-bold font-poppins"
//                 >
//                   {item.offer}
//                 </p>
//               </div>

//               {/* Restaurant Name */}
//               <p className="inline-block text-xl font-semibold font-poppins">
//                 {item.restaurantName}
//               </p>

//               {/* Rating and Delivery Time */}
//               <div className="flex items-center font-semibold">
//                 <img className="w-4 mr-1" src={assets.rating_logo} alt="" />
//                 <p>{item.rating}</p>
//                 <img
//                   style={{ width: "6px" }}
//                   className="ml-4 mr-1"
//                   src={assets.dot}
//                   alt=""
//                 />
//                 <p>{item.averageDeliveryTime}</p>
//               </div>

//               {/* Category and Location */}
//               <p className="font-roboto text-gray-500">
//                 {item.category + ", "}
//                 {item.subcategory}
//               </p>
//               <p className="font-roboto text-gray-500">{item.location}</p>
//             </div>
//           ))}
//         </div>
//     </div>
//   );
// };

// export default TopRestaurents;

// import assets from "../../assets/assets";
// import { useNavigate } from "react-router-dom";

// import { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const TopRestaurents = () => {
//   const { topRatedRestaurants, isLoading,location } = useContext(AuthContext); // Use isLoading from context
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   // Simulate loading process
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000); // Simulates a 1-second loader
//     return () => clearTimeout(timer);
//   }, []);

//   // Combined loading state (context loading + local loading)
//   const isDataLoading = isLoading || loading;

//   // Loader display
//   if (isDataLoading) {
//     return (
//       <div className="mt-9 flex justify-center items-center">
//         <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FF4F4F] rounded-full animate-spin"></div>
//         <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   // Handle No Restaurants Found
//   if (!topRatedRestaurants || topRatedRestaurants.length === 0) {
//     return (
//       <>
//         <p className="mt-10 text-2xl font-poppins font-bold">
//           Top restaurant chains in{" "}
//           {location.name === "Select location"
//             ? "Mumbai"
//             : location.name || location.displayName}
//         </p>
//         <div className="mt-9 flex justify-center items-center flex-col">
//           <p className="text-lg font-bold text-gray-700">
//             Oops! We are not serving in this location yet.
//           </p>
//           <p className="text-md text-gray-500">Try searching in another location.</p>
//         </div>
//       </>
//     );
//   }

//   return (
//     <div>
//       {/* Display Location-Specific Heading */}
//       <p className="mt-10 text-2xl font-poppins font-bold">
//         Top restaurant chains in{" "}
//         {location.name === "Select location"
//           ? "Mumbai"
//           : location.name || location.displayName}
//       </p>

//       {/* Restaurant Cards Section */}
//       <div className="flex gap-6 mt-9 items-center overflow-x-auto scrollbar-hide scroll-smooth">
//         {topRatedRestaurants.map((item, index) => (
//           <div
//             key={index}
//             className="relative hover:scale-95 duration-200"
//             onClick={() =>
//               navigate(`/GetFoodRestaurentDetails/${item.category}/${item._id}`)
//             }
//           >
//             {/* Restaurant Image */}
//             <div className="w-80 h-56 overflow-hidden">
//               <img
//                 className="w-full h-full object-cover object-bottom rounded-2xl"
//                 src={item.mainRestaurentImage}
//                 alt={item.restaurantName}
//               />
//               <p
//                 style={{ top: "150px" }}
//                 className="absolute text-xl ml-3 text-white font-bold font-poppins"
//               >
//                 {item.offer} % off
//               </p>
//             </div>

//             {/* Restaurant Name */}
//             <p className="inline-block text-xl font-semibold font-poppins">
//               {item.restaurantName}
//             </p>

//             {/* Rating and Delivery Time */}
//             <div className="flex items-center font-semibold">
//               <img className="w-4 mr-1" src={assets.rating_logo} alt="Rating" />
//               <p>{item.rating}</p>
//               <img
//                 style={{ width: "6px" }}
//                 className="ml-4 mr-1"
//                 src={assets.dot}
//                 alt="Dot"
//               />
//               <p>{item.averageDeliveryTime}</p>
//             </div>

//             {/* Category and Location */}
//             <p className="font-roboto text-gray-500">
//               {item.category}, {item.subcategory}
//             </p>
//             <p className="font-roboto text-gray-500">{item.location}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TopRestaurents;

import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const TopRestaurants = () => {
  const { topRatedRestaurants, isLoading, location } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulate loading process
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Combined loading state
  const isDataLoading = isLoading || loading;

  // Loader UI
  if (isDataLoading) {
    return (
      <div className="mt-9 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FF4F4F] rounded-full animate-spin"></div>
        <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
      </div>
    );
  }

  // Handle No Restaurants Found
  if (!topRatedRestaurants || topRatedRestaurants.length === 0) {
    return (
      <>
        <p className="mt-10 text-2xl font-poppins font-bold">
          Top restaurant chains in{" "}
          {location.name === "Select location"
            ? "Mumbai"
            : location.name || location.displayName}
        </p>
        <div className="mt-9 flex justify-center items-center flex-col">
          <p className="text-lg font-bold text-gray-700">
            Oops! We are not serving in this location yet.
          </p>
          <p className="text-md text-gray-500">
            Try searching in another location.
          </p>
        </div>
      </>
    );
  }

  return (
    <div>
      {/* Section Heading */}
      <p className="mt-10 text-2xl font-poppins font-bold">
        Top restaurant chains in{" "}
        {location.name === "Select location"
          ? "Mumbai"
          : location.name || location.displayName}
      </p>

      {/* Restaurant Cards Section */}
      <div className="flex gap-6 mt-9 items-center ">
        {topRatedRestaurants.map((item, index) => (
          <div
            key={index}
            className="relative cursor-pointer hover:scale-95 transition-transform duration-200"
            onClick={() =>
              navigate(`/GetFoodRestaurentDetails/${item.category}/${item._id}`)
            }
          >
            {/* Restaurant Image */}
            <div className="w-80 h-56 overflow-hidden rounded-2xl relative">
              <img
                className="w-full h-full object-cover"
                src={item.mainRestaurentImage}
                alt={item.restaurantName}
              />

              {/* ✅ Updated Offer Tag (Your Preferred Styling) */}
              {item.offer && (
                <p className="absolute bottom-4 left-10 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-r-lg text-base font-semibold shadow-lg">
                  {item.offer}% OFF
                </p>
              )}
            </div>

            {/* Restaurant Details */}
            <p className="mt-2 text-xl font-semibold font-poppins">
              {item.restaurantName}
            </p>

            {/* Rating and Delivery Time */}
            <div className="flex items-center font-semibold text-gray-700">
              <img className="w-4 mr-1" src={assets.rating_logo} alt="Rating" />
              <p>{item.rating}</p>
              <span className="mx-2 text-gray-400">•</span>
              <p>{item.averageDeliveryTime}</p>
            </div>

            {/* Category and Location */}
            <p className="text-gray-500">{item.category}, {item.subcategory}</p>
            <p className="text-gray-500">{item.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRestaurants;
