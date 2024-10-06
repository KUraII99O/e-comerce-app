import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  discount: number; // Discount percentage
  timer: number; // Timer in seconds
}

const products: Product[] = [
  {
    id: 1,
    title: "Basic Tee",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 24.00,
    discount: 20,
    timer: 3600, // 1 hour
  },
  {
    id: 2,
    title: "Basic Tee - Blue",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 22.00,
    discount: 15,
    timer: 3600, // 1 hour
  },
  {
    id: 3,
    title: "Basic Tee - Red",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 26.00,
    discount: 10,
    timer: 3600, // 1 hour
  },
  {
    id: 4,
    title: "Basic Tee - Green",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 20.00,
    discount: 25,
    timer: 3600, // 1 hour
  },
  {
    id: 5,
    title: "Basic Tee - Green",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 20.00,
    discount: 25,
    timer: 3600, // 1 hour
  },
  {
    id: 6,
    title: "Basic Tee - Green",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    price: 20.00,
    discount: 25,
    timer: 3600, // 1 hour
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

  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h3 className="text-2xl font-bold text-gray-800 hover:underline mb-4">
          <span className="text-indigo-600 text-4xl">Deal</span>  Of The Day
        </h3>
          </header>

          <div className="mt-8">
            <p className="text-sm text-gray-500">Showing {currentProducts.length} of {products.length}</p>
          </div>

          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 rounded-lg">
            {currentProducts.map((product) => (
              <li key={product.id}>
                <a href="#" className="group block overflow-hidden rounded-lg">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px] rounded-lg"
                  />
                  <div className="relative bg-white pt-3">
                    <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                      {product.title}
                    </h3>
                    <p className="mt-2">
                      <span className="sr-only">Regular Price</span>
                      <span className="tracking-wider text-gray-900">£{product.price.toFixed(2)} GBP</span>
                      <span className="ml-2 text-red-500">-{product.discount}%</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Time Left: {Math.floor(remainingTime[product.id - 1] / 60)}m {remainingTime[product.id - 1] % 60}s</p>
                  </div>
                </a>
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
