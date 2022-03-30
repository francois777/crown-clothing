import { createContext, useState, useReducer } from 'react'
import { createAction } from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, stockItem) => {
  // find if cartItems contains productToAdd
  const foundItem = cartItems.find(cartItem =>
    cartItem.id === stockItem.id
  )

  // If found, increment quantity
  if (foundItem) {
    // increment quantity
    return cartItems.map((cartItem) => cartItem.id === stockItem.id
      ? {...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }
  // else, include new item
  return [...cartItems, {...stockItem, quantity: 1}]
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL"
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const { type, payload } = action

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.IS_CART_OPEN:
      return {
        ...state,
        ...payload,
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`)
  }
}

const clearCartItem = (cartItems, cartItemToClear) => (
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id));

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
  const [isCartOpen, setIsCartOpen] = useState(false);

  /* Get all the state values */
  const [{
    cartCount, cartTotal, cartItems }, dispatch
  ] = useReducer(cartReducer, INITIAL_STATE)

  const updateCartItemsReducer = (newCartItems) => {
    /* Derive newCartTotal and newCartCount from newCartItems */
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount
      })
    )
  }

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product)
    updateCartItemsReducer(newCartItems)
  }
  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product)
    updateCartItemsReducer(newCartItems)
  }
  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems)
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
