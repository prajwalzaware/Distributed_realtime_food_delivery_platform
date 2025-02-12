// routes/mainRouter.js
import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinaryConfig.js";
import registerUser from "../controller/registerUser.js";
import loginUser from "../controller/loginUser.js";
import logOutUser from "../controller/logOutUser.js";
import verify_email from "../controller/verify_email.js";
import verify_mobileNo from "../controller/verify_mobileNo.js";
import set_password from "../controller/set_password.js";
import checkEmailVerified from "../controller/checkEmailVerified.js";
import authCheck from "../controller/authCheck.js";
import getTokenExpiry from "../controller/getTokenExpiry.js";
import profileDetails from "../controller/profileDetails.js";
import authMiddleware from "../middleware/authMiddleware.js";
import uploadRestoDataImage from "../controller/uploadRestoDataImage.js";
import getFoodRestaurents from "../controller/getFoodRestaurents.js";
import getRestaurentsByLocation from "../controller/getRestaurentsByLocation.js";
import getTopRatedRestaurent from "../controller/getTopRatedRestaurent.js";
import getRestauretByRestaurentId from "../controller/getRestauretByRestaurentId.js";
import uploadRestaurentMenu from "../controller/uploadRestaurentMenu.js";
import getRestauretMenusByRestaurentId from "../controller/getRestauretMenusByRestaurentId.js";
import itemLocalStorageToDb from "../controller/itemLocalStorageToDb.js";
import getUserCart from "../controller/getUserCart.js";
// import getScylla from "../controller/getScylla.js";
// import scyllaAdd from "../controller/scyllaAdd.js";

// Create an instance of the router
const router = express.Router();

const upload = multer({ storage }).fields([
  { name: 'mainRestaurentImage', maxCount: 1 },
  { name: 'images', maxCount: 12 },
]);


const menuUpload = multer({ storage }).fields([
  
  { name: 'image', maxCount: 1 },
]);


// Routes
router.post("/user/registerUser", registerUser);
router.post("/user/loginUser", loginUser);

router.get("/verify/checkEmailVerified", checkEmailVerified);
router.get("/verify/verify_email", verify_email);
router.post("/verify/verify_mobileNo", verify_mobileNo);

router.post("/user/set_password", set_password);
router.get("/user/profileDetails", authMiddleware, profileDetails);
router.get("/user/logOutUser", authMiddleware, logOutUser);

router.get("/auth/check", authCheck);
router.get("/auth/getTokenExpiry",authMiddleware, getTokenExpiry);

router.post("/restaurent/uploadRestoDataImage", upload, uploadRestoDataImage);
router.get("/restaurent/getRestaurentsByLocation", getRestaurentsByLocation);
router.get("/restaurent/getTopRatedRestaurent", getTopRatedRestaurent);
router.get("/restaurent/getFoodRestaurents",getFoodRestaurents);
router.get("/restaurent/getRestauretByRestaurentId",getRestauretByRestaurentId);
router.get("/restaurent/getRestauretMenusByRestaurentId",getRestauretMenusByRestaurentId);
router.post("/restaurent/uploadRestaurentMenu",menuUpload,uploadRestaurentMenu);

router.post("/cart/itemLocalStorageToDb",authMiddleware,itemLocalStorageToDb)
router.get("/cart/getUserCart",authMiddleware,getUserCart)


// router.post("/scylla/add", scyllaAdd);
// router.get("/scylla/get", getScylla);

export default router;
