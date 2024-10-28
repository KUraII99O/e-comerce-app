import { useEffect, useState } from "react";
import {
  FaBalanceScale,
  FaEye,
  FaHeart,
  FaList,
  FaThLarge,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { Product } from "../Products/ProductsServie";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<string>("default");
  const { storeId } = useParams<{ storeId: string }>(); // Extract storeId from URL
  const [itemsPerPage, setItemsPerPage] = useState<number>(8); // Default 8 items per page
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  // Handle Pagination Logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProducts(products.slice(startIndex, endIndex));
  }, [products, currentPage, itemsPerPage]);

  // Handle Sorting Logic
  useEffect(() => {
    let sortedProducts = [...products];
    if (sortOrder === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "priceHighLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setPaginatedProducts(sortedProducts.slice(0, itemsPerPage)); // Sort & reset paginated data
  }, [sortOrder, products, itemsPerPage]);

  // Handle Page Change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

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
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="priceLowHigh">Sort by Price: Low to High</option>
            <option value="priceHighLow">Sort by Price: High to Low</option>
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
        className={`${
          viewMode === "grid"
            ? "flex flex-wrap justify-center md:justify-start" // Flex for grid view
            : "" // No changes for list view
        }`}
      >
        {paginatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className={`${
              viewMode === "grid"
                ? "w-full sm:w-1/2 lg:w-1/3 p-2" // Responsive grid layout
                : "block" // List view layout
            }`}
          >
            <div
              className={`relative group bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl ${
                viewMode === "list" ? "flex w-full border p-2 mb-4" : "w-full"
              }`}
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={`object-cover rounded-t-xl ${
                    viewMode === "list" ? "w-60 h-60" : "h-80 w-full"
                  }`}
                />

                {/* Hover Icons */}
                <div className="absolute top-4 left-2 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-10 ">
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
              <div
                className={`p-4 flex-grow ${viewMode === "list" ? "ml-4" : ""}`}
              >
                <span className="text-gray-400 uppercase text-xs">
                  {product.category}
                </span>
                <p className="text-lg font-bold text-black truncate capitalize">
                  {product.name}
                </p>

                {/* Reviews Section */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {/* Replace the stars and reviews with your own component if needed */}
                    <span className="text-yellow-400">★★★★☆</span>
                    <p className="text-sm text-gray-600 ml-2">(10 reviews)</p>
                  </div>
                </div>

                {/* Price Section */}
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

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
