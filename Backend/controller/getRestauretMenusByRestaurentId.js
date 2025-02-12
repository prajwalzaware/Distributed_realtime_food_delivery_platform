// import Restaurant from "../models/restaurentModel.js";
// import RestaurantMenus from "../models/restaurentMenuModel.js";
// import client from "../config/redis.js";

// const getRestauretMenusByRestaurentId = async (req, res) => {
//   const restaurentId =(req.query.restaurentId);
//   console.log("restaurentId", restaurentId);
//   try {
//     const restaurant = await Restaurant.findById(restaurentId);
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurent not found" });
//     }
//     const menus = await RestaurantMenus.find({ restaurantId:restaurentId });
//     const cacheKey=restaurentId;
//     client.setEx(cacheKey, 600, JSON.stringify(menus));
//     res.status(200).json({ data: menus });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export default getRestauretMenusByRestaurentId;


import Restaurant from "../models/restaurentModel.js";
import RestaurantMenus from "../models/restaurentMenuModel.js";
import client from "../config/redis.js";

const getRestauretMenusByRestaurentId = async (req, res) => {
  try {
    const { restaurentId } = req.query;

    if (!restaurentId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    }

    const cacheKey = `restaurant-menus:${restaurentId}`;
    
    // Check Redis cache
    const cachedMenus = await client.get(cacheKey);
    if (cachedMenus) {
      console.log("Cache hit: Serving data from Redis");
      return res.status(200).json({ data: JSON.parse(cachedMenus) });
    }

    // Check if the restaurant exists
    const restaurant = await Restaurant.findById(restaurentId).lean();
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    // Fetch menus from the database
    const menus = await RestaurantMenus.find({ restaurantId: restaurentId }).lean();

    if (!menus || menus.length === 0) {
      return res.status(404).json({ message: "No menus found for this restaurant" });
    }

    // Store menus in Redis cache (expires in 10 minutes)
    await client.setEx(cacheKey, 600, JSON.stringify(menus));

    return res.status(200).json({ data: menus });

  } catch (error) {
    console.error("Error fetching restaurant menus:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export default getRestauretMenusByRestaurentId;
