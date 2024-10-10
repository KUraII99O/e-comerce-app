import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ManageStoreContext } from "../Provider"; // Adjust import based on your context
import { useTranslation } from "../../Translator/Provider";
import ImageUpload from "../../ImageUpload";
import { toast } from "react-toastify";
import CoverImageUpload from "../../CoverPhotoUplod";
import LinkSection from "../TableLinks";

const EditStore = () => {
  const { id } = useParams<{ id: string }>();
  const { stores, addStore, editStore } = useContext(ManageStoreContext);
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    storeName: "",
    about: "",
    coverImage: "", // Fixed typo here
    location: "",
    storeType: "",
    ownerName: "",
    contactEmail: "",
    contactNumber: "",
    image: "",
  });

  const [loading, setLoading] = useState(false); // Define loading state

  useEffect(() => {
    if (isEditMode && id && stores?.length > 0) {
      // Optional chaining for safety
      const selectedStore = stores.find(
        (item: { id: string }) => item.id === id
      );
      if (selectedStore) {
        // Set form data including the image field
        setFormData({
          ...selectedStore,
        });
      }
    }
  }, [id, isEditMode, stores]);

  const handleImageUpload = (imageData: string) => {
    console.log("Profile image uploaded:", imageData); // Debugging line
    setFormData((prevData) => ({
      ...prevData,
      image: imageData,
    }));
  };

  const handleCoverImageUpload = (coverImageData: string) => {
    console.log("Cover image uploaded:", coverImageData); // Debugging line
    setFormData((prevData) => ({
      ...prevData,
      coverImage: coverImageData,
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
        await editStore(id, formData);
        toast.success("Store updated successfully!");
      } else {
        await addStore(formData);
        toast.success("Store added successfully!");
      }
      navigate("/managestores?result=success");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while saving the store.");
    } finally {
      setLoading(false); // Moved here to ensure it's reset on completion
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Use a permanent address where you can receive mail.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="storeName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Store Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              About
            </label>
            <div className="mt-2">
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="profile-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Profile Photo
            </label>
            <ImageUpload
              onImageUpload={handleImageUpload} // Correctly handling image uploads
              prefillImage={formData.image} // Prefilling with existing image
            />
          </div>

          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Cover Photo
            </label>
            <CoverImageUpload
              onCoverImageUpload={handleCoverImageUpload} // Correctly handling cover image uploads
              prefillCoverImage={formData.coverImage} // Prefilling with existing cover image
            />
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Location
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
              />
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="storeType"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Store Type
            </label>
            <div className="mt-2">
              <select
                name="storeType"
                value={formData.storeType}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
              >
                <option value="">{translate("select")}</option>
                <option value="Grocery">{translate("grocery")}</option>
                <option value="Electronics">{translate("electronics")}</option>
                <option value="Clothing">{translate("clothing")}</option>
                {/* Add more store types as needed */}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="ownerName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Owner Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              
            />
          </div>

          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="contactNumber"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Phone Number
            </label>
            <div className="mt-2">
              <input
                type="tel"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                
              />
            </div>
          </div>
          <LinkSection/>
        </div>


        <button
          type="submit"
          className="bg-blue-300 mt-4 text-white px-6 py-2 rounded hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          disabled={loading}
        >
          {isEditMode ? translate("update") : translate("add")}
          {translate("store")}
        </button>
      </form>
    </div>
  );
};

export default EditStore;
