import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'

const Product = () => {
    const params = useParams()

    // 
    const fetchProduct = async () => {
        const response = await fetch(`https://dummyjson.com/products/${params.productId}`)
        const data = await response.json();
        return data;
    }

    const {isLoading, error, data: product} = useQuery({
        queryKey: ['Product', params.productId],
        queryFn: fetchProduct
    })


        // Mutation -> method put
    const mutation = useMutation({       // yahab mutation ek object return krta hai, isi me isLoading, isError hota hai
        mutationFn: (receiveData) => {
            console.log('receiveData', receiveData)
            return axios.put(`https://dummyjson.com/products/${params.productId}`, receiveData)
        }
    })



    if (isLoading) {
        return <h1>Loading...</h1>
    }

    if (error) {
        return <h1>Error: {error.message}</h1>
    }


    if (mutation.isPending) {
        return <h1>Updating...</h1>
    }

    if (mutation.isError) {
         return <h1>Error: {mutation.error.message}</h1>
    }


    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Back Link */}
            <Link
            to="/products"
            className="inline-block text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
            >
            &larr; Back to Products
            </Link>

            {/* Product Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-100">
            {/* Left: Product Image */}
            <div className="bg-gray-50 rounded-xl flex items-center justify-center p-6 h-80 md:h-96 border">
                <img
                src={product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-between">
                <div>
                {/* Category & Brand */}
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full uppercase">
                    {product.category}
                    </span>
                    {product.brand && (
                    <span className="text-xs text-gray-500 font-medium">• {product.brand}</span>
                    )}
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                </h1>

                {/* Rating & Stock */}
                <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className="bg-yellow-100 text-yellow-800 font-semibold px-2 py-0.5 rounded">
                    ★ {product.rating}
                    </span>
                    <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 mb-5">
                    <span className="text-3xl font-extrabold text-gray-900">${product.price}</span>
                    {product.discountPercentage > 0 && (
                    <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                        {product.discountPercentage}% OFF
                    </span>
                    )}
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {product.description}
                </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <button 
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition cursor-pointer"
                        onClick={() => {
                            mutation.mutate({title: 'Updated Title'})
                        }}
                        >
                        Edit Now
                    </button>
                    <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition">
                        Buy Now
                    </button>
                </div>
                <button className="flex-1 bg-blue-600 mt-2 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition">
                    Add to Cart
                </button>
            </div>
            </div>
        </div>
    );
};

export default Product;
