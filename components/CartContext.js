import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Load cart from localStorage on first load
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever cartProducts changes
    if (cartProducts?.length >= 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function addProduct(productId) {
    setCartProducts(prev => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts(prev => {
      const index = prev.lastIndexOf(productId); // Find the last occurrence
      if (index !== -1) {
        const updatedCart = [...prev]; // Create a copy of the array
        updatedCart.splice(index, 1); // Remove the product from the cart
        return updatedCart; // Return the updated cart
      }
      return prev; // If the product isn't found, return the original cart
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
