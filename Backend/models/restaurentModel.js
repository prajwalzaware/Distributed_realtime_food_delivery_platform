import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
   
    restaurantName: { type: String, required: true },
    category: [{ type: String, required: true }],
    subCategory: [{ type: String, required: true }],
    location: { type: String, required: true, index: true },
    contact: { type: String, required: true },
    rating: { type: Number, min: 0, max: 5, default: 0 },
    averageDeliveryTime: { type: Number, required: true, min: 0 }, // in minutes
    averagePriceForOnePerson: { type: Number, required: true, min: 0 },
    offer: { type: Number, min: 0, max: 100, default: 0 }, // discount in percentage
    mainRestaurentImage: {
      type: [String],
      validate: [arrLimit, "`{PATH}` exceeds the limit of 1`"],
    }, // Limit image count to 1
    images: {
      type: [String],
      required: true,
      validate: [arrayLimit, "`{PATH}` exceeds the limit of 7`"],
    }, // Limit image count to 7
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

// Custom validator for image array length
function arrayLimit(val) {
  return val.length <= 12;
}
function arrLimit(val) {
  return val.length <= 1;
}

// Indexes for optimized queries
restaurantSchema.index({ location: 1 }); // Optimizes location-based queries
// restaurantSchema.index({ category: 1, subCategory: 1 }); // Optimizes $or on category and subCategory

restaurantSchema.index({ location: 1, rating: -1 }); // For top-rated restaurants

const Restaurant =
  mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
