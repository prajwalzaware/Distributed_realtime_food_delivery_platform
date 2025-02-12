// import client from "../config/redis.js";
// import Restaurant from "../models/restaurentModel.js";

// const getTopRatedRestaurent = async (req, res) => {
//   try {
//     const { locationParam, sortBy, limit } = req.query;

//     // Validate input
//     if (!locationParam || (!locationParam.displayName && !locationParam.name)) {
//       return res.status(400).json({
//         message:
//           "Invalid or missing location parameter. Please provide a valid location.",
//       });
//     }

//     const cacheKey = `TopRatedRestaurants:${
//       locationParam?.name || locationParam?.displayName
//     }`;
//     console.log("Cache Key:", cacheKey);

//     // Check Redis cache
//     const cachedResults = await client.get(cacheKey);
//     if (cachedResults) {
//       console.log("Cache hit: Serving data from Redis by location");
//       return res.status(200).json({ data: JSON.parse(cachedResults) });
//     }

//     // Prepare search terms
//     const searchTerms = [
//       locationParam.name,
//       locationParam.displayName,
//       locationParam.suburb,
//       locationParam.city,
//       locationParam.county,
//       locationParam.state_district,
//     ].filter(Boolean); // Remove undefined or empty values

//     if (searchTerms.length === 0) {
//       return res.json({
//         message:
//           "No valid search terms found. Please provide detailed location data.",
//       });
//     }

//     // Create a regex pattern to match any of the terms
//     const searchRegex = new RegExp(searchTerms.join("|"), "i");

//     // Build the query
//     let query = { location: { $regex: searchRegex } };

//     // Sort and limit options
//     let options = {};
//     if (sortBy) {
//       options.sort = { [sortBy]: -1 }; // Sort by the provided field in descending order
//     }
//     if (limit) {
//       options.limit = parseInt(limit, 10); // Convert limit to number
//     }

//     // Fetch data from the database
//     const response = await Restaurant.find(query, null, options);
//     console.log(response);
//     console.log("Database query executed");

//     // Handle the case when no restaurants are found
//     if (!response || response.length === 0) {
//       return res.json({
//         message: `No restaurent found.`,
//       });
//     }

//     // Cache the results in Redis
//     client.setEx(cacheKey, 600, JSON.stringify(response));

//     // Return the response
//     return res.status(200).json({ data: response });
//   } catch (error) {
//     console.error("Error in getRestaurentsByLocation API:", error);
//     return res.status(500).json({
//       message: "An unexpected error occurred. Please try again later.",
//     });
//   }
// };

// export default getTopRatedRestaurent;

import client from "../config/redis.js";
import Restaurant from "../models/restaurentModel.js";

const getTopRatedRestaurent = async (req, res) => {
  try {
    let { locationParam, sortBy = "rating", limit = 10 } = req.query;

    // 🔹 Handle locationParam if it's a string (Fixing JSON parsing issue)
    if (typeof locationParam === "string") {
      try {
        locationParam = JSON.parse(locationParam); // Convert to object
      } catch (error) {
        return res.status(400).json({ message: "Invalid locationParam format." });
      }
    }

    // 🔹 Validate locationParam (Ensure required fields exist)
    if (!locationParam || (!locationParam.displayName && !locationParam.name)) {
      return res.status(400).json({ message: "Invalid or missing location parameter." });
    }

    // 🔹 Validate and fix sorting field (Prevent MongoDB errors)
    const validSortFields = ["rating", "reviews", "popularity"];
    const sortField = validSortFields.includes(sortBy) ? sortBy : "rating"; // Default to "rating"

    // 🔹 Validate and fix limit value
    const limitValue = parseInt(limit, 10);
    if (isNaN(limitValue) || limitValue <= 0) {
      return res.status(400).json({ message: "Invalid limit value." });
    }

    // 🔹 Generate a proper cache key (Including sorting & limit)
    const cacheKey = `TopRatedRestaurants:${locationParam.name || locationParam.displayName}:${sortField}:${limitValue}`;

    // 🔹 Check Redis cache
    try {
      const cachedResults = await client.get(cacheKey);
      if (cachedResults) {
        console.log("✅ Cache hit: Serving data from Redis");
        return res.status(200).json({ data: JSON.parse(cachedResults) });
      }
    } catch (redisError) {
      console.error("❌ Redis Error:", redisError);
    }

    // 🔹 Prepare search terms
    const searchTerms = [
      locationParam.name,
      locationParam.displayName,
      locationParam.suburb,
      locationParam.city,
      locationParam.county,
      locationParam.state_district,
    ].filter(Boolean); // Remove undefined values

    if (searchTerms.length === 0) {
      return res.status(400).json({ message: "No valid search terms found." });
    }

    // 🔹 Create a regex pattern for searching locations
    const searchRegex = new RegExp(searchTerms.join("|"), "i");

    // 🔹 Build MongoDB Query
    const query = { location: { $regex: searchRegex } };

    // 🔹 Fetch restaurants (Optimized with `.lean()` for performance)
    const restaurants = await Restaurant.find(query)
      .sort({ [sortField]: -1 }) // Sorting in descending order
      .limit(limitValue)
      .lean(); // Convert to plain JSON objects (Faster response)

    // 🔹 Handle case when no restaurants are found
    if (!restaurants || restaurants.length === 0) {
      return res.json({ message: "No restaurants found." });
    }

    // 🔹 Cache results in Redis (expires in 10 minutes)
    try {
      await client.setEx(cacheKey, 600, JSON.stringify(restaurants));
    } catch (redisError) {
      console.error("❌ Redis Cache Set Error:", redisError);
    }

    return res.status(200).json({ data: restaurants });

  } catch (error) {
    console.error("❌ Error in getTopRatedRestaurent API:", error);
    return res.status(500).json({ message: "An unexpected error occurred. Please try again later." });
  }
};

export default getTopRatedRestaurent;
