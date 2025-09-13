function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col justify-center items-center py-6 space-y-3">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin-slow shadow-lg"></div>
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
}

export default Loader;
