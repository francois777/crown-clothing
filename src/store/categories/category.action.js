import CATEGORIES_ACTION_TYPES from './category.types'

import { createAction } from "../../utils/reducer/reducer.utils"
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

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

export const fetchCategoriesAsync = () => async(dispatch) => {
  dispatch(fetchCategoriesStart())

  try {
    const categories = await getCategoriesAndDocuments('categories')
    dispatch(fetchCategoriesSuccess(categories))
  } catch (error) {
    dispatch(fetchCategoriesFailed(error))
  }
}
