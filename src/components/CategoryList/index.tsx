import React from "react";
import Category from "../Category";

interface CategoryData {
  imageSrc: string;
  altText: string;
  categoryName: string;
}

const categories: CategoryData[] = [
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/09/02/22/10/dolphin-2708695_1280.png",
    altText: "Headphones",
    categoryName: "Headphones",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2024/05/16/09/15/tea-8765473_1280.png",
    altText: "Cutlery",
    categoryName: "Cutlery",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/05/31/11/28/the-cup-2360104_1280.png",
    altText: "Tea",
    categoryName: "Tea",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/07/29/18/42/wooden-box-2552370_1280.png",
    altText: "Treasure Box",
    categoryName: "Treasure Box",
  },
  {
    imageSrc:
      "https://cdn.pixabay.com/photo/2017/09/17/02/02/png-2757379_1280.png",
    altText: "Vehicles",
    categoryName: "Vehicles",
  },
];

const CategoryList: React.FC = () => {
  return (
    <div className="flex flex-col pt-20 pb-4">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.map((category, index) => (
          <Category
            key={index}
            imageSrc={category.imageSrc}
            altText={category.altText}
            categoryName={category.categoryName}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
