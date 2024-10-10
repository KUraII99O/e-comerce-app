import React, { useEffect, useState } from "react";
import { Store } from "../Stores/StoreService";
import { Link } from "react-router-dom";

const OurStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [hoveredStoreId, setHoveredStoreId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/stores");
        if (!response.ok) {
          throw new Error("Failed to fetch stores");
        }
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, []);

  const totalPages = Math.ceil(stores.length / itemsPerPage);

  const currentStores = stores.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePagination = (
    e: React.MouseEvent<HTMLAnchorElement>,
    page: number
  ) => {
    e.preventDefault();
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const categories = ["All", "Type", "Trending", "Top rated"];

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`h-5 w-5 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15.27L16.18 19l-1.64-7.03L20 8.24l-7.19-.61L10 2 7.19 7.63 0 8.24l5.46 3.73L3.82 19z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div>
      <section>
        <div className="container mx-auto py-9 md:py-12 px-4 md:px-6 max-w-6xl">
          <h3 className="text-2xl font-bold text-gray-800 hover:underline mb-4">
            <span className="text-indigo-600 text-4xl">Our</span> Stores
          </h3>

          <div className="flex space-x-6 text-lg font-medium text-gray-500 mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative py-2 ${selectedCategory === category ? "text-indigo-600 font-semibold" : ""}`}
              >
                {selectedCategory === category && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-full"></span>
                )}
                <span className="pl-4">{category}</span>
              </button>
            ))}
          </div>

          <div className="flex text-right mt-6">
            <button
              onClick={handleToggle}
              className="text-indigo-600 hover:underline"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>

          <div className="mt-8">
            <p className="text-sm text-gray-500">
              Showing {currentStores.length} of {stores.length}
            </p>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 rounded-lg">
            {currentStores.map((store) => (
              <li
                key={store.id}
                onMouseEnter={() => setHoveredStoreId(store.id)}
                onMouseLeave={() => setHoveredStoreId(null)}
              >
                <a href="#" className="group block overflow-hidden rounded-lg relative">
                  <img
                    src={store.image}
                    alt={store.storeName}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px] rounded-lg"
                  />
                  <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {store.storeName}
                    </h3>
                    {renderStars(4)}{" "}
                  </div>

                  {/* Visit Store Button */}
                  {hoveredStoreId === store.id && (
                   <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <Link to={`/store/${store.id}`}> {/* Link to the store page */}
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                          Visit Store 
                        </button>
                      </Link>
                 </div>

                  )}
                </a>
              </li>
            ))}
          </ul>

          <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
            <li>
              <a
                href="#"
                onClick={(e) => handlePagination(e, currentPage - 1)}
                className="inline-flex items-center justify-center rounded border border-gray-100"
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a
                  href="#"
                  onClick={(e) => handlePagination(e, index + 1)}
                  className={`block size-8 rounded border border-gray-100 text-center leading-8 ${currentPage === index + 1 ? "bg-black text-white" : ""}`}
                >
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={(e) => handlePagination(e, currentPage + 1)}
                className="inline-flex items-center justify-center rounded border border-gray-100"
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default OurStores;
