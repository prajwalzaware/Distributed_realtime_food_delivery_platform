import mongoose from "mongoose";

const restaurantMenusSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    }, // Reference to the Restaurant collection
    category: { type: String, required: true }, // e.g., Appetizers, Main Course, Desserts
    menuName: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String },
    isVegetarian: { type: Boolean, default: false },

    image: {
      type: [String],
    }, // Limit image count to 7 // URL or path to the menu item image
  },
  {
    timestamps: true, // adds createdAt and updatedAt timestamps
  }
);

const RestaurantMenus =
  mongoose.models.RestaurantMenus ||
  mongoose.model("RestaurantMenus", restaurantMenusSchema);

export default RestaurantMenus;
