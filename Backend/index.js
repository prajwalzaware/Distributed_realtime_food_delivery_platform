import express from "express";
import { connectDB } from "./config/db.js";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import client from "./config/redis.js";
// import {
//   connectToScylla,
//   createKeyspace,
//   createTable,
// } from "../Backend/config/scyllaDb.js";

// .env file config
dotenv.config();

// created the instance of express
const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from env or default to 3000

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Match this to your frontend URL exactly
    credentials: true, // Allows cookies to be included in requests
  })
);

// (async () => {
//   await connectToScylla();
//   await createKeyspace();
//   await createTable();
// })();

// Start the server and wrap it inside an async function
const startServer = async () => {
  try {
    // database connection
    await connectDB();

    // Redis connection
    await client.connect();
    
    //scylla connection
    // await connectToScylla();
    // await createKeyspace();
    // await createTable();

    // router
    app.use("/", router);

    // listener
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
    process.exit(1); // Exit the process with failure code
  }
};

startServer(); // Call the async function to start the server
