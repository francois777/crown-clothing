import { useState, useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectCategoriesMap } from '../../store/categories/category.selector'
import ProductCard from '../../components/product-card/product-card.component'
import { CategoryContainer, TitleContainer } from './category.styles'

const Category = () => {
  const { category } = useParams()

  // A state defined in CategoriesProvider is `categoriesMap`
  const categoriesMap = useSelector(selectCategoriesMap)
  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <TitleContainer>{category.toUpperCase()}</TitleContainer>
      <CategoryContainer>
        {products &&
         products.map((product) => (
           <ProductCard key={product.id} product={product} />
         ))}
      </CategoryContainer>
    </Fragment>
  );
};

export default Category
