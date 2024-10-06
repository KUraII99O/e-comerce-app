import React from "react";

interface CategoryProps {
  imageSrc: string;
  altText: string;
  categoryName: string;
}

const Category: React.FC<CategoryProps> = ({
  imageSrc,
  altText,
  categoryName,
}) => {
  return (
    <div className="flex items-start rounded-full bg-white p-4 shadow-lg transition-transform duration-300 hover:scale-105">
      <figure className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-100 ">
        <img
          className="absolute inset-0 h-full w-full object-contain"
          src={imageSrc}
          alt={altText}
        />
      </figure>
      <div className="ml-4">
        <h3 className="font-semibold">{categoryName}</h3>
      </div>
    </div>
  );
};

export default Category;
