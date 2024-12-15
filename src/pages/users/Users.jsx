import { useState, useEffect } from "react";
import { fetchUsers } from "../../api/users";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import UserItem from "./components/UserItem";
import EmptyState from "../../components/ui/EmptyState";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import UserForm from "./components/UserForm";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsersList = async () => {
    setIsLoading(true);
    try {
      const response = await fetchUsers();
      setUsers(response);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersList();
  }, []);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsOpen(true);
  };

  if (isLoading) {
    return <Loader height="true" />;
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-xl md:text-3xl font-bold">Users</h2>
        <PrimaryButton label="+ Add User" onClick={handleAddUser} />
      </div>

      <ul role="list" className="divide-y divide-gray-100">
        {users.length === 0 ? <EmptyState /> : users.map((user) => <UserItem key={user.uuid} user={user} />)}
      </ul>

      <UserForm user={selectedUser} isOpen={isOpen} onCancel={() => setIsOpen(false)} />
    </div>
  );
}
