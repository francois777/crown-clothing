import { createSelector } from 'reselect'
// reselect is a library for creating memoized "selector" functions
import { RootState } from '../store'

import { CategoriesState } from './category.reducer'
import { CategoryMap } from './category.types'

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesFromStore) => categoriesFromStore.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category
      acc[title.toLowerCase()] = items
      return acc
    }, {} as CategoryMap)
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesFromStore) => categoriesFromStore.isLoading
)
