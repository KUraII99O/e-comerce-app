import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Store } from "../SellerDashboard/components/Store/StoreService";

const OurStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const handlePagination = (e: React.MouseEvent<HTMLAnchorElement>, page: number) => {
    e.preventDefault();
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex space-x-1 mb-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`h-4 w-4 ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.97 2.882 1.518 4.673c.3.921-.755 1.688-1.54 1.11l-3.97-2.882-3.971 2.882c-.784.578-1.84-.189-1.54-1.11l1.518-4.673-3.97-2.882c-.784-.57-.38-1.81.588-1.81h4.911l1.518-4.674z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto py-9 px-4 md:px-6 max-w-6xl">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        <span className="text-indigo-600 text-4xl">Our</span> Stores
      </h3>

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentStores.map((store) => (
          <li key={store.id} className="border rounded-lg shadow p-6 relative flex flex-col">
            <div className="flex justify-between mb-4">
              <div>
                <h4 className="font-semibold text-lg">{store.name}</h4>
                <div className="flex items-center">
                  {renderStars(4)}
                  <p className="text-sm text-gray-500 ml-2">(67 reviews)</p>
                </div>
              </div>
              <img
                src={store.logo}
                alt={`${store.name} logo`}
                className="w-16 h-16 rounded-full object-cover absolute top-3 right-3"
              />
            </div>

            <div className="mb-4 text-sm text-gray-600">
              <p>{store.location.address}, {store.location.city}, {store.location.state}</p>
              <p className="flex items-center mt-2">
                <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a1 1 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {store.email}
              </p>
              <p className="flex items-center mt-2">
                <svg className="w-4 h-4 mr-2 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10l1.67 12.12a2 2 0 001.96 1.88h10.74a2 2 0 001.96-1.88L21 10M6 6h12M6 6H5a2 2 0 00-2 2v1.61m0 6.72a2 2 0 00.66 1.53M5 12h14M6 6L5 4m0 0H4a2 2 0 00-2 2v1" />
                </svg>
                {store.phone}
              </p>
            </div>

            <Link
              to={`/store/${store.id}`}
              className="mt-auto block text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md"
            >
              Visit Store
            </Link>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </a>
        </li>
      </ol>
    </div>
  );
};

export default OurStores;
