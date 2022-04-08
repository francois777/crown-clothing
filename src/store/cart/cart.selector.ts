import { createSelector } from 'reselect'
import { RootState } from '../store'
// reselect is a library for creating memoized "selector" functions

import { CartState } from './cart.reducer'

const selectCartReducer = (state: RootState): CartState => state.cart;

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectCartCount = createSelector(
  [selectCartItems], (cartItems): number =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector(
  [selectCartItems], (cartItems): number =>
  cartItems.reduce((total, cartItem) =>
    total + cartItem.quantity * cartItem.price, 0
  )
);
