import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const ProductCategory = () => {
    const { products } = useAppContext()
    const { category } = useParams()
    const searchCategory = categories.find((item) => item.path.toLowerCase() === category)
    const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)
  return (
    <div className='mt-16'>
      {searchCategory && (
        <div className='flex flex-col items-end w-max'>
            <p className='text-2xl md:text-3xl font-medium'>{searchCategory.text.toUpperCase()}</p>
            <div className='w-39 h-0.5 bg-primary rounded-full'></div>
        </div>
      )}
      {filteredProducts.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-10'>
            {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center mt-10'> 
            <p className='text-2xl md:text-3xl font-medium'>No products found.</p>
        </div>
      )}
    </div>
  )
}

export default ProductCategory
