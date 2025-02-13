import { useState, useEffect } from "react";
import { fetchblogs } from "../../api/blogs";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import BlogItem from "../../pages/blogs/components/BlogItem";
import EmptyState from "../../components/ui/EmptyState";
import FormBlogs from "../../pages/blogs/components/FromBlogs";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchblogs();
      setBlogs(response || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const addCard = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog]); // ✅ Ensure new blog is added properly
  };

  if (isLoading) return <Loader height="true" />;
  if (error) return <ErrorState message={error} />; // ✅ Show error message

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <h1 className="text-xl md:text-3xl font-semibold tracking-tight text-gray-900">
              Blog
            </h1>
            <PrimaryButton label="+ Create Blog" onClick={openModal} />
          </div>
          <p className="mt-2 text-lg/8 text-gray-600">
            Learn how to grow your business with our expert advice.
          </p>
          <div className="space-y-10 border-t border-gray-200 pt-5 mt-5 sm:mt-10 sm:pt-10">
            {blogs.length === 0 ? (
              <EmptyState />
            ) : (
              blogs.map((blog, index) => (
                <BlogItem key={blog._id || index} blog={blog} /> // ✅ Ensure unique key
              ))
            )}
          </div>
        </div>
      </div>
      {isModal && (
        <FormBlogs isOpen={isModal} onCancel={closeModal} addCard={addCard} />
      )}
    </div>
  );
}
