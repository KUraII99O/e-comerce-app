import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageProductContext } from "../Provider"; // Adjust import based on your context
import { useTranslation } from "../../Translator/Provider";
import ImageUpload from "../../ImageUpload";
import { toast } from "react-toastify"; // If using react-toastify for notifications
import { Product } from "../ProductsServie";
import * as XLSX from "xlsx"; // Import xlsx library

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addProduct, editProduct } =
    useContext(ManageProductContext);
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
    stock: 0,
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const { storeId } = useParams<{ storeId: string }>(); // Assuming you get storeId from params

  useEffect(() => {
    if (isEditMode && id && products?.length > 0) {
      const selectedProduct = products.find(
        (item: { id: string }) => item.id === id
      );
      if (selectedProduct) {
        setFormData({
          ...selectedProduct,
        });
      }
    }
  }, [id, isEditMode, products]);

  // New function to handle Excel file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // Assume first sheet
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: Product[] = XLSX.utils.sheet_to_json(worksheet); // Convert to JSON

        jsonData.forEach((product) => {
          addProduct(product); // Call addProduct to add each product
        });

        toast.success("Products imported successfully!");
      };
      navigate(`/store/${storeId}`);

      reader.readAsArrayBuffer(file);
    }
  };

  const handleImageUpload = (imageData: string) => {
    console.log("Product image uploaded:", imageData);
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: imageData,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditMode) {
        await editProduct(id, formData);
        toast.success("Product updated successfully!");
      } else {
        await addProduct(formData);
        toast.success("Product added successfully!");
      }
      navigate("/manageproducts?result=success");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the product.");
    } finally {
      setLoading(false);
    }
  };

  // Function to generate random product data and export it as Excel
  const generateRandomExcelFile = () => {
    const generateRandomProduct = (): Product => {
      return {
        name: `Product-${Math.floor(Math.random() * 1000)}`,
        description: `Description-${Math.floor(Math.random() * 1000)}`,
        price: parseFloat((Math.random() * 100).toFixed(2)),
        category: `Category-${Math.floor(Math.random() * 10)}`,
        stock: Math.floor(Math.random() * 100),
        imageUrl: `https://picsum.photos/200/300?random=${Math.floor(
          Math.random() * 1000
        )}`, // Random image from Picsum
        storeId: storeId, // Include storeId
      };
    };

    // Generate 10 random products
    const productData: Product[] = Array.from(
      { length: 10 },
      generateRandomProduct
    );

    // Convert product data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(productData);

    // Create a new workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

    // Export the Excel file
    XLSX.writeFile(workbook, `products_${storeId}.xlsx`);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Product Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Enter details about your product.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Image
            </label>
            <ImageUpload
              onImageUpload={handleImageUpload} // Correctly handling image uploads
              prefillImage={formData.imageUrl} // Prefilling with existing image
            />
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="category"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Category
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Price
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="stock"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Stock
            </label>
            <div className="mt-2">
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => document.getElementById("file-input")?.click()} // Trigger file input click
          className="bg-green-300 text-white px-6 py-2 rounded hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 mr-4"
        >
          Import from Excel
        </button>
        <input
          type="file"
          id="file-input"
          style={{ display: "none" }} // Hide the input
          accept=".xlsx, .xls" // Allow only Excel files
          onChange={handleFileUpload} // Handle file selection
        />

        <button
          type="submit"
          className="bg-blue-300 mt-4 text-white px-6 py-2 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          disabled={loading}
        >
          {isEditMode ? translate("update") : translate("add")}
          {translate("product")}
        </button>
        <button
          type="button"
          onClick={generateRandomExcelFile} // Call the function to generate Excel
          className="bg-orange-300 text-white px-6 py-2 ml-4 rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200 mr-4"
        >
          Generate Random Excel File
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
