import { useState } from "react";

const products = [
  {
    id: 1,
    title: "Adobe Photoshop CC 2022",
    location: "Lisbon, Portugal",
    price: "$850",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 2,
    title: "Figma Design Tool",
    location: "Remote",
    price: "$50",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 3,
    title: "Sketch App",
    location: "San Francisco, CA",
    price: "$99",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    title: "Adobe Illustrator",
    location: "Berlin, Germany",
    price: "$700",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 5,
    title: "Final Cut Pro",
    location: "London, UK",
    price: "$300",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 6,
    title: "Canva Pro",
    location: "Australia",
    price: "$120",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 7,
    title: "Microsoft Office 2021",
    location: "Toronto, Canada",
    price: "$150",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 8,
    title: "AutoCAD 2022",
    location: "New York, NY",
    price: "$400",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 9,
    title: "CorelDRAW",
    location: "Paris, France",
    price: "$250",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 10,
    title: "Ableton Live",
    location: "Stockholm, Sweden",
    price: "$400",
    imageUrl:
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const ProductSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  const categories = ["All", "Featured", "On sale", "Trending", "Top rated"];

  return (
    <section>
      <div className="container mx-auto py-9 md:py-12 px-4 md:px-6 max-w-6xl">
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-800 hover:underline mb-4">
          <span className="text-indigo-600 text-4xl">Trending</span> Products
        </h3>

        {/* Category Filter */}
        <div className="flex space-x-6 text-lg font-medium text-gray-500 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`relative py-2 ${
                selectedCategory === category
                  ? "text-indigo-600 font-semibold"
                  : ""
              }`}
            >
              {/* Line indicator */}
              {selectedCategory === category && (
                <span className="absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-full"></span>
              )}
              <span className="pl-4">{category}</span>
            </button>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="flex text-right mt-6">
          <button
            onClick={handleToggle}
            className="text-indigo-600 hover:underline"
          >
            {showAll ? "See Less" : "See More"}
          </button>
        </div>

        {/* Product Cards */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, showAll ? products.length : 8).map((product) => (
            <article
              key={product.id}
              className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300"
            >
              <a href="#">
                <div className="relative flex items-end overflow-hidden rounded-xl">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-auto"
                  />
                  <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                    <button className="text-sm">Add to cart</button>
                  </div>
                </div>
                <div className="mt-1 p-2">
                  <h2 className="text-slate-700">{product.title}</h2>
                  <p className="mt-1 text-sm text-slate-400">
                    {product.location}
                  </p>
                  <div className="mt-3 flex items-end justify-between">
                    <p className="text-lg font-bold text-blue-500">
                      {product.price}
                    </p>
                    <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-4 w-4"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                      <button className="text-sm">Add to cart</button>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
