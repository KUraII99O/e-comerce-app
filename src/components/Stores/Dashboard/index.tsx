import React, { useState } from "react";
import { Store } from "../StoreService"; // Adjust the path as necessary
import { useManageStore } from "../Provider";

const StoreSection = () => {
  const { stores, deleteStore, toggleStoreStatus } = useManageStore();
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleDeleteStore = (id: string) => {
    deleteStore(id);
  };

  const handleEditStore = (id: string) => {
    // Here you can add your edit logic (e.g., open a modal for editing store)
    console.log("Edit store with id:", id);
  };

  const handleCreateStore = () => {
    // Open a modal or redirect to create store form
    console.log("Create a new store");
  };

  const categories = ["All", "Type", "Creation Date"];

  return (
    <section>
      <div className="container mx-auto py-9 md:py-12 px-4 md:px-6 max-w-6xl">
        {/* Title and Create Store Button */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">
            <span className="text-indigo-600 text-4xl">Manage</span> Stores
          </h3>
          <button
            onClick={handleCreateStore}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Create Store
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-6 text-lg font-medium text-gray-500 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative py-2 ${
                selectedCategory === category
                  ? "text-indigo-600 font-semibold"
                  : ""
              }`}
            >
              {selectedCategory === category && (
                <span className="absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-full"></span>
              )}
              <span className="pl-4">{category}</span>
            </button>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="flex text-right mt-6">
          <button
            onClick={handleToggle}
            className="text-indigo-600 hover:underline"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>

        {/* Store Cards */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {stores.slice(0, showAll ? stores.length : 8).map((store: Store) => (
            <article
              key={store.id}
              className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
            >
              <div className="relative flex items-end overflow-hidden rounded-xl">
                <img
                  src={store.image}
                  alt={store.storeName}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-1 p-2">
                <h2 className="text-slate-700">{store.storeName}</h2>
                <p className="mt-1 text-sm text-slate-400">{store.location}</p>
                <div className="mt-3 flex items-end justify-between">
                  <div className="flex items-center space-x-1.5 text-sm">
                    <button
                      onClick={() => toggleStoreStatus(store.id)}
                      className={`rounded-lg px-4 py-1.5 text-white ${
                        store.status
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {store.status ? "Open" : "Closed"}
                    </button>
                    <button
                      onClick={() => handleEditStore(store.id)}
                      className="rounded-lg bg-blue-500 px-4 py-1.5 text-white hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStore(store.id)}
                      className="rounded-lg bg-gray-500 px-4 py-1.5 text-white hover:bg-gray-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoreSection;
