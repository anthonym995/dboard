import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/ui/Loader";
import { fetchUserById , deleteUser } from "../../api/users";
import ErrorState from "../../components/ui/ErrorState";
import EmptyState from "../../components/ui/EmptyState";
import SubtleButton from "../../components/Buttons/SubtleButton";
import DangerButton from "../../components/Buttons/DangerButton";
import UserForm from "./components/UserForm";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [Deleting , setDeleting] = useState(false);
  const navigate = useNavigate();


  const fetchUser = async () => {
    try {
      const data = await fetchUserById(id);
      setUser(data);
    } catch (err) {
      setError(err.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const hadleEditUser = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };


  const handleDelete = async (uuid) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setDeleting(true);
      try {
        await deleteUser(uuid);
        alert("User deleted successfully.");
        setUser(null); 
        navigate("/users");
      } catch (err) {
        console.error("Error deleting user:", err.message);
      
        alert("Failed to delete the user. Please try again.");
      } finally {
        setDeleting(false);
        
      }
    }
  };
  


  if (loading) {
    return (
      <div className="h-60 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-60 flex items-center justify-center w-full">
        <ErrorState />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-60 flex items-center justify-center">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* User Header Section */}
        <div className="bg-indigo-600 px-6 py-8 sm:p-10 sm:flex sm:items-center sm:space-x-8">
          <div className="flex-shrink-0">
            <img className="h-24 w-24 rounded-full ring-4 ring-indigo-300" src={user.image} alt="User profile" />
          </div>
          <div className="mt-4 sm:mt-0">
            <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
            <p className="text-indigo-200">Role: {user.role}</p>
            <p className="mt-1 text-indigo-200">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            <div className="mt-4 flex space-x-4">
              <a
                href={`mailto:${user.email}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-white rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Email
              </a>
              <a
                href={`tel:${user.phone}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-white rounded-md shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Call
              </a>
            </div>
          </div>
        </div>

        {/* User Details Section */}
        <div className="px-6 py-8 space-y-8">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Bio</h3>
            <p className="mt-2 text-gray-600">{user.address}</p>
          </div>

          {/* Recent Activity Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <ul className="mt-4 divide-y divide-gray-200">
              <li className="py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full">📝</span>
                  <span className="ml-4 text-gray-700">Updated profile picture</span>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full">📚</span>
                  <span className="ml-4 text-gray-700">Completed React Course</span>
                </div>
                <span className="text-sm text-gray-500">3 days ago</span>
              </li>
              <li className="py-4 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="bg-indigo-100 text-indigo-600 p-2 rounded-full">💬</span>
                  <span className="ml-4 text-gray-700">Commented on Tailwind CSS Tips</span>
                </div>
                <span className="text-sm text-gray-500">1 week ago</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Section */}
        <div className="bg-gray-50 px-6 py-4 flex justify-start gap-4">
          <SubtleButton label="Edit Profile" onClick={() => hadleEditUser(user)} />
          <DangerButton label="Delete" onClick={() => handleDelete(user.uuid)}  disabled={Deleting}   />
        </div>
      </div>

      {/* form */}
      <UserForm user={selectedUser} isOpen={isOpen} onCancel={() => setIsOpen(false)} />
    </div>
  );
};

export default UserDetail;
