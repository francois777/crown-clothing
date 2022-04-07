import { AnyAction } from 'redux'
import { Category } from './category.types'

import {
  fetchCategoriesStart, 
  fetchCategoriesSuccess,
  fetchCategoriesFailed
} from './category.action'

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
}

const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
}

// After compiling everything to javascript, Redux, in reality, still dispatch
// all actions to this reducer
export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {} as AnyAction
): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true }
  }
  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false}
  }
  if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false }
  }
  return state
}
