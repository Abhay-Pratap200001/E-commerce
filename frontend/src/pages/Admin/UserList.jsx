// Importing React hooks and icons
import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

// Importing reusable components
import Message from "../../components/Message";
import Loader from "../../components/Loader";

// Importing Redux Toolkit Query hooks for API calls
import {
  useDeleteUserMutation,   // for deleting a user
  useGetUsersQuery,        // for fetching users list
  useUpdateUserMutation,   // for updating user details
} from "../../redux/api/usersApiSlice";

// Importing toast for showing error/success notifications
import { toast } from "react-toastify";


const UserList = () => {
   
  // Fetch all users from backend using RTK Query
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  // API hooks for delete and update
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  // Local state for editing user (id, name, email)
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");



  // Re-fetch users whenever component loads
  useEffect(() => {
    refetch();
  }, [refetch]);


  // Delete user handler
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteUser(id);   // API call
        refetch();              // Refresh table after delete
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };



  // Enable edit mode for selected user
  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);      // store user ID in state
    setEditableUserName(username);
    setEditableUserEmail(email);
  };



  // Update user handler
  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,                  // sending id
        username: editableUserName,  // updated username
        email: editableUserEmail,    // updated email
      });
      setEditableUserId(null);       // exit edit mode
      refetch();                     // refresh data
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };



  return (
    <div className="p-">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>

      {/* Loader while data is fetching */}
      {isLoading ? ( <Loader /> ) : error ? (<Message variant="danger">{error?.data?.message || error.error}</Message> ) : (
        <div className="flex flex-col md:flex-row">


          {/* User Table */}
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>


            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  {/* User ID */}
                  <td className="px-4 py-2">{user._id}</td> 


                  {/* Username Column */}
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
 

                      // If user is being edited → show input field
                      <div className="flex items-center">

                     {/* input visible after user click on edit icon */}
                        <input 
                          type="text" 
                          value={editableUserName} 
                          onChange={e => setEditableUserName(e.target.value)} 
                          className="w-full p-2 border rounded-lg"/>


                        <button 
                          onClick={() => updateHandler(user._id)} 
                          className="ml-2 bg-amber-400 p-2 px-4 rounded-lg">
                          <FaCheck/>
                        </button>
                      </div>) : (

                        

                      // Normal view (just text + edit button)
                      <div className="flex items-center">
                        {user.username} {" "}
                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                          <FaEdit className="ml-[1rem]"/>
                        </button>
                      </div>
                    )}
                  </td>


                  {/* Email Column */}
                  <td className="px-4 py-2">
                    {editableUserId === user._id ? (
                      <div className="flex items-center">

                        {/* input visible after user click on edit icon */}
                        <input 
                          type="text"  
                          value={editableUserEmail} 
                          onChange={e => setEditableUserEmail(e.target.value)} 
                          className="w-full p-2 border rounded-lg"/>

                        <button 
                          onClick={() => updateHandler(user._id)} 
                          className="ml-2 bg-amber-300 py-2 px-4 rounded-lg">
                          <FaCheck/>
                        </button>
                      </div>) : (



                      <div className="flex items-center">
                        <p>{user.email}</p>
                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                          <FaEdit className="ml-[1rem]"/>
                        </button>
                      </div>
                    )}
                  </td>



                  {/* Admin Column */}
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }}/>) : (<FaTimes style={{ color: 'red' }}/>)}
                  </td> 



                  {/* Delete Button */}
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <div className="flex">
                        <button 
                          onClick={() => deleteHandler(user._id)} 
                          className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded">
                          <FaTrash/>
                        </button>
                      </div>
                    )}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      )}
    </div>
  );
};

export default UserList;
