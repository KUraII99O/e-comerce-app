import React, { useEffect, useState } from 'react';
import { FaHeart, FaExchangeAlt, FaEye } from 'react-icons/fa'; // Icons for Wishlist, Compare, Quick View

interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  discount: number; // Discount percentage
  timer: number; // Timer in seconds
  rating: number; // Timer in seconds
}

const products: Product[] = [
  {
    id: 1,
    title: "Basic Tee",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 24.00,
    discount: 20,
    timer: 3600, // 1 hour
    rating: 4, // 1 hour
  },
  {
    id: 2,
    title: "Basic Tee - Blue",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 22.00,
    discount: 15,
    timer: 3600, // 1 hour
    rating: 4, // 1 hour
  },
  {
    id: 3,
    title: "Basic Tee - Red",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 26.00,
    discount: 10,
    timer: 3600, // 1 hour
    rating: 4, // 1 hour
  },
  
  // Add more products as needed
];

const DealsOfTheDay = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Change the number of items per page to 3
  const [remainingTime, setRemainingTime] = useState<number[]>([]);

  useEffect(() => {
    // Initialize the remaining time for each product
    const initialRemainingTime = products.map((product) => product.timer);
    setRemainingTime(initialRemainingTime);

    // Countdown timer logic
    const timer = setInterval(() => {
      setRemainingTime((prev) => prev.map((time) => (time > 0 ? time - 1 : 0)));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Get current products based on the current page
  const currentProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePagination = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault(); // Prevent default anchor click behavior
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderStars = (rating: number) => {
    const totalStars = 5;
    return (
      <div className="flex">
        {Array.from({ length: totalStars }, (_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            className={`w-5 h-5 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.947a1 1 0 00.95.69h4.146c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.363 1.118l1.287 3.947c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.839-.197-1.54-1.118l1.287-3.947a1 1 0 00-.363-1.118L2.464 9.374c-.784-.57-.38-1.81.588-1.81h4.146a1 1 0 00.95-.69l1.286-3.947z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h3 className="text-2xl font-bold text-gray-800 hover:underline mb-4">
              <span className="text-indigo-600 text-4xl">Deal</span> Of The Day
            </h3>
          </header>

          <div className="mt-8">
            <p className="text-sm text-gray-500">Showing {currentProducts.length} of {products.length}</p>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 rounded-lg">
            {currentProducts.map((product) => (
              <li key={product.id} className="group relative">
                <a href="#" className="block overflow-hidden rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px] rounded-lg"
                  />

                  {/* Hover Content */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg">
                      Add to Cart
                    </button>
                  </div>

                  <div className="absolute top-3 right-3 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200 ml-2">
                      <FaHeart className="text-red-500" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200 ml-2">
                      <FaExchangeAlt className="text-gray-500" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200 ml-2">
                      <FaEye className="text-gray-500" />
                    </button>
                  </div>
                </a>

                <div className="relative bg-white pt-3">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {product.title}
                  </h3>
                  <p className="mt-2">
                    <span className="sr-only">Regular Price</span>
                    <span className="tracking-wider text-gray-900">£{product.price.toFixed(2)} GBP</span>
                    <span className="ml-2 text-red-500">-{product.discount}%</span>
                  </p>

                  <div className="mt-1">{renderStars(product.rating)}</div>


                  <p className="mt-1 text-sm text-gray-500">Time Left: {Math.floor(remainingTime[product.id - 1] / 60)}m {remainingTime[product.id - 1] % 60}s</p>
                </div>
              </li>
            ))}
          </ul>

          <ol className="mt-8 flex justify-center gap-1 text-xs font-medium">
            <li>
              <a href="#" onClick={(e) => handlePagination(e, currentPage - 1)} className="inline-flex items-center justify-center rounded border border-gray-100">
                <span className="sr-only">Prev Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <a href="#" onClick={(e) => handlePagination(e, index + 1)} className={`block size-8 rounded border border-gray-100 text-center leading-8 ${currentPage === index + 1 ? 'bg-black text-white' : ''}`}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a href="#" onClick={(e) => handlePagination(e, currentPage + 1)} className="inline-flex items-center justify-center rounded border border-gray-100">
                <span className="sr-only">Next Page</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default DealsOfTheDay;
