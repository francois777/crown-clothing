import { createContext, useState, useEffect } from 'react'

const addCartItem = (cartItems, stockItem) => {
  // find if cartItems contains productToAdd
  const result = cartItems.find(cartItem =>
    cartItem.id === stockItem.id
  )

  // If found, increment quantity
  if (result) {
    // increment quantity
    return cartItems.map((cartItem) => cartItem.id === stockItem.id ?
      {...cartItem, quantity: cartItem.quantity + 1 } :
      cartItem
    )
  }
  // else, include new item
  return [...cartItems, {...stockItem, quantity: 1}]
}

const removeCartItem = (cartItems, stockItem) => {
  // Find item to remove or modify
  const foundItem = cartItems.find(cartItem => cartItem.id === stockItem.id)
  if (foundItem === undefined) return;
  // if quantity EQ 1, remove item from cart
  if (foundItem.quantity === 1) {
    return cartItems.filter(item => (item.id !== foundItem.id))
  }

  // Return cart items with a reduced count
  return cartItems.map(cartItem => (
    (cartItem.id === foundItem.id) ?
    { ...cartItem, quantity: cartItem.quantity - 1} :
    cartItem
  ))
}

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  // EFFECTS:
  // The reason for two useEffects is to maintain a
  // single responsibility per useEffect

  // Whenever a cart item is added to or removed from the cart,
  // counts and totals are affected

  useEffect(() => {
    const count = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(count);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product))
  }
  const removeItemFromCart = (product) => {
    setCartItems(removeCartItem(cartItems, product))
  }

  const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCartItem(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
