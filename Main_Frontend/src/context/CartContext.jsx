import { createContext, useState, useContext } from "react";

// Create the context
const CartContext = createContext();

// Create a provider component
const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState({}); // Cart state to store items

  // Add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item.id]) {
        // If the item already exists in the cart, increase its quantity
        newCart[item.id].quantity += 1;
      } else {
        // If the item is new, add it to the cart
        newCart[item.id] = { ...item, quantity: 1 };
      }
      return newCart;
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[itemId]; // Remove the item from the cart
      return newCart;
    });
  };

  // Update the quantity of an item in the cart
  const updateQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemId]) {
        newCart[itemId].quantity = quantity; // Update the quantity
      }
      return newCart;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart({});
  };

  // Calculate the total number of items in the cart
  const getTotalItems = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate the total price of items in the cart
  const getTotalPrice = () => {
    return Object.values(cart).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Context value
  const contextValue = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
};

export { CartContext, CartContextProvider, useCart };