import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-100 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex items-center space-x-3 px-6 py-3 bg-white rounded-2xl shadow-lg">
        {/* Spinner */}
        <svg
          className="w-6 h-6 text-indigo-600 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4">
            </circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z">
            </path>
        </svg>

        {/* Text */}
        <span className="text-gray-800 font-semibold text-lg animate-pulse">
          Processing…
        </span>
      </div>
    </div>
  );
};

export default Loader;
