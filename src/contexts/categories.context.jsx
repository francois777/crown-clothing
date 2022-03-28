import { createContext, useState, useEffect } from 'react'

//import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils'
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

// import SHOP_DATA from '../shop-data.js'

export const CategoriesContext = createContext({
  categoriesMap: {}
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})
  // The next useEffect could only be executed once - to get the data
  // inside firebase. It creates a collection called `categories`
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA)
  // }, [])

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  }, [])

  const value = { categoriesMap }

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  )
}


// [CategoriesProvider] - getCategoriesMap, categoryMap:
// {hats: Array(9), jackets: Array(5), mens: Array(6), sneakers: Array(8), womens: Array(7)}
// hats: (9) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// jackets: (5) [{…}, {…}, {…}, {…}, {…}]
// mens: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
// sneakers: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// womens: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
