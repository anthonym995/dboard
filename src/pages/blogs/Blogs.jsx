import React, { useState, useEffect } from "react";
import { fetchblogs } from "../../api/blogs";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";
import BlogIteam from "../../pages/blogs/components/BlogIteam";


export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {fetchData();},[]); // fatchdata  

  if (isLoading) return <Loader height="true" />;
  if (error) return <ErrorState />;
  if (!blogs)return <p>Now Data Fount</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Blogs</h1>
       <div>
       { blogs  &&  blogs.length > 0 ? (
      <ul className="space-y-6 p-4">
        {blogs.map((blog) => (
          <BlogIteam key={blog._id} blog={blog} />
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-500 mt-8">No blogs available.</p>
    )}
       </div>   
    </div>
  );
}
