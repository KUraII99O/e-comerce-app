import React, { useEffect, useState } from "react";
import { FaBalanceScale, FaEye, FaHeart, FaList, FaThLarge } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export type Product = {
  oldPrice: number;
  id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  imageUrl: string;
  userId?: string;
  reviewsCount?: string;
  discountPrice?: string;
};

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<string>("default");
  const { storeId } = useParams<{ storeId: string }>(); // Extract storeId from URL
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [sort, setSort] = useState<string>("asc");

  // Fetch Products based on storeId
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/products?storeId=${storeId}`
        );
        if (!response.ok) throw new Error("Error fetching products");
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchProducts();
    }
  }, [storeId]);

  // Paginate products (basic setup)
  useEffect(() => {
    setPaginatedProducts(products); // Modify this based on your pagination logic
  }, [products]);

  // Sort products based on selected option
  useEffect(() => {
    let sortedProducts = [...products];
    if (sortOrder === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceHighLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setPaginatedProducts(sortedProducts);
  }, [sortOrder, products]);

  // Loading and Error States
  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;
  if (!products.length) return <p>No products available for this store.</p>;

  return (
    <div>
      {/* View Mode and Sorting */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* View Mode Toggle Icons */}
          <button
            onClick={() => setViewMode("grid")}
            className={`mr-2 p-2 ${
              viewMode === "grid" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <FaThLarge size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 ${
              viewMode === "list" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <FaList size={20} />
          </button>
        </div>

        <div className="flex space-x-4">
          {/* Sort Dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>

          {/* Items Per Page Dropdown */}
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value={2}>2 items per page</option>
            <option value={4}>4 items per page</option>
            <option value={6}>6 items per page</option>
            <option value={8}>8 items per page</option>
          </select>
        </div>
      </div>

      {/* Products Display */}
      <section
        className={`grid ${
          viewMode === "grid"
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : ""
        }`}
      >
        {paginatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="block" // Ensures the entire card is clickable
          >
            <div
              className={`relative group ${
                viewMode === "list" ? "flex w-full border p-4 mb-4" : "w-72"
              } bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl`}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={`${
                    viewMode === "list" ? "w-40 h-40" : "h-80 w-72"
                  } object-cover rounded-t-xl`}
                />

                {/* Add to Cart Button - Visible on Hover */}
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  Add To Cart
                </button>

                {/* Hover Icons - Visible on Hover */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-8 h-8 bg-white text-gray-600 rounded-full shadow flex items-center justify-center">
                  <FaHeart size={18} />
                  </button>
                  <button className="w-8 h-8 bg-white text-gray-600 rounded-full shadow flex items-center justify-center">
                     <FaEye size={18} />
                  </button>
                  <button className="w-8 h-8 bg-white text-gray-600 rounded-full shadow flex items-center justify-center">
                  <FaBalanceScale size={18} />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className={`p-4 ${viewMode === "list" ? "ml-4" : ""}`}>
                <span className="text-gray-400 uppercase text-xs">
                  {product.category}
                </span>
                <p className="text-lg font-bold text-black truncate capitalize">
                  {product.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black my-3">
                    ${product.price}
                  </p>
                  {product.oldPrice && (
                    <del className="text-sm text-gray-600 ml-2">
                      ${product.oldPrice}
                    </del>
                  )}
                </div>
                <p className="text-gray-500 text-sm truncate">
                  {product.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Products;
