import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const {products, searchQuery} = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([]);
    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        } else {
            setFilteredProducts(products);
        }
    },[products, searchQuery])
  return (
    <div className='flex flex-col mt-16'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl md:text-3xl font-medium uppercase'>All products</p>
        <div className='w-39 h-0.5 bg-primary rounded-full'></div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8'>
        {filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  )
}

export default AllProducts
