import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogsById, deleteBlogs } from "../../../api/blogs";
import Loader from "../../../components/ui/Loader";
import ErrorState from "../../../components/ui/ErrorState";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { RiShareForwardFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import BlogForm from "../../../pages/blogs/components/BlogForm";
import DangerButton from "../../../components/Buttons/DangerButton";
import ModalPopupSmall from "../../../components/Modal/PopupSmall";
import { toast } from "react-toastify";  // Import toast if you haven't already

export default function PostDetail({ onUpdate }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for navigation

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const data = await blogsById(id);
      if (!data) throw new Error("No data returned from the API.");
      setPost(data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleEditPost = () => {
    toggleModal();
  };

  const handleUpdateBlog = (updatedBlog) => {
    setPost(updatedBlog);
    onUpdate(updatedBlog);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteBlogs(id);  // Call deleteBlogs for blog deletion
      toast.success("Blog deleted successfully.");
      navigate("/blogs");  // Navigate to the blogs list after deletion
    } catch (err) {
      console.error("Error deleting blog:", err.message);
      toast.error("Failed to delete the blog. Please try again.");
    } finally {
      setDeleting(false);
      setShowModel(false);
    }
  };

  const togglePopup = () => {
    setShowModel(!showModel);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorState errorMessage={error.message} />;
  if (!post) return <p className="text-center text-gray-500">No post found.</p>;

  const { title, content, author, status } = post;

  return (
    <div className="p-4 space-y-8 bg-gray-100 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">{author || "Unknown Author"}</h2>
            <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
        <h1 className="text-lg font-bold text-gray-800 mb-2">{title || "Untitled Post"}</h1>
        <p className="text-sm text-gray-700 mb-4">{content || "No content available."}</p>
        <p className="text-sm text-gray-700 mb-4">Status: {status || "N/A"}</p>
        <div className="border-t border-gray-300 pt-4 flex justify-around text-gray-500">
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <GoThumbsup />
            <span>Like</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <GoThumbsdown />
            <span>Dislike</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <FaRegCommentDots />
            <span>Comment</span>
          </button>
          <button className="flex items-center space-x-2 hover:text-blue-500">
            <RiShareForwardFill />
            <span>Share</span>
          </button>
        </div>
        <div className="mt-4 text-right">
          <button onClick={handleEditPost} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Edit Post</button>
        </div>
        <DangerButton label="Delete" onClick={() => togglePopup()} />

        {isModalOpen && (
          <BlogForm
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            onSubmitSuccess={handleUpdateBlog}
            initialData={post}
          />
        )}

        {showModel && (
          <ModalPopupSmall
            isOpen={showModel}
            onClose={togglePopup}
            title="Are you sure you want to delete this blog?"
            onConfirm={handleDelete}
            onCancel={togglePopup}
          />
        )}
      </div>
    </div>
  );
}
