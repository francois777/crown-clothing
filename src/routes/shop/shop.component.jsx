import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'
import { fetchCategoriesAsync } from '../../store/categories/category.action'
import './shop.styles.scss'

const Shop = () => {
  const dispatch = useDispatch()

  // The next useEffect must only be executed once - to get the data inside
  // firebase. Then, dispatch() is used to save the data inside the Redux store.
  useEffect(() => {
      dispatch(fetchCategoriesAsync())
  }, [])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop
