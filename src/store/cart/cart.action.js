import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types'

// There is no need for a Cart Action to amend cartItem.quantity
// Quantity is dealt with as a side effect of adding or removing
// cart items

const addCartItem = (cartItems, productToAdd) => {
  const foundItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  )

  if (foundItem) {
    // increment quantity
    return cartItems.map((cartItem) => cartItem.id === productToAdd.id
      ? {...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }
  return [...cartItems, {...productToAdd, quantity: 1}]
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const foundItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (foundItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product)
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
  const newCartItems = clearCartItem(cartItems, cartItemToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
