// // import mongoose from "mongoose";
// import client from "../config/redis.js";
// import Restaurant from "../models/restaurentModel.js";

// const getFoodRestaurants = async (req, res) => {
//   try {
//     const { item, location } = req.query; // Extract location from query parameters
//     const cacheKey = `restaurants:${item}:${location.name}`;
//     console.log(cacheKey);
//     const cachedResults = await client.get(cacheKey);

//     if (cachedResults) {
//       console.log("Cache hit: Serving data from Redis");
//       return res.status(200).json({ data: JSON.parse(cachedResults) });
//     }

//     // const {location} = req.query;
//     console.log(location, item);
//     const searchTerms = [
//       location.name,
//       location.displayName,
//       location.suburb,
//       location.city,
//       location.county,
//       location.state_district,
//     ].filter(Boolean); // Remove undefined or empty values

//     // Create a regex pattern to match any of the terms
//     const searchRegex = new RegExp(searchTerms.join("|"), "i");

//     // Construct the MongoDB query
//     const results = await Restaurant.find({
//       $and: [
//         { location: { $regex: searchRegex } }, // Match location
//         {
//           $or: [
//             { category: { $regex: new RegExp(item, "i") } }, // Match in 'category'
//             { subCategory: { $regex: new RegExp(item, "i") } }, // Match in 'subCategory'
//           ],
//         },
//       ],
//     });
//     console.log(results);
//     console.log("db call done")

//     // Check if any results were found
//     if (!results || results.length === 0) {
//       return res.json({ message: "no restaurent found." });
//     }

//     // Return the results
//     client.setEx(cacheKey, 600, JSON.stringify(results));
//     return res.status(200).json({ data: results });
//   } catch (error) {
//     console.error("Error searching in database:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// export default getFoodRestaurants;

import client from "../config/redis.js";
import Restaurant from "../models/restaurentModel.js";

const getFoodRestaurants = async (req, res) => {
  try {
    const { item, location } = req.query;
    if (!item || !location) {
      return res
        .status(400)
        .json({ message: "Item and location are required." });
    }

    const cacheKey = `restaurants:${item}:${JSON.stringify(location)}`;
    console.log("Cache Key:", cacheKey);

    // Check Redis cache
    let cachedResults;
    try {
      cachedResults = await client.get(cacheKey);
    } catch (redisError) {
      console.error("Redis Error:", redisError);

      //       client.get(cacheKey) returns a Promise
      // In JavaScript, Redis client operations are asynchronous.
      // This means client.get(cacheKey) does not return the actual data immediately.
      // Instead, it returns a Promise, which is a placeholder for future data.

      //       await cachedResultsPromise waits for the result
      // Since cachedResultsPromise is a Promise, we use await to wait for the actual value.
      // This makes sure cachedResults gets the final resolved value.
    }

    if (cachedResults) {
      console.log("Cache hit: Serving data from Redis");
      return res.status(200).json({ data: JSON.parse(cachedResults) });
    }

    console.log("Cache miss: Fetching from DB");

    const searchTerms = [
      location.name,
      location.displayName,
      location.suburb,
      location.city,
      location.county,
      location.state_district,
    ].filter(Boolean);

    const searchRegex = new RegExp(searchTerms.join("|"), "i");

    const results = await Restaurant.find({
      $and: [
        { location: { $regex: searchRegex } },
        {
          $or: [
            { category: { $regex: new RegExp(item, "i") } },
            { subCategory: { $regex: new RegExp(item, "i") } },
          ],
        },
      ],
    });

    console.log("DB call done");

    if (!results || results.length === 0) {
      return res.json({ message: "No restaurant found." });
    }

    // Cache the data for 10 minutes
    try {
      client.setEx(cacheKey, 600, JSON.stringify(results));
    } catch (redisError) {
      console.error("Redis Set Error:", redisError);
    }

    return res.status(200).json({ data: results });
  } catch (error) {
    console.error("Error searching in database:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default getFoodRestaurants;
