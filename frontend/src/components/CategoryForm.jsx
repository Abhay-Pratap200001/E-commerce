import React from "react";

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,  //accepting prop from categoryList.jsx file to submit form of creating category
  buttonText = "Submit",
  handleDelete,
}) => {



  return (
    <div className="p-6 bg-slate-100 rounded-xl shadow-md">
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="py-3 px-4 border border-slate-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-slate-500"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}/>


        <div className="flex justify-between">
          {/* Submit Button */}
          <button
            type="submit"
            className="bg-pink-500 text-white py-2 px-6 rounded-lg shadow hover:bg-pink-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-pink-300">
            {buttonText}
          </button>


          {/* Delete Button (only if available) */}
          {handleDelete && (
            <button
              onClick={handleDelete}
              type="button"
              className="bg-red-500 text-white py-2 px-6 rounded-lg shadow hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-300">
              Delete
            </button>
          )}
          
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
