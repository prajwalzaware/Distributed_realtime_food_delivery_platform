// import mongoose from "mongoose";

// const cartSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel", required: true, unique: true },
//     items: [
//         {
//             menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
//             restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
//             category: { type: String, required: true },
//             menuName: { type: String, required: true },
//             price: { type: Number, required: true },
//             description: { type: String },
//             isVegetarian: { type: Boolean, required: true },
//             image: { type: [String], required: true },
//             quantity: { type: Number, required: true, default: 1 }
//         }
//     ],
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now }
// });

// // ✅ Use the correct model name
// const Cart = mongoose.models.Carts || mongoose.model("Carts", cartSchema);

// export default Cart;

import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel", required: true, unique: true },
    items: [
        {
            menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
            restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
            category: { type: String, required: true },
            menuName: { type: String, required: true },
            price: { type: Number, required: true },
            description: { type: String },
            isVegetarian: { type: Boolean, required: true },
            image: { type: [String], required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// ✅ Fix: Only delete the model if it exists
// if (mongoose.models.Cart) {
//     delete mongoose.models.Cart;
// }

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
