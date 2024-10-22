
const ConractStore: React.FC = () => {
  return (
    <form action="">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
        <div className="relative mb-6">
          <input
            type="text"
            id="default-search"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="Name..."
          />
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            id="default-search"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="Email Address..."
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-x-8">
        <div className="relative mb-6">
          <input
            type="text"
            id="default-search"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="Phone Number..."
          />
        </div>
        <div className="relative mb-6">
          <input
            type="text"
            id="default-search"
            className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
            placeholder="City , Country..."
          />
        </div>
      </div>
      <div className="relative mb-6">
        <input
          type="text"
          id="default-search"
          className="block w-full h-11 px-5 py-2.5 bg-white leading-7 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none "
          placeholder="Tpoic..."
        />
      </div>
      <div className="relative mb-6">
        <textarea
          id="default-search"
          className="block w-full h-40 px-5 py-2.5 bg-white leading-7 resize-none text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-2xl placeholder-gray-400 focus:outline-none "
          placeholder="Your Message..."
          defaultValue={""}
        />
      </div>
      <div className="flex items-center justify-center">
        <button className="w-52 h-12 bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 rounded-full shadow-xs text-white text-base font-semibold leading-6">
          Send Message
        </button>
      </div>
    </form>
  );
};
export default ConractStore;
