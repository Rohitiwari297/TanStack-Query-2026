import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

const Products = () => {


    async function apiFunction () {
        const response = await fetch('https://dummyjson.com/products')
        const data = await response.json()
        console.log('data',data)
        return data?.products
    }

    const {isLoading, error, data: products} = useQuery({
        queryKey:['products'],
        queryFn: apiFunction,
        // staleTime: 100000    // isko har request ke sath bhi use kr skte hain or globally bhi use kr skte hai main.jsx me QueryClient() me default option obj ke sath
    })





    // const [products, setPoducts] = useState([])
    // const [isLoading, setIsLoading] = useState(false)
    // const [error, setError] = useState()

    // useEffect(() => {
    //     async function apiFunction () {
    //         try {
    //             setIsLoading(true)
    //             setError(null)
    //             const response = await fetch('https://dummyjson.com/products')
    //             const data = await response.json()
    //             console.log('data',data)
    //             setPoducts(data.products)
    //             setIsLoading(false)
    //         } catch (error) {
    //             setError(error.message)
    //             setIsLoading(false)
    //         }
            
    //     }
    //     apiFunction();
    // }, [])

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1><span className='text-red-500'>Error:</span> {error.message}</h1>
    }

    console.log('product', products)
    return (
        <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="font-weight-500">Products</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
                <Link key={product.id} to={`/products/${product.id}`}>
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-7/8">
                    <img
                    alt={product.imageAlt}
                    src={product.images}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                
                </Link>
            ))}
            </div>
        </div>
        </div>
  );
};

export default Products;
