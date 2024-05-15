import React, { useContext } from 'react';
import myContext from '../../../context/data/myContext';

function UpdateProduct() {
    const context = useContext(myContext);
    const { products, setProducts, updateProduct } = context;
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-gray-800 px-10 py-10 rounded-xl w-full max-w-3xl">
                <h1 className="text-center text-white text-xl mb-6 font-bold">Update Product</h1>
                <input
                    type="text"
                    value={products.title}
                    onChange={(e) => setProducts({ ...products, title: e.target.value })}
                    name="title"
                    className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none"
                    placeholder="Product Title"
                />
                <input
                    type="text"
                    value={products.price}
                    onChange={(e) => setProducts({ ...products, price: e.target.value })}
                    name="price"
                    className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none"
                    placeholder="Product Price"
                />
                <input
                    type="text"
                    value={products.imageUrl}
                    onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                    name="imageurl"
                    className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none"
                    placeholder="Product Image URL"
                />
                <input
                    type="text"
                    value={products.category}
                    onChange={(e) => setProducts({ ...products, category: e.target.value })}
                    name="category"
                    className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none"
                    placeholder="Product Category"
                />
                <textarea
                    cols="30"
                    rows="6"
                    name="description"
                    value={products.description}
                    onChange={(e) => setProducts({ ...products, description: e.target.value })}
                    className="bg-gray-600 mb-4 px-4 py-2 w-full rounded-lg text-white placeholder-gray-400 outline-none resize-none"
                    placeholder="Product Description"
                />
                <div className="flex justify-center">
                    <button
                        onClick={updateProduct}
                        className="bg-customOrange w-full text-black font-bold px-4 py-2 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
