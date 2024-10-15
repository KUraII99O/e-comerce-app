import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageProductContext } from "../Provider"; // Adjust import based on your context
import { useTranslation } from "../../Translator/Provider";
import ImageUpload from "../../ImageUpload";
import { toast } from "react-toastify";
import { Product } from "../ProductsServie";

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addProduct, editProduct } = useContext(ManageProductContext);
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

  const [loading, setLoading] = useState(false); // Define loading state

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

  const handleImageUpload = (imageData: string) => {
    console.log("Product image uploaded:", imageData); // Debugging line
    setFormData((prevData) => ({
      ...prevData,
      imageUrl: imageData,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
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
      setLoading(false); // Moved here to ensure it's reset on completion
    }
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
          type="submit"
          className="bg-blue-300 mt-4 text-white px-6 py-2 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          disabled={loading}
        >
          {isEditMode ? translate("update") : translate("add")}
          {translate("product")}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
