import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi'; // for search and chevron icons
import { AiOutlineGift, AiOutlineHome } from 'react-icons/ai'; // for category icons
import {
  MdComputer,
  MdPhoneIphone,
  MdTv,
  MdCameraAlt,
  MdRestaurantMenu,
  MdSportsSoccer,
  MdOutlineShop,
} from 'react-icons/md'; // more icons

const ProductSearchAndCategories: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage drawer visibility

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev); // Toggle the drawer's visibility
  };

  return (
    <div className="relative flex">
      {/* Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } md:hidden`}
        onClick={toggleDrawer} // Close drawer when clicking outside
      ></div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white  transform transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:block`}
      >
        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <FiSearch className="absolute top-2 right-3 text-gray-500" />
          </div>

          {/* Divider Line */}
          <hr className="my-4 border-gray-300" />

          {/* Categories List */}
          <ul className="space-y-2">
            <li className="font-semibold text-lg">Categories</li>

            {/* List of categories with icons and chevrons */}
            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <AiOutlineHome className="mr-2" />
                <a href="#">New Arrivals</a>
              </div>
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdOutlineShop className="mr-2" />
                <a href="#">Electronics</a>
              </div>
              <FiChevronDown />
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <AiOutlineGift className="mr-2" />
                <a href="#">Gifts</a>
              </div>
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdComputer className="mr-2" />
                <a href="#">Computers</a>
              </div>
              <FiChevronDown />
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdPhoneIphone className="mr-2" />
                <a href="#">Smartphones & Tablets</a>
              </div>
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdTv className="mr-2" />
                <a href="#">TV, Video & Music</a>
              </div>
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdCameraAlt className="mr-2" />
                <a href="#">Cameras</a>
              </div>
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdRestaurantMenu className="mr-2" />
                <a href="#">Cooking</a>
              </div>
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdOutlineShop className="mr-2" />
                <a href="#">Accessories</a>
              </div>
              <FiChevronDown />
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdSportsSoccer className="mr-2" />
                <a href="#">Sports</a>
              </div>
            </li>

            <li className="flex items-center justify-between text-gray-700 hover:text-blue-500 text-sm sm:text-base">
              <div className="flex items-center">
                <MdOutlineShop className="mr-2" />
                <a href="#">Electronics Gadgets</a>
              </div>
              <FiChevronDown />
            </li>
          </ul>
        </div>
      </div>

      {/* Button for Small Screens */}
      <button
        onClick={toggleDrawer}
        className="fixed top-1/2 right-4 transform -translate-y-1/2 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none md:hidden z-50"
      >
        {isDrawerOpen ? 'Close Filters' : 'Show Filters'}
      </button>

      {/* Main content area for larger screens */}
      <div className="hidden md:block w-1/4 p-4 ">
        {/* Similar layout for larger screens can go here */}
      </div>
    </div>
  );
};

export default ProductSearchAndCategories;
