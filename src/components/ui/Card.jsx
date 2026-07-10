import { LoaderCircle, Delete, Edit, Eye, Pen, Star, Trash, View } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ImageSlider from './ImageSlider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';


function Card({ product, onQuickUpdate, onDelete }) {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const deleteProduct = async (id) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDNjYmQ0MzMwYTZjN2ZkYWZlOTc1ZiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MzY5MjUyMSwiZXhwIjoxNzg0MTI0NTIxfQ.R_56JGHqS45xRPLbH-y_wqCIfGtBnbVGQ42PY2jBjos';
    setLoading(true)
    try {
      const req = await axios.delete(
        `https://e-commerce-api-3wara.vercel.app/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      toast.success("Product Deleted Successfully");
      onDelete(id);
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="shadow-sm rounded-xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200">
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-full z-2 pointer-events-none">
          <p
            className={`absolute bottom-3 right-3 text-xs px-3 py-1.5 rounded-full font-medium ${product.stock
              ? "border-green-400 bg-green-100 dark:bg-green-900/40 dark:border-green-700 dark:text-green-300 text-green-700"
              : "bg-red-100 dark:bg-red-900/40 dark:text-red-300 text-red-400"
              }`}
          >
            {!product.stock ? "Out of Stock" : `${product.stock} in Stock`}
          </p>

          {product.featured && (
            <p className="absolute top-3 left-3 text-xs px-3 py-1.5 rounded-full font-medium flex items-center justify-center gap-2 bg-yellow-300 dark:bg-yellow-500 dark:text-gray-900">
              <Star size={12} />
              Features
            </p>
          )}
        </div>

        <div className="relative">
          <ImageSlider images={product.images} name={product.name} />
        </div>
      </div>

      <div className="card-body p-5 relative">
        <div>
          <h2 className="font-semibold text-xl text-gray-900 dark:text-white">
            {product.name}
          </h2>

          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase font-medium">
            {product.category} . {product.brand} . {product.subcategory}
          </p>

          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex items-center justify-start gap-2.5 py-3">
          <p className="font-semibold text-lg text-gray-950 dark:text-white">
            {product.price}$
          </p>

          <p className="font-semibold text-green-500 dark:text-green-400 text-sm">
            -{product.discountPrice}$ off
          </p>
        </div>

        <div className={`flex item-center justify-start gap-2.5 border-b border-gray-200 dark:border-gray-700 pb-5 ${product.tags.length === 0 ? "h-[51.5px]" : ''}`}>
          {product.tags.map((tag, index) => (
            <div
              key={index}
              className={`border border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-sm rounded-md px-2 py-1 `}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className="card-footer px-5 mb-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => navigate(`/edite/${product._id}`)}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-sm rounded text-gray-500 dark:text-gray-300 transition-all duration-200 cursor-pointer"
          >
            <Pen size={15} className="shrink-0" />
            Edit
          </button>

          <button
            onClick={onQuickUpdate}
            className="flex whitespace-nowrap items-center justify-center gap-2 py-2 px-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-sm rounded text-gray-500 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-200 dark:hover:border-orange-700 transition-all duration-200 cursor-pointer"
          >
            <Edit size={15} className="shrink-0" />
            Quick Edit
          </button>
        </div>

        <div className="grid grid-cols-2 sm:flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 dark:bg-gray-800 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 border border-gray-200 dark:border-gray-600 hover:border-cyan-200 dark:hover:border-cyan-700 text-sm rounded text-gray-500 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 transition-all duration-200 cursor-pointer"
          >
            <Eye size={15} className="shrink-0" />
            View
          </button>

          <button
            onClick={() => deleteProduct(product._id)}
            disabled={loading}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded text-sm transition-all duration-200
    ${loading
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 cursor-pointer"
              }
  `}
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>

                Deleting...
              </>
            ) : (
              <>
                <Trash size={15} />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card
