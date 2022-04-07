import { CategoryItem } from '../categories/category.types';

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  SET_IS_CART_OPEN = 'SET_IS_CART_OPEN',
}

export type CartItem = {
  quantity: number;
} & CategoryItem
