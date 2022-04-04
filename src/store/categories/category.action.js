import CATEGORIES_ACTION_TYPES from './category.types'

import { createAction } from "../../utils/reducer/reducer.utils"

export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categories) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categories
  )

export const fetchCategoriesFailed = (error) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    error
  )
