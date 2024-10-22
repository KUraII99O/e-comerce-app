import React, { useState } from "react";

const SelectGroupTwo: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = (value: string) => {
    setSelectedOption(value);
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-black dark:text-white">Status</label>

      <div className="relative z-20 bg-white dark:bg-form-input">
        <select
          value={selectedOption}
          onChange={(e) => changeTextColor(e.target.value)}
          className={`relative z-20 w-full appearance-none rounded border py-3 px-12 outline-none transition 
            ${isOptionSelected ? "border-green-500 text-black dark:text-white" : "border-stroke dark:border-form-strokedark"}
            bg-transparent focus:border-green-500 active:border-green-500 dark:bg-form-input`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Status
          </option>
          <option value="Published" className="text-body dark:text-bodydark">
            Published
          </option>
          <option value="Draft" className="text-body dark:text-bodydark">
            Draft
          </option>
          <option value="Pending" className="text-body dark:text-bodydark">
            Pending
          </option>
        </select>

        {isOptionSelected && (
          <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2 text-green-500">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 10l2.5 2.5L17.5 5"
                stroke={isOptionSelected ? "currentColor" : "white"} // Use white when in dark mode
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

export default SelectGroupTwo;
