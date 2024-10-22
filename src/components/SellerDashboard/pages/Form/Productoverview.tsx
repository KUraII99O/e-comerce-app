import React, { useState } from "react";

const ProductForm: React.FC = () => {
  const [inStock, setInStock] = useState(true);

  return (
    <form className="max-w-4xl mx-auto p-6  rounded-lg space-y-6">
      {/* Overview Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Name</label>
            <input
              type="text"
              placeholder="Default Input"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Price Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Price</label>
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Price Sale Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Price Sale</label>
            <input
              type="number"
              placeholder="$"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Barcode Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Barcode (ISBN, UPC, GTIN, etc.)</label>
            <input
              type="text"
              placeholder="Enter barcode"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Cost per item Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Cost per item</label>
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Storehouse Management Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 text-green-600 border-gray-300 rounded dark:bg-form-input dark:border-form-strokedark"
            />
            <label className="text-black dark:text-white">With storehouse management</label>
          </div>
        </div>
      </div>

      {/* Stock Status Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Stock status</h2>
        <div className="flex space-x-4">
          <div>
            <label className="inline-flex items-center text-black dark:text-white">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-green-600 border-gray-300 dark:bg-form-input dark:border-form-strokedark"
                checked={inStock}
                onChange={() => setInStock(true)}
              />
              <span className="ml-2">In stock</span>
            </label>
          </div>

          <div>
            <label className="inline-flex items-center text-black dark:text-white">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-green-600 border-gray-300 dark:bg-form-input dark:border-form-strokedark"
                checked={!inStock}
                onChange={() => setInStock(false)}
              />
              <span className="ml-2">Out of stock</span>
            </label>
          </div>

          <div>
            <label className="inline-flex items-center text-black dark:text-white">
              <input
                type="radio"
                className="form-radio h-4 w-4 text-green-600 border-gray-300 dark:bg-form-input dark:border-form-strokedark"
              />
              <span className="ml-2">On backorder</span>
            </label>
          </div>
        </div>
      </div>

      {/* Shipping Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Shipping</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Weight Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Weight (g)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Length Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Length (cm)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Wide Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Wide (cm)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Height Field */}
          <div>
            <label className="mb-3 block text-black dark:text-white">Height (cm)</label>
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
