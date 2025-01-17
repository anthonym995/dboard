import React, { useState, useEffect } from "react";
import { fetchblogs } from "../../api/blogs";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import BlogItem from "../../pages/blogs/components/BlogItem";
import EmptyState from "../../components/ui/EmptyState";
import FromBlogs from "../../pages/blogs/components/FromBlogs";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchblogs();
      setBlogs(response);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handelAddblogs = () => { setSelectedUser(null); setIsOpen(true);}
  
  useEffect(() => { fetchData(); }, []);

  if (isLoading) return <Loader height="true" />;
  if (error) return <ErrorState />;

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Blogs</h1>
        <PrimaryButton label="+ Create Blog"  onClick={handelAddblogs}  />
      </div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0 pt-5">
          {blogs.length === 0 ? <EmptyState /> : blogs.map((blog) => (<BlogItem key={blog._id} blog={blog} />))}
        </ul>
      </div>
      <div>
         <FromBlogs  user={selectedUser} isOpen={isOpen} onCancel={() => setIsOpen(false)}  />
      </div>
    </div>
  );
}
