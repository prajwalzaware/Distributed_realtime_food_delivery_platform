// config/cloudinaryConfig.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure storage settings for image uploads
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'restaurant_images',  // Customize this folder name as needed
    allowed_formats: ['jpg', 'png', 'jpeg','webp'],
  },
});

export { cloudinary, storage };

// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// import dotenv from 'dotenv';

// dotenv.config();

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Configure Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'restaurant_images', // Folder where images will be stored
//     allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Allowed file formats
//   },
// });

// // Multer middleware
// const upload = multer({ storage });

// export { upload, cloudinary };
