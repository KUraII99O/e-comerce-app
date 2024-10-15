import { useState } from "react";
import { Store } from "../StoreService"; // Adjust the path as necessary
import { useManageStore } from "../Provider";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const StoreSection = () => {
  const { stores, deleteStore,  } = useManageStore();
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const handleDeleteConfirmation = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this store member?")) {
      await handleDelete(id);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteStore(id);
      toast.success("Store deleted successfully!");
    } catch (error) {
      toast.error("An error occurred while deleting the store.");
    }
  };

  const categories = ["All", "Type", "Creation Date"];

  return (
    <section>
      <div className="container mx-auto py-9 md:py-12 px-4 md:px-6 max-w-6xl">
        {/* Title and Create Store Button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
            <span className="text-indigo-600 text-4xl">Manage</span> Stores
          </h3>
          <Link
            to="/add-store"
            className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-500 ml-2"
          >
            Add store
          </Link>
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
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
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
                    <Link
                      to={`/store/${store.id}`}
                      className="rounded-lg px-4 py-1.5 text-white bg-blue-500 hover:bg-blue-600"
                    >
                      Visit Store
                    </Link>

                    <div className="flex items-center">
                      <Link
                        to={`/edit-store/${String(store.id)}`}
                        className="text-blue-500 hover:underline flex items-center mr-2"
                      >
                        <BsPencil className="w-5 h-5 mr-1" />
                      </Link>
                      <button
                        onClick={() => handleDeleteConfirmation(store.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none flex items-center"
                      >
                        <AiOutlineDelete className="w-5 h-5 mr-1" />
                      </button>
                    </div>
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
