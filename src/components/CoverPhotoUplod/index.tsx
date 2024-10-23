import React, { useState, useEffect } from "react";
import { readAndCompressImage } from "browser-image-resizer";

interface ImageUploadProps {
  label: string;
  onImageUpload: (base64Image: string) => void;
  prefillImage?: string;
  imageConfig?: {
    quality: number;
    maxWidth: number;
    maxHeight: number;
  };
}

const defaultPlaceholder = "https://via.placeholder.com/150?text=Choose+image";

const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  onImageUpload,
  prefillImage,
  imageConfig = { quality: 0.7, maxWidth: 400, maxHeight: 400 },
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (prefillImage) {
      setSelectedImage(prefillImage);
    }
  }, [prefillImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) {
      console.error("Uploaded file is not an image");
      return;
    }

    try {
      const compressedFile = await readAndCompressImage(file, imageConfig);
      const blobURL = URL.createObjectURL(compressedFile);

      setSelectedImage(blobURL);

      const blob = await fetchBlobData(blobURL);
      const base64Data = await blobToBase64(blob);
      onImageUpload(base64Data);
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
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }

  return (
    <div className="flex flex-col items-center text-center space-y-2">
      {/* Image Preview */}
      <div className="w-32 h-32 border border-gray-300 flex items-center justify-center rounded">
        <img
          src={selectedImage || defaultPlaceholder}
          alt="Uploaded"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Label and Upload Buttons */}
      <div className="text-sm text-gray-800 dark:text-white ">{label}</div>
      <label
        htmlFor={`upload-${label}`}
        className="text-blue-600 cursor-pointer hover:underline"
      >
        Choose image
      </label>
      <span className="text-gray-400 text-sm">or</span>
      <button className="text-blue-600 hover:underline" onClick={() => alert('Add from URL functionality')}>
        Add from URL
      </button>

      <input
        type="file"
        id={`upload-${label}`}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </div>
  );
};

export default ImageUpload;
