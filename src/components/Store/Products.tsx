import React, { useState } from "react";
import {
  FaHeart,
  FaBalanceScale,
  FaEye,
  FaList,
  FaThLarge,
} from "react-icons/fa"; // Icons from react-icons

// Sample product type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    price: 49.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    price: 19.99,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Product 4",
    price: 39.99,
    image: "https://via.placeholder.com/150",
  },
  // Add more products as needed
];

const StoreProductSection: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<string>("asc");
  const [itemsPerPage, setItemsPerPage] = useState<number>(4);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sort products by price
  const sortedProducts = [...productsData].sort((a, b) => {
    return sort === "asc" ? a.price - b.price : b.price - a.price;
  });

  // Paginate products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle view switch (grid/list)
  const handleViewChange = (viewType: "grid" | "list") => {
    setView(viewType);
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleViewChange("grid")}
          >
            <FaThLarge size={20} /> {/* Grid view icon */}
          </button>

          <button
            className={`px-4 py-2 text-sm font-medium rounded-lg focus:outline-none ${
              view === "list" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleViewChange("list")}
          >
            <FaList size={20} /> {/* List view icon */}
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

      {/* Product List */}
      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }`}
      >
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className={`relative group p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out ${
              view === "list" ? "flex" : "flex flex-col"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              className={`${
                view === "list"
                  ? "w-32 h-32 object-cover mr-4"
                  : "w-full h-48 object-cover rounded-lg"
              }`}
            />

            {/* Icons and Add to Cart Button */}
            <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700">
                Add to Cart
              </button>

              <div className="flex space-x-4">
                <button
                  className="bg-white text-gray-600 p-2 rounded-full hover:bg-gray-200"
                  aria-label="Wishlist"
                >
                  <FaHeart size={18} />
                </button>
                <button
                  className="bg-white text-gray-600 p-2 rounded-full hover:bg-gray-200"
                  aria-label="Compare"
                >
                  <FaBalanceScale size={18} />
                </button>
                <button
                  className="bg-white text-gray-600 p-2 rounded-full hover:bg-gray-200"
                  aria-label="Quick View"
                >
                  <FaEye size={18} />
                </button>
              </div>
            </div>

            <div
              className={`flex flex-col justify-between ${
                view === "list" ? "flex-grow" : "mt-4"
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      <div className="mt-8 flex justify-center">
        <button
          className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
          onClick={() => setItemsPerPage(productsData.length)}
        >
          Show All Products
        </button>
      </div>
    </div>
  );
};

export default StoreProductSection;
