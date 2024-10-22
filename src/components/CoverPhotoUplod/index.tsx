import React, { useState, useEffect } from "react";
import { readAndCompressImage } from "browser-image-resizer";
import { FaCloudUploadAlt } from "react-icons/fa";

const defaultCoverPicture = "https://via.placeholder.com/800x300?text=Cover+Picture";
const smallPlaceholder = "https://via.placeholder.com/150x150?text=Upload";

interface CoverImageUploadProps {
  onCoverImageUpload: (base64Images: string[]) => void;
  prefillCoverImage?: string;
}

const CoverImageUpload: React.FC<CoverImageUploadProps> = ({
  onCoverImageUpload,
  prefillCoverImage,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    if (prefillCoverImage) {
      setSelectedImages([prefillCoverImage]);
    }
  }, [prefillCoverImage]);

  const imageConfig = {
    quality: 0.7,
    maxWidth: 1600,
    maxHeight: 600,
    autoRotate: true,
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const imageArray = Array.from(files).slice(0, 3); // Limit to 3 images under the main one
    const base64Images: string[] = [];
    const imagePreviews: string[] = [...selectedImages];

    for (const file of imageArray) {
      if (!file.type.startsWith("image/")) {
        console.error("Uploaded file is not an image");
        return;
      }

      try {
        const compressedFile = await readAndCompressImage(file, imageConfig);
        const blobURL = URL.createObjectURL(compressedFile);
        imagePreviews.push(blobURL);

        const blob = await fetchBlobData(blobURL);
        const base64Data = await blobToBase64(blob);
        base64Images.push(base64Data);
      } catch (error) {
        console.error("Error handling file change:", error);
      }
    }

    setSelectedImages(imagePreviews.slice(0, 4)); // Only keep the main image and 3 smaller ones
    onCoverImageUpload(base64Images);
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
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Main Image Placeholder */}
      <div className="relative w-full max-w-lg">
        <img
          src={selectedImages[0] || defaultCoverPicture}
          alt="Main Uploaded"
          className="w-full h-48 rounded-lg object-cover border-2 border-gray-300"
        />
        <label
          htmlFor="cover-upload"
          className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-2 cursor-pointer shadow-lg"
        >
          <FaCloudUploadAlt />
        </label>
      </div>

      <input
        type="file"
        id="cover-upload"
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        multiple
      />

      {/* Smaller Images Placeholder */}
      <div className="grid grid-cols-3 gap-4 w-full max-w-lg">
        {Array(3).fill(0).map((_, index) => (
          <div key={index} className="relative">
            <img
              src={selectedImages[index + 1] || smallPlaceholder}
              alt={`Small Uploaded ${index + 1}`}
              className="h-24 w-full object-cover rounded-lg border-2 border-gray-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoverImageUpload;
