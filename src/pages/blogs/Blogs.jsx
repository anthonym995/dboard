import React, { useState, useEffect } from "react";
import { fetchblogs } from "../../api/blogs";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import BlogItem from "../../pages/blogs/components/BlogIteam";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import BlogForm from "../../pages/blogs/components/BlogForm";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchblogs();
      if (Array.isArray(response)) {
        setBlogs(response);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]); // Add the new blog to the list
    toggleModal(); // Close the modal
  };

  

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <Loader height={true} />;
  if (error) return <ErrorState message={error} />;
  if (blogs.length === 0)
    return <p className="text-center text-gray-500 mt-8">No blogs available.</p>;

  return (
    <div className="p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Blogs</h1>
        <PrimaryButton label="+ Create Blog" onClick={toggleModal} />
      </div>
      <div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-0 pt-5">
          {blogs.map((blog) => (
            <BlogItem key={blog._id} blog={blog} /> // Ensure BlogItem component is set up to display the blog details properly
          ))}
        </ul>
      </div>
      <BlogForm isModalOpen={isModalOpen} toggleModal={toggleModal} onCreateBlog={handleCreateBlog} />
    </div>
  );
}
