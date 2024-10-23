
const ProductAd = () => {
  return (
    <div className="container mx-auto py-9 md:py-12 px-4 md:px-6 max-w-6xl">
      {/* Flexbox layout with space for two cards */}
      <div className="flex items-stretch justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
        {/* Larger card with hover effect */}
        <div className="flex flex-col md:flex-row items-stretch justify-between bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12 rounded-lg transform transition duration-300 hover:scale-105">
          <div className="flex flex-col justify-center md:w-1/2">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
              Best Deal
            </h1>
            <p className="text-base lg:text-xl text-gray-800 dark:text-white mt-2">
              Save up to <span className="font-bold">50%</span>
            </p>
            {/* "Shop Now" Link with Arrow */}
            <a
              href="#"
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-medium group"
            >
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <img
              src="https://i.ibb.co/J2BtZdg/Rectangle-56-1.png"
              alt="Best Deal"
              className=""
            />
          </div>
        </div>

        {/* Smaller card with hover effect */}
        <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative rounded-lg transform transition duration-300 hover:scale-105">
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
              Game Console
            </h1>
            <p className="text-base lg:text-xl text-gray-800 dark:text-white">
              Save up to <span className="font-bold">30%</span>
            </p>
            {/* "Shop Now" Link with Arrow */}
            <a
              href="#"
              className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-300 font-medium group"
            >
              Shop Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
          <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
            <img
              src="https://i.ibb.co/rGfP7mp/Rectangle-59-1.png"
              alt="Game Console"
              className="md:w-20 md:h-20 lg:w-full lg:h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAd;
