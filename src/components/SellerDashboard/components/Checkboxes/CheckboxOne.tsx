import { useState } from 'react';

interface Category {
  name: string;
  checked: boolean;
  subcategories: { name: string; checked: boolean }[];
}

const CheckboxOne = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      name: 'New Arrival',
      checked: false,
      subcategories: [],
    },
    {
      name: 'Electronics',
      checked: false,
      subcategories: [
        { name: 'Laptop', checked: false },
        { name: 'Smartphone', checked: false },
        { name: 'Headphones', checked: false },
      ],
    },
  ]);

  const handleCategoryChange = (categoryIndex: number) => {
    const updatedCategories = [...categories];
    const category = updatedCategories[categoryIndex];
    
    // Toggle main category and all its subcategories
    category.checked = !category.checked;
    category.subcategories = category.subcategories.map(sub => ({
      ...sub,
      checked: category.checked,
    }));

    setCategories(updatedCategories);
  };

  const handleSubcategoryChange = (categoryIndex: number, subcategoryIndex: number) => {
    const updatedCategories = [...categories];
    const subcategory = updatedCategories[categoryIndex].subcategories[subcategoryIndex];
    
    // Toggle subcategory
    subcategory.checked = !subcategory.checked;

    // If any subcategory is unchecked, uncheck the main category
    const allSubcategoriesChecked = updatedCategories[categoryIndex].subcategories.every(
      (sub) => sub.checked
    );
    updatedCategories[categoryIndex].checked = allSubcategoriesChecked;

    setCategories(updatedCategories);
  };

  return (
    <div className="space-y-4">
      {categories.map((category, categoryIndex) => (
        <div key={category.name}>
          {/* Main Category */}
          <label className="flex cursor-pointer select-none items-center">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={category.checked}
                onChange={() => handleCategoryChange(categoryIndex)}
              />
              <div
                className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                  category.checked && 'border-primary bg-gray dark:bg-transparent'
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-sm ${category.checked && 'bg-primary'}`}
                ></span>
              </div>
            </div>
            {category.name}
          </label>

          {/* Subcategories */}
          {category.subcategories.length > 0 && (
            <div className="ml-6 space-y-2">
              {category.subcategories.map((sub, subcategoryIndex) => (
                <label key={sub.name} className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={sub.checked}
                      onChange={() => handleSubcategoryChange(categoryIndex, subcategoryIndex)}
                    />
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                        sub.checked && 'border-primary bg-gray dark:bg-transparent'
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-sm ${sub.checked && 'bg-primary'}`}
                      ></span>
                    </div>
                  </div>
                  {sub.name}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckboxOne;
