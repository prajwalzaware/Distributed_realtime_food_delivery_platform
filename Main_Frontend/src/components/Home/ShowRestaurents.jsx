// import assets from "../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const ShowRestaurents = () => {
//   const { restaurantsByLocation } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   // Simulate data processing/loading
//   useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1000); // Simulates a 1-second loader
//     return () => clearTimeout(timer);
//   }, [restaurantsByLocation]);

//   useEffect(() => {
//     console.log("Restaurants by Location:", restaurantsByLocation);
//   }, []);

//   // Display Loader While Checking Data
//   if (loading) {
//     return (
//       <div className="mt-9 flex justify-center items-center">
//         <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FF4F4F] rounded-full animate-spin"></div>
//         <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   // Handle No Restaurants Found
//   if (!restaurantsByLocation || restaurantsByLocation.length === 0) {
//     return (
//       <div className="mt-9 flex justify-center items-center flex-col">
//         <p className="text-lg font-bold text-gray-700">
//           Oops! We are not serving in this location yet.
//         </p>
//         <p className="text-md text-gray-500">
//           Try searching in another location.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="gap-6 mt-9 flex flex-wrap items-center">
//       {restaurantsByLocation.map((item, index) => (
//         <div
//           key={index}
//           className="relative hover:scale-95 duration-200"
//           onClick={() =>
//             navigate(`/GetFoodRestaurentDetails/${item.category}/${item._id}`)
//           }
//         >
//           <div className="w-64 h-40 overflow-hidden">
//             <img
//               className="w-full h-full object-cover object-bottom rounded-2xl"
//               src={item.mainRestaurentImage}
//               alt=""
//             />
//             <p
//               style={{ top: "127px" }}
//               className="absolute text-lg ml-3 text-white font-bold font-poppins"
//             >
//               {item.offer}
//             </p>
//           </div>
//           <p className="inline-block text-lg font-bold font-poppins">
//             {item.restaurantName}
//           </p>
//           <div className="flex items-center font-semibold">
//             <img className="w-4 mr-1" src={assets.rating_logo} alt="" />
//             <p>{item.rating}</p>
//             <img
//               style={{ width: "6px" }}
//               className="ml-4 mr-1"
//               src={assets.dot}
//               alt=""
//             />
//             <p>{item.averageDeliveryTime}</p>
//           </div>
//           <p className="font-roboto text-gray-500">
//             {item.category + ", " + item.subCategory}
//           </p>
//           <p className="font-roboto text-gray-500">{item.location}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShowRestaurents;

// import assets from "../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const ShowRestaurents = () => {
//   const { restaurantsByLocation } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Loading State
//   if (!restaurantsByLocation || restaurantsByLocation.length === 0) {
//     return (
//       <div className="mt-9 flex justify-center items-center">
//         <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FF4F4F] rounded-full animate-spin"></div>
//         <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="gap-6 mt-9 flex flex-wrap ">
//       {restaurantsByLocation.map((item) => (
//         <div
//           key={item._id}
//           className="relative hover:scale-95 duration-200 cursor-pointer w-64"
//           onClick={() => navigate(`/GetFoodRestaurentDetails/${item.category}/${item._id}`)}
//         >
//           {/* Image Wrapper */}
//           <div className="w-64 h-40 overflow-hidden relative rounded-2xl">
//             <img
//               className="w-full h-full object-cover object-center rounded-2xl"
//               src={item.mainRestaurentImage}
//               alt={item.restaurantName}
//             />
            
//             {/* Offer Badge */}
//             {item.offer && (
//               <p className="absolute bottom-4 left-10 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-r-lg text-base font-semibold shadow-lg">
//                 {item.offer}% OFF
//               </p>
//             )}
//           </div>

//           {/* Restaurant Details */}
//           <div className="mt-2">
//             <p className="text-lg font-bold font-poppins">{item.restaurantName}</p>
            
//             {/* Rating & Delivery */}
//             <div className="flex items-center font-semibold">
//               <img className="w-4 mr-1" src={assets.rating_logo} alt="Rating" />
//               <p>{item.rating}</p>
//               <img className="w-1 ml-4 mr-1" src={assets.dot} alt="Separator" />
//               <p>{item.averageDeliveryTime}</p>
//             </div>

//             {/* Category & Location */}
//             <p className="text-gray-500">{item.category}, {item.subCategory}</p>
//             <p className="text-gray-500">{item.location}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ShowRestaurents;



import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const ShowRestaurents = () => {
  const { restaurantsByLocation } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Simulate loading for better user experience
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [restaurantsByLocation]);

  return (
    <div className="p-5">
      

      {/* Loading State */}
      {loading ? (
        <div className="mt-9 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FF4F4F] rounded-full animate-spin"></div>
          <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      ) : restaurantsByLocation.length === 0 ? (
        // No Restaurants Found
        <div className="mt-9 flex flex-col items-center text-center">
          <p className="text-lg font-bold text-gray-700">
            Oops! No restaurants found in your area.
          </p>
          <p className="text-md text-gray-500">
            Try searching in another location or for different cuisines.
          </p>
        </div>
      ) : (
        // Show Restaurants List
        <div className="gap-6 mt-9 flex flex-wrap">
          {restaurantsByLocation.map((item) => (
            <div
              key={item._id}
              className="relative hover:scale-95 duration-200 cursor-pointer w-64"
              onClick={() =>
                navigate(`/GetFoodRestaurentDetails/${item.category}/${item._id}`)
              }
            >
              {/* Image Wrapper */}
              <div className="w-64 h-40 overflow-hidden relative rounded-2xl">
                <img
                  className="w-full h-full object-cover object-center rounded-2xl"
                  src={item.mainRestaurentImage}
                  alt={item.restaurantName}
                />

                {/* Offer Badge */}
                {item.offer && (
                  <p className="absolute bottom-4 left-10 transform -translate-x-1/2 bg-white text-black px-3 py-1 rounded-r-lg text-base font-semibold shadow-lg">
                    {item.offer}% OFF
                  </p>
                )}
              </div>

              {/* Restaurant Details */}
              <div className="mt-2">
                <p className="text-lg font-bold font-poppins">
                  {item.restaurantName}
                </p>

                {/* Rating & Delivery */}
                <div className="flex items-center font-semibold">
                  <img className="w-4 mr-1" src={assets.rating_logo} alt="Rating" />
                  <p>{item.rating}</p>
                  <img className="w-1 ml-4 mr-1" src={assets.dot} alt="Separator" />
                  <p>{item.averageDeliveryTime}</p>
                </div>

                {/* Category & Location */}
                <p className="text-gray-500">
                  {item.category}, {item.subCategory}
                </p>
                <p className="text-gray-500">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowRestaurents;
