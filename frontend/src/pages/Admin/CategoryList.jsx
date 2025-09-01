import { useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeletCategoryMutation,
  useFetchCategoriesQuery,
} from "../../redux/api/categoryApiSlice";

import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm";
import Model from "../../components/Model";

const CategoryList = () => {
  const { data: categories } = useFetchCategoriesQuery();
  const [name, setName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeletCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Category name is required");
      return;
    }
    try {
      const result = await createCategory({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating category failed, try again.");
    }
  };

  const handleUpdateCategory = async (e) => {
  e.preventDefault();
  
  if (!updatingName) {
    toast.error("Category name is required");
    return;
  }
  try {
    const result = await updateCategory({
      categoryId: selectedCategory._id,
      updatedCategory: { name: updatingName },  
    }).unwrap();

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(`${result.name} is updated`);
      setSelectedCategory(null);
      setUpdatingName("");
      setModalVisible(false);
    }
  } catch (error) {
    console.error(error);
    toast.error("Update failed, try again.");
  }
};
  

  const handleDeleteCategory = async () => {
    try {
      const result = await deleteCategory(selectedCategory._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        setSelectedCategory(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Category deletion failed. Try again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row min-h-screen bg-slate-50">
      <div className="md:w-3/4 p-6 bg-white rounded-xl shadow-md border border-slate-200">
        {/* Header */}
        <h2 className="text-2xl font-semibold text-slate-700 mb-6">
          Manage Categories
        </h2>

        {/* Category Form */}
        <CategoryForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateCategory}/>
          <br />

        <hr className="my-6 border-slate-300" />

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3">
          {categories?.map((category) => (
            <div key={category._id}>
            <button className="bg-slate-200 text-slate-700 py-2 px-5 rounded-lg border border-slate-300 shadow-sm 
                         hover:bg-slate-700 hover:text-white hover:border-slate-700 
                         transition-all duration-200"
              onClick={() => {
                {
                setModalVisible(true);
                setSelectedCategory(category);
                setUpdatingName(category.name);
                }
                }}>{category.name}
                </button>
            </div>
          ))}
        </div>
        <Model isOpen={modalVisible} onClose={()=> setModalVisible(false)}>
          <CategoryForm value={updatingName}
          setValue={(value) => setUpdatingName(value)}
          handleSubmit={handleUpdateCategory}
          buttonText="Update"
          handleDelete={handleDeleteCategory}/>
        </Model>
          </div>
    </div>
  );
};

export default CategoryList;




      {/* Update Category Modal (Optional UI) */}
      {/* {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold text-slate-700 mb-4">
              Update Category
            </h3>
            <CategoryForm
              value={updatingName}
              setValue={setUpdatingName}
              handleSubmit={handleUpdateCategory}
              handleDelete={handleDeleteCategory}
              buttonText="Update"/>
            <button
              onClick={() => setModalVisible(false)}
              className="mt-3 w-full bg-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-400 transition">
              {category.name}
            </button>
          </div>
        </div>
        )} */}