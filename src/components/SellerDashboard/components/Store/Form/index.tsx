import React, { useState, useContext, useEffect } from "react";
import { ManageStoreContext } from "../Provider"; // Adjust import based on your context

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
  FaPinterestP,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../../../../Translator/Provider";
import ImageUpload from "../../../../CoverPhotoUplod";
import { Editor } from "@tinymce/tinymce-react";

const StoreForm = () => {
  const { id } = useParams<{ id: string }>();
  const { stores, addStore, editStore } = useContext(ManageStoreContext);
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<{
    name: string;
    shopUrl: string;
    email: string;
    phone: string;
    description: string;
    content: string;
    location: {
      country: string;
      state: string;
      city: string;
      address: string;
    };
    company: string;
    taxId: string;
    logo: string;
    squareLogo: string;
    coverImage: string;
    socialMediaLinks: {
      facebook: string;
      twitter: string;
      instagram: string;
      youtube: string;
      linkedin: string;
      whatsapp: string;
      pinterest: string;
    };
    createdAt?: string; // Add createdAt as an optional property
  }>({
    name: "",
    shopUrl: "",
    email: "",
    phone: "",
    description: "",
    content: "",

    location: {
      country: "",
      state: "",
      city: "",
      address: "",
    },
    company: "",
    taxId: "",
    logo: "",
    squareLogo: "",
    coverImage: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      whatsapp: "",
      pinterest: "",
    },
    createdAt: undefined, // Initialize it with undefined or you can leave it out
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Handle social media links separately
    if (name in formData.socialMediaLinks) {
      setFormData((prevData) => ({
        ...prevData,
        socialMediaLinks: {
          ...prevData.socialMediaLinks,
          [name]: value,
        },
      }));
    }
    // Handle location fields separately
    else if (name in formData.location) {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: value,
        },
      }));
    }
    // Handle all other fields
    else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditorChange = (content: string) => {
    setFormData({ ...formData, content: content });
  };

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

  const handleImageUpload =
    (field: "logo" | "squareLogo" | "coverImage") => (base64Image: string) => {
      setFormData((prevState) => ({
        ...prevState,
        [field]: base64Image,
      }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let updatedFormData = { ...formData };

      if (!isEditMode) {
        // Set the createdAt field to the current date and time only for new stores
        updatedFormData = {
          ...formData,
          createdAt: new Date().toISOString(), // Set current date in ISO format
        };
      }

      if (isEditMode) {
        await editStore(id, updatedFormData);
        toast.success("Store updated successfully!");
      } else {
        await addStore(updatedFormData); // Send formData with createdAt field
        toast.success("Store added successfully!");
      }

      navigate("/admin/ecommerce/stores");
    } catch (error: any) {
      console.error(
        "Error submitting form:",
        error?.response?.data || error.message
      );
      toast.error("An error occurred while saving the store.");
    } finally {
      setLoading(false); // Reset loading state after request finishes
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          {/* Name Field */}
          <div className="mb-6">
            <label className="mb-3 block text-black dark:text-white">
              Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Shop URL Field */}
          <div className="mb-6">
            <label className="mb-3 block text-black dark:text-white">
              Shop URL
            </label>
            <input
              name="shopUrl"
              value={formData.shopUrl}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Email Field */}
          <div className="mb-6">
            <label className="mb-3 block text-black dark:text-white">
              Email
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Phone Field */}
          <div className="mb-6">
            <label className="mb-3 block text-black dark:text-white">
              Phone
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>

          {/* Description Field */}
          <div className="mb-6">
            <label className="mb-3 block text-black dark:text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
          {/* Description Field */}
          <div className="mb-6">
            <label className="mb-3 block text-black dark:text-white ">
              Content
            </label>
            <Editor
              apiKey="cdzyxuidujhvhvu1ny9c3znjwloq2i8c1bmgyduqws17pp3i"
              value={formData.content}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  // Core editing features
                  "anchor",
                  "autolink",
                  "charmap",
                  "codesample",
                  "emoticons",
                  "image",
                  "link",
                  "lists",
                  "media",
                  "searchreplace",
                  "table",
                  "visualblocks",
                  "wordcount",
                  // Your account includes a free trial of TinyMCE premium features
                  // Try the most popular premium features until Nov 7, 2024:
                  "checklist",
                  "mediaembed",
                  "casechange",
                  "export",
                  "formatpainter",
                  "pageembed",
                  "a11ychecker",
                  "tinymcespellchecker",
                  "permanentpen",
                  "powerpaste",
                  "advtable",
                  "advcode",
                  "editimage",
                  "advtemplate",
                  "mentions",
                  "tableofcontents",
                  "footnotes",
                  "mergetags",
                  "autocorrect",
                  "typography",
                  "inlinecss",
                  "markdown",
                  // Early access to document converters
                  "importword",
                  "exportword",
                  "exportpdf",
                ],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                content_css: false, // Use external styling if required
                body_class: "text-black dark:text-white  dark:bg-form-input", // Apply custom styles to the editor's body
              }}
              onEditorChange={handleEditorChange}
            />
          </div>

          {/* Country and State Fields */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Country
              </label>
              <select
                name="country"
                value={formData.location.country}
                onChange={handleChange}
                className="block w-full rounded-md border-0  dark:bg-form-input dark:text-white  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">{translate("select")}</option>
                <option value="Tunisia">{translate("Tunisia")}</option>
                <option value="France">{translate("France")}</option>
                <option value="Japan">{translate("Japan")}</option>
                {/* Add more store types as needed */}
              </select>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                State
              </label>
              <select
                name="state"
                value={formData.location.state}
                onChange={handleChange}
                className="block w-full dark:bg-form-input dark:text-white  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">{translate("select")}</option>
                <option value="Monastir">{translate("Monastir")}</option>
                <option value="Tokyo">{translate("Tokyo")}</option>
                <option value="Lyon">{translate("Lyon")}</option>
                {/* Add more store types as needed */}
              </select>
            </div>
          </div>

          {/* Address and City Fields */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.location.city}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.location.address}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          {/* Company and Tax ID Fields */}
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">
                Tax ID
              </label>
              <input
                type="text"
                name="taxId"
                value={formData.taxId}
                onChange={handleChange}
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="flex justify-around w-full">
            <ImageUpload
              label="Logo"
              onImageUpload={handleImageUpload("logo")}
              prefillImage={formData.logo}
            />
            <ImageUpload
              label="Square Logo"
              onImageUpload={handleImageUpload("squareLogo")}
              prefillImage={formData.squareLogo}
            />
            <ImageUpload
              label="Cover Image"
              onImageUpload={handleImageUpload("coverImage")}
              prefillImage={formData.coverImage}
            />
          </div>

          {/* Social Media Links */}
          <div className="mb-6">
            <label className="mb-3 block text-black dark:text-white">
              Social Media Links
            </label>

            <div className="grid grid-cols-2 gap-4">
              {/* Facebook */}
              <div className="relative">
                <input
                  type="url"
                  name="facebook"
                  value={formData.socialMediaLinks.facebook}
                  onChange={handleChange}
                  placeholder="Facebook URL"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white">
                  <FaFacebookF />
                </span>
              </div>

              {/* Twitter */}
              <div className="relative">
                <input
                  type="url"
                  name="twitter"
                  value={formData.socialMediaLinks.twitter}
                  onChange={handleChange}
                  placeholder="Twitter URL"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white">
                  <FaTwitter />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Instagram */}
              <div className="relative">
                <input
                  type="url"
                  name="instagram"
                  value={formData.socialMediaLinks.instagram}
                  onChange={handleChange}
                  placeholder="Instagram URL"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white">
                  <FaInstagram />
                </span>
              </div>

              {/* YouTube */}
              <div className="relative">
                <input
                  type="url"
                  name="youtube"
                  value={formData.socialMediaLinks.youtube}
                  onChange={handleChange}
                  placeholder="YouTube URL"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white">
                  <FaYoutube />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* LinkedIn */}
              <div className="relative">
                <input
                  type="url"
                  name="linkedin"
                  value={formData.socialMediaLinks.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn URL"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white">
                  <FaLinkedinIn />
                </span>
              </div>

              {/* WhatsApp */}
              <div className="relative">
                <input
                  type="url"
                  name="whatsapp"
                  value={formData.socialMediaLinks.whatsapp}
                  onChange={handleChange}
                  placeholder="WhatsApp URL"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white">
                  <FaWhatsapp />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Pinterest */}
              <div className="relative">
                <input
                  type="url"
                  name="pinterest"
                  value={formData.socialMediaLinks.pinterest}
                  onChange={handleChange}
                  placeholder="Pinterest URL"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white">
                  <FaPinterestP />
                </span>
              </div>
              {/* Other */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://example.com/username"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 pr-10 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-white">
                  {/* Add any other social media icon */}
                </span>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition duration-300"
                >
                  Save and Exit
                </button>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StoreForm;
