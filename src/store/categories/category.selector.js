import { createSelector } from 'reselect'
// reselect is a library for creating memoized "selector" functions

const selectCategoryReducer = (state) => state.categories

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesFromStore) => categoriesFromStore.categories
)

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    return categories.reduce((acc, category) => {
      const { title, items } = category
      acc[title.toLowerCase()] = items
      return acc
    }, {})
  }
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)
