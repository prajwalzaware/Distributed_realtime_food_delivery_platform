// // import Cart from "../models/cartModel.js";

// // const itemLocalStorageToDb = async (req, res) => {
// //     try {
// //         const { userId, menuId, restaurantId, category, menuName, price, description, isVegetarian, image, quantity } = req.body;

// //         let cart = await Cart.findOne({ userId });

// //         if (cart) {
// //             const existingItem = cart.items.find(item => item.menuId.toString() === menuId);
// //             if (existingItem) {
// //                 existingItem.quantity += quantity;
// //             } else {
// //                 cart.items.push({ menuId, restaurantId, category, menuName, price, description, isVegetarian, image, quantity });
// //             }
// //             cart.updatedAt = Date.now();
// //             await cart.save();
// //         } else {
// //             cart = new Cart({
// //                 userId,
// //                 items: [{ menuId, restaurantId, category, menuName, price, description, isVegetarian, image, quantity }]
// //             });
// //             await cart.save();
// //         }
// //         console.log(req.body);

// //         return res.status(200).json({ message: "Cart updated successfully" });
// //     } catch (error) {
// //         return res.status(500).json({ message: error.message });
// //     }
// // };

// // export default itemLocalStorageToDb;


// // // // {
// // // //     "67926eedcb8e588bdbdde135": {
// // // //         "_id": "67926eedcb8e588bdbdde135",
// // // //         "restaurantId": "6792656f2a332a9637dcbe99",
// // // //         "category": "Cheese Volcano",
// // // //         "menuName": "Mexican Paneer Volcano",
// // // //         "price": 290,
// // // //         "description": "Best Volcano pizza with the toppings of panner in mexican sause",
// // // //         "isVegetarian": true,
// // // //         "image": [
// // // //             "https://res.cloudinary.com/dhvuiucam/image/upload/v1737649900/restaurant_images/tqvvpnvh8sejg49hwybw.webp"
// // // //         ],
// // // //         "createdAt": "2025-01-23T16:31:41.813Z",
// // // //         "updatedAt": "2025-01-23T16:31:41.813Z",
// // // //         "__v": 0,
// // // //         "quantity": 2
// // // //     },
// // // //     "67926da3cb8e588bdbdde133": {
// // // //         "_id": "67926da3cb8e588bdbdde133",
// // // //         "restaurantId": "6792656f2a332a9637dcbe99",
// // // //         "category": "Cheese Volcano",
// // // //         "menuName": "Paneer Volcano",
// // // //         "price": 270,
// // // //         "description": "Best Volcano pizza with the toppings of panner",
// // // //         "isVegetarian": true,
// // // //         "image": [
// // // //             "https://res.cloudinary.com/dhvuiucam/image/upload/v1737649571/restaurant_images/c9uxf3v2je1nlba3huua.jpg"
// // // //         ],
// // // //         "createdAt": "2025-01-23T16:26:11.544Z",
// // // //         "updatedAt": "2025-01-23T16:26:11.544Z",
// // // //         "__v": 0,
// // // //         "quantity": 1
// // // //     },
// // // //     "67937da52cce7210ac73a665": {
// // // //         "_id": "67937da52cce7210ac73a665",
// // // //         "restaurantId": "6792656f2a332a9637dcbe99",
// // // //         "category": "Best Combos",
// // // //         "menuName": "Mexican Paneer + Sizzler",
// // // //         "price": 290,
// // // //         "description": "Best Volcano pizza with the toppings of panner in mexican sause",
// // // //         "isVegetarian": true,
// // // //         "image": [
// // // //             "https://res.cloudinary.com/dhvuiucam/image/upload/v1737719203/restaurant_images/b4wenx9ofgejm0seni9q.webp"
// // // //         ],
// // // //         "createdAt": "2025-01-24T11:46:45.723Z",
// // // //         "updatedAt": "2025-01-24T11:46:45.723Z",
// // // //         "__v": 0,
// // // //         "quantity": 1
// // // //     },
// // // //     "67937db62cce7210ac73a667": {
// // // //         "_id": "67937db62cce7210ac73a667",
// // // //         "restaurantId": "6792656f2a332a9637dcbe99",
// // // //         "category": "Best Combos",
// // // //         "menuName": "Mexican Paneer + burger",
// // // //         "price": 290,
// // // //         "description": "Best Volcano pizza with the toppings of panner in mexican sause",
// // // //         "isVegetarian": true,
// // // //         "image": [
// // // //             "https://res.cloudinary.com/dhvuiucam/image/upload/v1737719220/restaurant_images/fxdjofm6nzi6cif4sok8.webp"
// // // //         ],
// // // //         "createdAt": "2025-01-24T11:47:02.227Z",
// // // //         "updatedAt": "2025-01-24T11:47:02.227Z",
// // // //         "__v": 0,
// // // //         "quantity": 1
// // // //     }
// // // // }

// import cartModel from "../models/cartModel.js";

// const itemLocalStorageToDb = async (req, res) => {
//   try {
//     // // console.log("Received Cart Data:", req.body);

//     // // Ensure request contains valid items
//     // if (!req.body.items || typeof req.body.items !== "object") {
//     //   return res.status(400).json({ message: "Invalid cart items format" });
//     // }

//     const { userId } = req.body; // userId comes from middleware
//     const itemsArray = Object.keys(req.body.items).map((key) => {
//       let item = req.body.items[key];
//       return {
//         menuId: item._id, // Map _id to menuId
//         restaurantId: item.restaurantId,
//         category: item.category,
//         menuName: item.menuName,
//         price: item.price,
//         description: item.description,
//         isVegetarian: item.isVegetarian,
//         image: item.image,
//         quantity: item.quantity || 1,
//       };
//     });

//     // Find cart for user
//     let cart = await cartModel.findOne({ userId });

//     if (cart) {
//       // Update existing cart
//       itemsArray.forEach((newItem) => {
//         const existingItem = cart.items.find((item) =>
//           item.menuId.equals(newItem.menuId)
//         );
//         if (existingItem) {
//           existingItem.quantity += newItem.quantity;
//         } else {
//           cart.items.push(newItem);
//         }
//       });
//       cart.updatedAt = Date.now();
//       await cart.save();
//     } else {
//       // Create new cart
//       cart = new cartModel({
//         userId,
//         items: itemsArray,
//       });
//       await cart.save();
//     }

//     return res.status(200).json({ message: "Cart updated successfully", cart });
//   } catch (error) {
//     console.error("Cart update error:", error);
//     return res.status(500).json({ message: error.message });
//   }
// };

// export default itemLocalStorageToDb;


import cartModel from "../models/cartModel.js";

const itemLocalStorageToDb = async (req, res) => {
  try {
    const { userId, items } = req.body;

    console.log("🔹 Received Cart Data:", req.body); // ✅ DEBUGGING LOG
    console.log("🔹 Items Object Keys:", Object.keys(items)); // ✅ DEBUGGING LOG

    const itemsArray = Object.keys(items).map((key) => {
      let item = items[key];
      return {
        menuId: item._id,
        restaurantId: item.restaurantId,
        category: item.category,
        menuName: item.menuName,
        price: item.price,
        description: item.description,
        isVegetarian: item.isVegetarian,
        image: item.image,
        quantity: item.quantity || 1,
      };
    });

    console.log("🔹 Parsed Items Array:", itemsArray); // ✅ DEBUGGING LOG

    let cart = await cartModel.findOne({ userId });

    if (cart) {
      if (itemsArray.length === 0) {
        console.log("🛑 No items left, deleting cart from DB..."); // ✅ DEBUGGING LOG
        await cartModel.deleteOne({ userId });
        return res.status(200).json({ message: "Cart deleted successfully" });
      }

      console.log("🟢 Updating Cart...");
      cart.items = itemsArray;
      cart.updatedAt = Date.now();
      await cart.save();
    } else {
      if (itemsArray.length > 0) {
        console.log("🟢 Creating New Cart...");
        cart = new cartModel({
          userId,
          items: itemsArray,
        });
        await cart.save();
      }
    }

    return res.status(200).json({ message: "Cart updated successfully", cart });
  } catch (error) {
    console.error("❌ Cart update error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export default itemLocalStorageToDb;
