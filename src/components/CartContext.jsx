import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id && 
                      cartItem.selectedColor === item.selectedColor && 
                      cartItem.selectedSize === item.selectedSize
      );

      if (existingItemIndex !== -1) {
        // If item exists and is discounted, add a new non-discounted item
        if (prevCart[existingItemIndex].discounted) {
          return [...prevCart, { ...item, quantity: 1, discounted: false }];
        } else {
          // If item exists and is not discounted, increase its quantity
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex].quantity += 1;
          return updatedCart;
        }
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      if (!updatedCart[index].discounted) {
        updatedCart[index].quantity = Math.max(1, newQuantity);
      }
      return updatedCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);