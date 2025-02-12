// import client from "../config/redis.js";
// import Restaurant from "../models/restaurentModel.js";

// const getRestaurentsByLocation = async (req, res) => {
//   try {
//     const { locationParam } = req.query;

//     // Validate input
//     if (!locationParam || (!locationParam.displayName && !locationParam.name)) {
//       return res.status(400).json({
//         message:
//           "Invalid or missing location parameter. Please provide a valid location.",
//       });
//     }

//     console.log("Received locationParam:", locationParam);

//     const cacheKey = `restaurants:${
//       locationParam?.name || locationParam?.displayName
//     }`;
//     console.log("Cache Key:", cacheKey);

//     // Check Redis cache
//     const cachedResults = await client.get(cacheKey);
//     if (cachedResults) {
//       console.log("Cache hit: Serving data from Redis");
//       return res.status(200).json({ data: JSON.parse(cachedResults) });
//     }

//     // Prepare search terms
//     const searchTerms = [
//       locationParam.displayName,
//       locationParam.name,
//       locationParam.suburb,
//       locationParam.city,
//       locationParam.county,
//       locationParam.state_district,
//     ].filter(Boolean); // Remove undefined or empty values

//     if (searchTerms.length === 0) {
//       return res.status(400).json({
//         message:
//           "No valid search terms found. Please provide detailed location data.",
//       });
//     }

//     // Create a regex pattern to match any of the terms
//     const searchRegex = new RegExp(searchTerms.join("|"), "i");

//     // Build the query
//     const query = { location: { $regex: searchRegex } };

//     const response = await Restaurant.find(query);
//     console.log("Database query executed:", response);

//     // Handle the case when no restaurants are found
//     if (!response || response.length === 0) {
//       return res.json({
//         message: "No restaurants found.",
//       });
//     }

//     // Cache the results in Redis
//     await client.setEx(cacheKey, 600, JSON.stringify(response));

//     // Return the response
//     return res.status(200).json({ data: response });
//   } catch (error) {
//     console.error("Error in getRestaurentsByLocation API:", error);
//     return res.status(500).json({
//       message: "An unexpected error occurred. Please try again later.",
//     });
//   }
// };

// export default getRestaurentsByLocation;

import client from "../config/redis.js";
import Restaurant from "../models/restaurentModel.js";

const getRestaurentsByLocation = async (req, res) => {
  try {
    let { locationParam } = req.query;

    // Parse locationParam if it's a string (to handle query param parsing issues)
    if (typeof locationParam === "string") {
      try {
        locationParam = JSON.parse(locationParam);
      } catch (error) {
        return res.status(400).json({
          message: "Invalid location format. Must be a valid JSON object.",
        });
      }
    }

    // Validate input
    if (!locationParam || (!locationParam.displayName && !locationParam.name)) {
      return res.status(400).json({
        message:
          "Invalid or missing location parameter. Please provide a valid location.",
      });
    }

    console.log("Received locationParam:", locationParam);

    const cacheKey = `restaurants:${locationParam?.name || locationParam?.displayName}`;
    console.log("Cache Key:", cacheKey);

    // Check Redis cache
    let cachedResults;
    try {
      cachedResults = await client.get(cacheKey);
    } catch (redisError) {
      console.error("Redis Error:", redisError);
      cachedResults = null; // Ensure fallback if Redis fails
    }

    if (cachedResults) {
      console.log("Cache hit: Serving data from Redis");
      return res.status(200).json({ data: JSON.parse(cachedResults) });
    }

    console.log("Cache miss: Fetching from DB");

    // Prepare search terms
    const searchTerms = [
      locationParam.displayName,
      locationParam.name,
      locationParam.suburb,
      locationParam.city,
      locationParam.county,
      locationParam.state_district,
    ].filter(Boolean); // Remove undefined or empty values

    if (searchTerms.length === 0) {
      return res.status(400).json({
        message: "No valid search terms found. Please provide detailed location data.",
      });
    }

    // Optimized MongoDB query (avoid regex when possible)
    const query = {
      $or: searchTerms.map(term => ({ location: term })),
    };

    const response = await Restaurant.find(query);
    console.log("Database query executed:", response.length, "results found.");

    // Handle the case when no restaurants are found
    if (!response || response.length === 0) {
      return res.json({ message: "No restaurants found." });
    }

    // Cache the results in Redis for 10 minutes (600 seconds)
    try {
      await client.setEx(cacheKey, 600, JSON.stringify(response));
    } catch (redisError) {
      console.error("Redis Set Error:", redisError);
    }

    // Return the response
    return res.status(200).json({ data: response });
  } catch (error) {
    console.error("Error in getRestaurentsByLocation API:", error);
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export default getRestaurentsByLocation;
