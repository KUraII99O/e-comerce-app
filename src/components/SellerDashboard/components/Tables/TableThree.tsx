import  { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Package } from "../../types/package";
import Pagination from "../../../Pagination";
import { Link } from "react-router-dom";

const packageData: Package[] = [
  {
    name: "Free package",
    price: 0.0,
    invoiceDate: `Jan 13, 2023`,
    status: "Paid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13, 2023`,
    status: "Paid",
  },
  {
    name: "Business Package",
    price: 99.0,
    invoiceDate: `Jan 13, 2023`,
    status: "Unpaid",
  },
  {
    name: "Standard Package",
    price: 59.0,
    invoiceDate: `Jan 13, 2023`,
    status: "Pending",
  },
];

const TableThree = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // default items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(packageData.length / itemsPerPage);

  // Get the current items for the page
  const currentItems = packageData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded dark:bg-boxdark dark:border-strokedark dark:text-white"
          />
          <select className="border p-2 rounded dark:bg-boxdark dark:border-strokedark dark:text-white">
            <option value="">Bulk Actions</option>
            <option value="export">Export</option>
            <option value="import">Import</option>
            {/* Add other options as needed */}
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Reload
          </button>
          <Link
            to="/admin/ecommerce/products/create"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Create
          </Link>{" "}
          <button className="bg-yellow-500 text-white py-2 px-4 rounded">
            Import
          </button>
          <button className="bg-purple-500 text-white py-2 px-4 rounded">
            Export
          </button>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4">
                <input type="checkbox" />
              </th>
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Image
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Products
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Price
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Stock status
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Quantity
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                SKU
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Sort order
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Created At
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Store
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <input type="checkbox" />
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {(currentPage - 1) * itemsPerPage + key + 1}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  Image here
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {packageItem.name}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  ${packageItem.price}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  In Stock
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  10
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  SKU-{key + 1}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  Sort order
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {packageItem.invoiceDate}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      packageItem.status === "Paid"
                        ? "bg-success text-success"
                        : packageItem.status === "Unpaid"
                        ? "bg-danger text-danger"
                        : "bg-warning text-warning"
                    }`}
                  >
                    {packageItem.status}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  Store Name
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-4">
                    <button className="text-blue-500">
                      <FaPencilAlt />
                    </button>
                    <button className="text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        setItemsPerPage={setItemsPerPage}
        totalItems={packageData.length}
      />
    </div>
  );
};

export default TableThree;
