import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { useAuth } from "../../context/AuthContext";

const GetFoodRestaurents = () => {
  const { location, restaurantsByLocation } = useAuth();
  const { item } = useParams(); // `item` is the cuisine type, e.g., "Thali"
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Debugging: Log location and restaurants
  console.log("Location:", location);
  console.log("Restaurants by Location:", restaurantsByLocation);

  // Set loading to false after filtering
  useEffect(() => {
    if (restaurantsByLocation.length > 0) {
      setLoading(false);
    }
  }, [restaurantsByLocation]);

  // Handle invalid location
  if (!location || location.name === "Select location") {
    return (
      <div className="p-5">
        <p className="mt-10 text-3xl font-poppins font-bold text-gray-800">
          Please select a valid location to view restaurants.
        </p>
      </div>
    );
  }

  // Filter restaurants by cuisine type (`item`)
  const filteredRestaurants = restaurantsByLocation.filter((restaurant) => {
    // Ensure `category` is a string and handle null/undefined cases
    const category = restaurant.category ? restaurant.category.toString().toLowerCase() : "";

    // Debugging: Log each restaurant's category
    console.log(
      `Restaurant: ${restaurant.restaurantName}, Category: ${category}`
    );

    // Case-insensitive comparison
    return category === item.toLowerCase();
  });

  // Debugging: Log filtered restaurants
  console.log("Filtered Restaurants:", filteredRestaurants);

  return (
    <div className="p-5">
      <p className="mt-10 text-3xl font-poppins font-bold text-gray-800">
        Top restaurant chains for {item} in{" "}
        {location.name === "Select location"
          ? "Mumbai"
          : location.name || location.suburb}
      </p>

      {loading ? (
        <div className="mt-9 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FF4F4F] rounded-full animate-spin"></div>
          <p className="ml-3 text-lg font-semibold text-gray-700">Loading...</p>
        </div>
      ) : (
        <>
          {!filteredRestaurants || filteredRestaurants.length === 0 ? (
            <div className="mt-9 flex justify-center items-center flex-col">
              <p className="text-lg font-bold text-gray-700">
                Oops! We don't have restaurants serving "{item}" in{" "}
                {location.name || "this location"} yet.
              </p>
              <p className="text-md text-gray-500">
                Try searching for other cuisines or explore restaurants in
                nearby areas.
              </p>
            </div>
          ) : (
            <div className="gap-6 mt-9 flex flex-wrap items-center">
              {filteredRestaurants.map((restaurant) => {
                console.log("Rendering Restaurant:", restaurant); // Debugging log
                return (
                  <div
                    key={restaurant._id}
                    className="relative hover:scale-95 duration-200"
                    onClick={() =>
                      navigate(
                        `/GetFoodRestaurentDetails/${restaurant.category}/${restaurant._id}`
                      )
                    }
                  >
                    <div className="w-64 h-40 overflow-hidden">
                      <img
                        className="w-full h-full object-cover object-bottom rounded-2xl"
                        src={restaurant.mainRestaurentImage}
                        alt=""
                      />
                      <p
                        style={{ top: "127px" }}
                        className="absolute text-lg ml-3 text-white font-bold font-poppins"
                      >
                        {restaurant.offer} % off
                      </p>
                    </div>

                    <p className="inline-block text-lg font-bold font-poppins">
                      {restaurant.restaurantName}
                    </p>
                    <div className="flex items-center font-semibold">
                      <img
                        className="w-4 mr-1"
                        src={assets.rating_logo}
                        alt=""
                      />
                      <p>{restaurant.rating}</p>
                      <img
                        style={{ width: "6px" }}
                        className="ml-4 mr-1"
                        src={assets.dot}
                        alt=""
                      />
                      <p>{restaurant.averageDeliveryTime}</p>
                    </div>
                    <p className="font-roboto text-gray-500">
                      {restaurant.category}, {restaurant.subCategory}
                    </p>
                    <p className="font-roboto text-gray-500">
                      {restaurant.location}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GetFoodRestaurents;