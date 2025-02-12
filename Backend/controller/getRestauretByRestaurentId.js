// import Restaurant from "../models/restaurentModel.js";

// const getRestauretByRestaurentId = async (req, res) => {
//   try {
//     const { restaurentId } = req.query;

//     const response = await Restaurant.findById({ _id: restaurentId });
//     console.log(response)

//     if (!response || response.length === 0) {
//       return res.json({ message: "No restaurants found." });
//     }
//     res.json({ data: response });
//   } catch (error) {
//     console.log(error)
//   }
// };

// export default getRestauretByRestaurentId;

import Restaurant from "../models/restaurentModel.js";

const getRestauretByRestaurentId = async (req, res) => {
  try {
    const { restaurentId } = req.query;

    // Validate input
    if (!restaurentId) {
      return res.status(400).json({ message: "Restaurant ID is required." });
    }

    // Fetch restaurant details by ID
    const restaurant = await Restaurant.findById(restaurentId);

    // Check if restaurant exists
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found." });
    }

    return res.status(200).json({ data: restaurant });
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    
    // Handle invalid MongoDB ObjectID format
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid restaurant ID format." });
    }

    return res.status(500).json({ message: "Internal Server Error." });
  }
};

export default getRestauretByRestaurentId;

