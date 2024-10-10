import React, { useState, useEffect } from "react";
import { readAndCompressImage } from 'browser-image-resizer';
import { FaCloudUploadAlt } from "react-icons/fa";

const defaultCoverPicture = "https://via.placeholder.com/800x300?text=Cover+Picture";

interface CoverImageUploadProps {
  onCoverImageUpload: (base64Image: string) => void;
  prefillCoverImage?: string; // Optional prop to prefill with an existing image
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({ onCoverImageUpload, prefillCoverImage }) => {
  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null);

  useEffect(() => {
    if (prefillCoverImage) {
      setSelectedCoverImage(prefillCoverImage);
    }
  }, [prefillCoverImage]);

  const imageConfig = {
    quality: 0.7,
    maxWidth: 1600,
    maxHeight: 600,
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
      setSelectedCoverImage(blobURL);

      const blob = await fetchBlobData(blobURL);
      const base64Data = await blobToBase64(blob);
      onCoverImageUpload(base64Data); // Call the parent handler for cover image
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
          src={selectedCoverImage || defaultCoverPicture}
          alt="Uploaded"
          className="w-full h-48 rounded-lg object-cover border-2 border-gray-300"
        />
        <label htmlFor="cover-upload" className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 cursor-pointer shadow-lg">
        <FaCloudUploadAlt />

        </label>
      </div>

      <input
        type="file"
        id="cover-upload"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default CoverImageUpload;
