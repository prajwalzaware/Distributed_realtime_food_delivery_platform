import cartModel from "../models/cartModel.js";

const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body; // Extract userId from middleware

        // ✅ Find the user's cart in the database
        const cart = await cartModel.findOne({ userId });
        console.log(userId);

        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ message: "Cart is empty", cart: { items: [] } });
        }

        return res.status(200).json({ message: "Cart retrieved successfully", cart });
    } catch (error) {
        console.error("❌ Error fetching user cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default getUserCart;
