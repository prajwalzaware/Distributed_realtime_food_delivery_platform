// import { useContext } from "react";
// import assets from "../../assets/assets";
// import { AuthContext } from "../../context/AuthContext";

// const FilterNavBar = () => {
//   const { location } = useContext(AuthContext);
//   return (
//     <div className="">
//       <h1 className="mt-10 text-2xl font-poppins font-bold  ">
//         Restaurants with online food delivery in{" "}
//         {location === null ///
//           ? "Mumbai"
//           : location?.name || location?.displayName || "Select Location"/// 
//           } 
//       </h1>
//       <div className=" flex items-center text-sm mt-4 font-roboto font-medium">
//         <button className="border-gray-400 border border-solid rounded-2xl py-1 px-3 mr-3 font-roboto flex items-center">
//           Filter <img className="w-4 ml-2" src={assets.filter_icon} alt="" />
//         </button>
//         <button className="border-gray-400 border rounded-2xl py-1  px-3 mr-3 font-roboto flex items-center text-nowrap">
//           Sort By <img className="w-4 ml-2 " src={assets.down_arrow} alt="" />
//         </button>
//         <button className="border-gray-400 border rounded-2xl py-1  px-3 mr-3 font-roboto text-nowrap ">
//           Fast Delivery
//         </button>
//         <button className="border-gray-400 border rounded-2xl py-1  px-3 mr-3 font-roboto text-nowrap">
//           New On Swiggy
//         </button>
//         <button className="border-gray-400 border rounded-2xl py-1  px-3 mr-3 font-roboto text-nowrap">
//           Rating 4.0+
//         </button>
//         <button className="border-gray-400 border rounded-2xl py-1  px-3 mr-3 font-roboto text-nowrap">
//           Pure Veg
//         </button>

//         <button className="border-gray-400 border rounded-2xl py-1  px-3 mr-3 font-roboto text-nowrap">
//           Offers
//         </button>
//         <button className="border-gray-400 border rounded-2xl py-1  px-3 mr-3 font-roboto text-nowrap">
//           Rs. 300-Rs. 600
//         </button>
//         <button className="border-gray-400 border rounded-2xl py-1  px-3 mr-3 font-roboto text-nowrap">
//           Less than Rs.300
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterNavBar;
import { useContext } from "react";
import assets from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const FilterNavBar = () => {
  const { location } = useContext(AuthContext);

  return (
    <div>
      {/* Section Heading */}
      <h1 className="mt-10 text-2xl font-poppins font-bold">
        Restaurants with online food delivery in{" "}
        {location?.name || location?.displayName || "Mumbai"}
      </h1>

      {/* Filter & Sort Options */}
      <div className="flex flex-wrap items-center text-sm mt-4 font-roboto font-medium gap-3">
        {/* Filter Button */}
        <button className="border border-gray-400 rounded-2xl py-1 px-4 flex items-center hover:bg-gray-100 transition">
          Filter <img className="w-4 ml-2" src={assets.filter_icon} alt="Filter Icon" />
        </button>

        {/* Sort Button */}
        <button className="border border-gray-400 rounded-2xl py-1 px-4 flex items-center hover:bg-gray-100 transition">
          Sort By <img className="w-4 ml-2" src={assets.down_arrow} alt="Dropdown Arrow" />
        </button>

        {/* Dynamic Filter Options */}
        {[
          "Fast Delivery",
          "New On Swiggy",
          "Rating 4.0+",
          "Pure Veg",
          "Offers",
          "Rs. 300-Rs. 600",
          "Less than Rs. 300"
        ].map((filter, index) => (
          <button
            key={index}
            className="border border-gray-400 rounded-2xl py-1 px-4 hover:bg-gray-100 transition capitalize"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterNavBar;
