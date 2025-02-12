// import mongoose from "mongoose";
// import RestaurantMenus from "../models/restaurentMenuModel.js";

// const uploadRestaurentMenu = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body); // Log the request body
//     console.log("Request Files:", req.files); // Log the uploaded files

//     // Validate required fields
//     if (!req.files || !req.files.image) {
//       return res.status(400).json({ message: "Menu image is required" });
//     }

//     // Extract fields from the request body
//     const { restaurantId, category, menuName, price, description, isVegetarian } = req.body;

//     // Validate required fields
//     if (!restaurantId || !category || !menuName || !price) {
//       return res.status(400).json({ message: "Missing required fields" });
//     }

//     // Convert restaurantId to ObjectId
//     const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);

//     // Get the image URL or path
//     const MenuImageUrl = req.files.image[0].path;

//     // Create a new menu item
//     const menuData = {
//       restaurantId: restaurantObjectId,
//       category,
//       menuName,
//       price: parseFloat(price),
//       description,
//       isVegetarian: isVegetarian === "true",
//       image: MenuImageUrl,
//     };

//     const restaurantMenus = new RestaurantMenus(menuData);
//     await restaurantMenus.save();

//     res.status(201).json({
//       message: "Restaurant menu and image uploaded successfully",
//       restaurantMenus,
//     });
//   } catch (error) {
//     console.error("Error uploading menu:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export default uploadRestaurentMenu;

import mongoose from "mongoose";
import RestaurantMenus from "../models/restaurentMenuModel.js";

const uploadRestaurentMenu = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const { restaurantId, category, menuName, price, description, isVegetarian } = req.body;

    // Validate required fields
    if (!restaurantId || !category || !menuName || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate and convert restaurantId to ObjectId
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: "Invalid restaurant ID" });
    }
    const restaurantObjectId = new mongoose.Types.ObjectId(restaurantId);

    // Validate image upload
    if (!req.files || !req.files.image || !req.files.image[0]?.path) {
      return res.status(400).json({ message: "Menu image is required" });
    }
    const menuImageUrl = req.files.image[0].path;

    // Create a new menu item
    const menuData = new RestaurantMenus({
      restaurantId: restaurantObjectId,
      category,
      menuName,
      price: parseFloat(price) || 0,
      description: description || "",
      isVegetarian: isVegetarian === "true",
      image: menuImageUrl,
    });

    await menuData.save();

    return res.status(201).json({
      message: "Restaurant menu and image uploaded successfully",
      data: menuData,
    });
  } catch (error) {
    console.error("Error uploading menu:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default uploadRestaurentMenu;
