import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/ui/Loader"; // Ensure this is correct
import { fetchUserById, updateUser } from "../../api/users";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import InputField from '../../components/forms/InputField';
import SelectField from "../../components/forms/SelectField";
import { useForm } from "react-hook-form";

const UserDetail = ({ userId, initialData }) => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialData, // Populate with existing user data
  });

  const fetchUser = async () => {
    try {
      const data = await fetchUserById(id); // Ensure this function works
      setUser(data);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const updatedUser = await updateUser(id, formData); // Use `id` from `useParams`
      alert("User updated successfully!");
      console.log("Updated user data:", updatedUser);
      setUser(updatedUser); // Update the local user state
      setIsModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error("Error updating user:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="h-60 flex-center">
        <Loader /> {/* Ensure Loader is imported */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-60 flex-center w-full">
        <ErrorState />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-60 flex-center">
        <EmptyState />
      </div>
    );
  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  return (
    <>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto space-y-8">
        {/* User Header Section */}
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            <img className="h-32 w-32 rounded-full border-4 border-indigo-500" src={user.image} alt="User profile" />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-900">{user.name}</h2>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
            <p className="mt-2 text-sm text-gray-500">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            <div className="mt-4 flex space-x-6">
              <a href={`mailto:${user.email}`} className="text-indigo-600 hover:text-indigo-800">
                {user.email}
              </a>
              <a href={`tel:${user.phone}`} className="text-indigo-600 hover:text-indigo-800">
                {user.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Bio</h3>
          <p className="mt-2 text-gray-600">{user.address}</p>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <ul className="mt-2 space-y-4">
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="text-gray-400">📝</span>
              <span className="text-gray-900">Updated profile picture</span>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="text-gray-400">📚</span>
              <span className="text-gray-900">Completed React Course</span>
              <span className="text-sm text-gray-500">3 days ago</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-600">
              <span className="text-gray-400">💬</span>
              <span className="text-gray-900">Commented on "Tailwind CSS Tips"</span>
              <span className="text-sm text-gray-500">1 week ago</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons Section */}
        <div className="flex space-x-4">
          <button onClick={toggleModal} className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            Edit Profile
          </button>
        </div>

        {/* Main Modal */}
        {isModalOpen && (
          <div
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen overflow-y-auto overflow-x-hidden"
            aria-hidden="true"
          >
            <div className="relative p-4 w-full max-w-md">
              {/* Modal Content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit your Account
                  </h3>
                  <button
                    onClick={toggleModal}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 md:p-5">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <InputField
                        label="Name"
                        id="name"
                        register={register}
                        validation={{ required: "Name is required" }}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <InputField
                        label="Email"
                        id="email"
                        register={register}
                        validation={{
                          required: "Email is required",
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email format",
                          },
                        }}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <InputField
                        label="Phone"
                        id="phone"
                        register={register}
                        validation={{
                          required: "Phone number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Phone number must be 10 digits",
                          },
                        }}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <InputField
                        label="Address"
                        id="address"
                        register={register}
                        validation={{ required: "Address is required" }}
                        errors={errors}
                      />
                    </div>
                    <div>
                      <SelectField
                        label="Role"
                        id="role"
                        options={[
                          { value: "admin", label: "Admin" },
                          { value: "user", label: "User" },
                        ]}
                        register={register}
                        validation={{ required: "Role is required" }}
                        errors={errors}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full text-white ${loading ? "bg-blue-400" : "bg-blue-700 hover:bg-blue-800"
                        } focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                    >
                      {loading ? "Updating..." : "Update User"}
                    </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default UserDetail;
