import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StoreHeader = () => {
  const { id } = useParams(); // Use useParams to get the id from the URL
  const [storeData, setStoreData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/stores/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setStoreData(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchStoreData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!storeData) return null; // or handle the case when storeData is null

  return (
    <div
      className="bg-cover bg-center relative h-64 sm:h-80 lg:h-64"
      style={{ backgroundImage: `url(${storeData.coverImage})` }} // Use dynamic cover image
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 p-4 sm:p-6 lg:p-8 text-white flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0 max-w-screen-xl mx-auto">
        {/* storeData Logo */}
        <img
          src={storeData.image} // Use dynamic storeData image
          alt="store Logo"
          className="h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 rounded-full border-2 border-white shadow-md"
        />

        {/* storeData Info */}
        <div className="flex-1 text-center sm:text-left max-w-full break-words">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold leading-tight">
            {storeData.storeName} {/* Use dynamic store name */}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mt-1">
            <span className="text-yellow-400">★★★★★</span>{' '}
            <span className="text-xs sm:text-sm lg:text-base">(69 reviews)</span>
          </p>
          <p className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-xs sm:text-sm lg:text-base">
            <span className="flex items-center">
              📍 {storeData.location} {/* Use dynamic store location */}
            </span>
            <span className="flex items-center ">📞 {storeData.contactNumber}</span> {/* Use dynamic contact number */}
            <span className="flex items-center">✉️ {storeData.contactEmail}</span> {/* Use dynamic contact email */}
          </p>
          <p className="mt-2 text-xs sm:text-sm lg:text-base">
            {storeData.about} {/* Use dynamic about text */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;
