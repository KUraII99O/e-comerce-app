
const featureData = [
  {
    title: "Free Delivery",
    description: "Orders from all item",
    colorClass: "border-blue-100 bg-blue-50",
    iconClass: "text-blue-400",
    iconPath: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
  },
  {
    title: "Return & Refund",
    description: "Money-back guarantee",
    colorClass: "border-orange-100 bg-orange-50",
    iconClass: "text-orange-400",
    iconPath: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    title: "Member Discount",
    description: "Every order over $140.00",
    colorClass: "border-red-100 bg-red-50",
    iconClass: "text-red-400",
    iconPath: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  },
  {
    title: "Support 24/7",
    description: "Contact us 24 hours a day",
    colorClass: "border-indigo-100 bg-indigo-50",
    iconClass: "text-indigo-400",
    iconPath: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
  },
];

const FeatureCards = () => {
  return (
    <div className="flex flex-col pt-10 pb-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featureData.map((feature, index) => (
          <div key={index} className="flex items-start rounded-xl bg-white p-4 shadow-lg">
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${feature.colorClass}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${feature.iconClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={feature.iconPath} />
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
