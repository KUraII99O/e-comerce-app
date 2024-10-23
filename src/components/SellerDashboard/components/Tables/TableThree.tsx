import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import Pagination from "../../../Pagination";
import { Link } from "react-router-dom";

interface PackageItem {
  [key: string]: any;
}

interface TableThreeProps {
  data: PackageItem[];
  headers: string[]; // Dynamic table headers
  createLink: string;
  editLinks: { [key: string]: string }; // New prop for edit links

  onReload: () => void;
  onImport?: () => void; // Optional prop
  onExport?: () => void; // Optional prop
  showImportButton?: boolean; // Prop to control visibility of import button
  showExportButton?: boolean; // Prop to control visibility of export button
}

const TableThree = ({
  data,
  headers,
  createLink,
  editLinks,

  onReload,
  onImport,
  onExport,
  showImportButton = false, // Default value
  showExportButton = false, // Default value
}: TableThreeProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentItems = data.slice(
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
            {showExportButton && <option value="export">Export</option>}
            {showImportButton && <option value="import">Import</option>}
          </select>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onReload}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Reload
          </button>
          <Link
            to={createLink}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Create
          </Link>
          {showImportButton && (
            <button
              onClick={onImport}
              className="bg-yellow-500 text-white py-2 px-4 rounded"
            >
              Import
            </button>
          )}
          {showExportButton && (
            <button
              onClick={onExport}
              className="bg-purple-500 text-white py-2 px-4 rounded"
            >
              Export
            </button>
          )}
        </div>
      </div>

      {/* Table with dynamic headers */}
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-left dark:bg-meta-4">
              <th className="py-4 px-4">
                <input type="checkbox" />
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white"
                >
                  {header}
                </th>
              ))}
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Operations
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                {/* Row number instead of actual ID */}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {index + 1}{" "}
                </td>

                {/* Mapping over headers */}
                {headers.map((header, headerIndex) => (
                  <td
                    key={headerIndex}
                    className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                  >
                    {header === "ID" ? (
                      (currentPage - 1) * itemsPerPage + index + 1
                    ) : header === "Logo" ? (
                      <img
                        src={item.logo}
                        alt="Logo"
                        className="w-16 h-16 object-cover"
                      />
                    ) : header === "Created At" ? (
                      new Date(item.createdAt).toLocaleDateString()
                    ) : (
                      item[header.toLowerCase().replace(" ", "")]
                    )}
                  </td>
                ))}

                {/* Operations column */}
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-4">
                    <Link to={editLinks[item.id]} className="text-blue-500">
                      <FaPencilAlt />
                    </Link>
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
        totalItems={data.length}
      />
    </div>
  );
};

export default TableThree;
