import { useState } from "react";

interface FormData {
  links: string[];
}

export default function LinkSection() {
  const [formData, setFormData] = useState<FormData>({
    links: [""], // Start with one empty link input
  });

  const handleLinkChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newLinks = [...formData.links];
    newLinks[index] = event.target.value;
    setFormData({ ...formData, links: newLinks });
  };

  const handleAddLink = (index: number) => {
    const newLinks = [...formData.links];
    newLinks.splice(index + 1, 0, ""); // Add a new link after the current one
    setFormData({ ...formData, links: newLinks });
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = formData.links.filter((_, i) => i !== index);
    setFormData({ ...formData, links: newLinks });
  };

  return (
    <div className="sm:col-span-2 sm:col-start-1">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Links
      </label>
      {formData.links.map((link, index) => (
        <div className="mt-2 flex items-center" key={index}>
          <button
            type="button"
            onClick={() => handleAddLink(index)}
            className="mr-2 text-green-500 hover:text-green-700"
          >
            +
          </button>
          <input
            type="url"
            value={link}
            onChange={(e) => handleLinkChange(index, e)}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter link"
            
          />
          {formData.links.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemoveLink(index)}
              className="ml-2 text-red-500 hover:text-red-700   "
            >
              -
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
