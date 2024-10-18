import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../ProductsServie';

const Details: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center py-8">No product found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex">
          <div className="w-1/6 space-y-4">
            <img
              src={product.imageUrl}
              alt="Thumbnail"
              className="w-full cursor-pointer border border-gray-200 p-2 hover:scale-105 transition-transform"
            />
            <img
              src="https://via.placeholder.com/50"
              alt="Thumbnail"
              className="w-full cursor-pointer border border-gray-200 p-2 hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex-grow ml-4">
            <img
              src={product.imageUrl}
              alt="Main product"
              className="w-full border border-gray-200 p-2"
            />
          </div>
        </div>
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="text-sm text-gray-500">Global Store</div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★★★★☆</span>
              <span>({product.reviewsCount} reviews)</span>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</div>
          {product.discountPrice && (
            <div className="line-through text-gray-500">${product.discountPrice}</div>
          )}
          <div className="text-sm text-gray-500">{product.stock} products available</div>
          <div>
            <div className="flex items-center space-x-4">
              <button onClick={handleDecrease} className="border px-4 py-2">-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrease} className="border px-4 py-2">+</button>
            </div>
            <button className="bg-blue-600 text-white py-2 px-6 mt-4 hover:bg-blue-700">Add To Cart</button>
            <button className="bg-green-600 text-white py-2 px-6 mt-4 ml-2 hover:bg-green-700">Buy Now</button>
          </div>
          <div>
            <p className="text-sm text-gray-500">SKU: {product.id}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 bg-gray-200 rounded-full">
              <i className="fab fa-facebook"></i>
            </button>
          </div>
          <div className="mt-4">
            <p className="text-sm">30 days easy returns</p>
            <p className="text-sm">Order yours before 2.30pm for same day dispatch</p>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <img src="https://via.placeholder.com/50" alt="PayPal" />
            <img src="https://via.placeholder.com/50" alt="Visa" />
            <img src="https://via.placeholder.com/50" alt="Stripe" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
