// // routes/uploadRoute.js
// import Restaurant from "../models/restaurentModel.js";

// const uploadRestoDataImage = async (req, res) => {
//   try {
//     console.log('Request Body:', req.body);
//     console.log('Request Files:', req.files);
//     // Check if main image is uploaded
//     if (!req.files.mainRestaurentImage) {
//       return res
//         .status(400)
//         .json({ message: "Main restaurant image is required" });
//     }
//     console.log(req.files);
//     // Extract the main image URL
//     const mainImageUrl = req.files.mainRestaurentImage[0].path;

//     // Extract URLs of additional images (if any)
//     const additionalImageUrls = req.files.images
//       ? req.files.images.map((file) => file.path)
//       : [];

//     // Collect form data from req.body
//     const restaurantData = {
//       ...req.body,
//       mainRestaurentImage: mainImageUrl,
//       images: additionalImageUrls,
//     };

//     // Save restaurant data in MongoDB
//     const restaurant = new Restaurant(restaurantData);
//     await restaurant.save();

//     res.status(200).json({
//       message: "Restaurant data and images uploaded successfully",
//       restaurant,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Image upload failed", error });
//   }
// };

// export default uploadRestoDataImage;

// import mongoose from "mongoose";
// import Restaurant from "../models/restaurentModel.js";

// const uploadRestoDataImage = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     console.log("Request Files:", req.files);

//     // Validate required fields
//     if (!req.files || !req.files.mainRestaurentImage) {
//       return res.status(400).json({ message: "Main restaurant image is required" });
//     }

//     // Extract image URLs
//     const mainImageUrl = req.files?.mainRestaurentImage?.[0]?.path;
//     const additionalImageUrls = req.files?.images?.map((file) => file.path) || [];

//     // Validate additional required fields
//     const { name, location, cuisineType } = req.body;
//     if (!name || !location || !cuisineType) {
//       return res.status(400).json({ message: "Missing required restaurant details" });
//     }

//     // Convert restaurantId to ObjectId if provided
//     let restaurantId = req.body.restaurantId;
//     if (restaurantId && mongoose.Types.ObjectId.isValid(restaurantId)) {
//       restaurantId = new mongoose.Types.ObjectId(restaurantId);
//     } else {
//       restaurantId = undefined;
//     }

//     // Prepare restaurant data
//     const restaurantData = {
//       ...req.body,
//       restaurantId,
//       mainRestaurentImage: mainImageUrl,
//       images: additionalImageUrls,
//     };

//     // Save restaurant data
//     const restaurant = new Restaurant(restaurantData);
//     await restaurant.save();

//     return res.status(201).json({
//       message: "Restaurant data and images uploaded successfully",
//       restaurant,
//     });
//   } catch (error) {
//     console.error("Error uploading restaurant data:", error);
//     return res.status(500).json({ message: "Internal server error", error });
//   }
// };

// export default uploadRestoDataImage;


import mongoose from "mongoose";
import Restaurant from "../models/restaurentModel.js";

const uploadRestoDataImage = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    // Validate required fields
    if (!req.files || !req.files.mainRestaurentImage) {
      return res.status(400).json({ message: "Main restaurant image is required" });
    }

    // Construct image URLs instead of file paths
    const mainImageUrl = `${req.protocol}://${req.get("host")}/${req.files.mainRestaurentImage[0].path}`;
    const additionalImageUrls = req.files.images
      ? req.files.images.map((file) => `${req.protocol}://${req.get("host")}/${file.path}`)
      : [];

    // Validate additional required fields
    const { name, location, cuisineType } = req.body;
    if (!name || !location || !cuisineType) {
      return res.status(400).json({ message: "Missing required restaurant details" });
    }

    // Convert restaurantId to ObjectId if provided
    let restaurantId = req.body.restaurantId;
    if (restaurantId && mongoose.Types.ObjectId.isValid(restaurantId)) {
      restaurantId = new mongoose.Types.ObjectId(restaurantId);
    } else {
      restaurantId = undefined;
    }

    // Prepare restaurant data
    const restaurantData = {
      ...req.body,
      restaurantId,
      mainRestaurentImage: mainImageUrl,
      images: additionalImageUrls,
    };

    // Save restaurant data
    const restaurant = new Restaurant(restaurantData);
    await restaurant.save();

    return res.status(201).json({
      message: "Restaurant data and images uploaded successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Error uploading restaurant data:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

export default uploadRestoDataImage;
