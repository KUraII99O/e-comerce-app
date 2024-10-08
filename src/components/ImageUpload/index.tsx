import React, { useState, useEffect } from "react";
import { readAndCompressImage } from 'browser-image-resizer';
import { FaCloudUploadAlt } from "react-icons/fa";

const defaultProfilePicture = "https://via.placeholder.com/150?text=Profile+Picture";

interface ImageUploadProps {
  onImageUpload: (base64Image: string) => void;
  prefillImage?: string; // Optional prop to prefill with an existing image
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, prefillImage }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (prefillImage) {
      setSelectedImage(prefillImage);
    }
  }, [prefillImage]);

  const imageConfig = {
    quality: 0.7,
    maxWidth: 1024,
    maxHeight: 1024,
    autoRotate: true,
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
  
    if (!file) return;
  
    if (!file.type.startsWith('image/')) {
      console.error("Uploaded file is not an image");
      return;
    }
  
    try {
      const compressedFile = await readAndCompressImage(file, imageConfig);
      const blobURL = URL.createObjectURL(compressedFile);
      setSelectedImage(blobURL);
  
      const blob = await fetchBlobData(blobURL);
      const base64Data = await blobToBase64(blob);
      onImageUpload(base64Data); // Call the parent handler for profile image
    } catch (error) {
      console.error("Error handling file change:", error);
    }
  };

  async function fetchBlobData(blobURL: string): Promise<Blob> {
    const response = await fetch(blobURL);
    return response.blob();
  }

  async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative">
        <img
          src={selectedImage || defaultProfilePicture}
          alt="Uploaded"
          className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
        />
        <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 cursor-pointer shadow-lg">
        <FaCloudUploadAlt />
        </label>
      </div>

      <input
        type="file"
        id="profile-upload"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default ImageUpload;
