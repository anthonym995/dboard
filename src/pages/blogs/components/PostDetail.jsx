import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { blogsById, deleteBlogs } from "../../../api/blogs";
import Loader from "../../../components/ui/Loader";
import ErrorState from "../../../components/ui/ErrorState";
import { GoThumbsdown, GoThumbsup } from "react-icons/go";
import { RiShareForwardFill } from "react-icons/ri";
import { FaRegCommentDots } from "react-icons/fa";
import FromBlogs from "../../../pages/blogs/components/FromBlogs";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../../../components/Modal/DeleteModal";
import { toast } from "react-toastify";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch blog post by ID
  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const data = await blogsById(id);
      if (!data) throw new Error("No data returned from the API.");
      console.log("Fetched Blog Data:", data); // Debugging
      setPost(data);
    } catch (err) {
      console.error("Error fetching blog:", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // Open modal for editing
  const handleEditBlogs = () => {
    setSelectedUser(post);
    setIsOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  // Update blog after editing
  const handleUpdateBlog = async (updatedBlog) => {
    if (updatedBlog) {
      console.log("Updated Blog Data:", updatedBlog);
      await fetchPost();
    }
    setIsOpen(false);
  };

  // Toggle Delete Modal
  const toggleDeleteModal = () => {
    setIsModal(!isModal);
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteBlogs(id);
      toast.success("Blog deleted successfully!");
      navigate("/blogs");
    } catch (err) {
      toast.error("Failed to delete blog. Try again.");
    } finally {
      setIsDeleting(false);
      setIsModal(false);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorState errorMessage={error.message} />;
  if (!post)
    return <p className="text-center text-gray-500">No posts found.</p>;

  const { title, content, author, status, tags } = post;

  return (
    <div className="p-4 space-y-8 bg-gray-100 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
          <div>
            <h2 className="text-base font-semibold text-gray-800">
              {author || "Unknown Author"}
            </h2>
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
        <h1 className="text-lg font-bold text-gray-800 mb-2">
          {title || "Untitled Post"}
        </h1>
        <p className="text-sm text-gray-700 mb-4">
          {content || "No content available."}
        </p>
        <p className="text-sm text-gray-700 mb-4">
          {tags ? tags.join(", ") : "No tags available."}
        </p>
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
          <button
            onClick={handleEditBlogs}
            className="flex items-center space-x-2 hover:text-blue-500"
          >
            <CiMenuKebab />
            <span>Edit</span>
          </button>
          <button
            onClick={toggleDeleteModal}
            className="flex items-center space-x-2 hover:text-blue-500"
            disabled={isDeleting}
          >
            <MdDelete />
          </button>
        </div>
      </div>

      {/* Edit Blog Modal */}
      {isOpen && selectedUser && (
        <FromBlogs
          isOpen={isOpen}
          initialData={selectedUser}
          onCancel={handleCloseModal}
          onSubmitSuccess={handleUpdateBlog}
        />
      )}

      {/* Delete Blog Modal */}
      {isModal && (
        <DeleteModal
          isOpen={isModal}
          onCancel={toggleDeleteModal}
          onConfirm={handleDelete}
          title="Are you sure you want to delete this blog?"
        />
      )}
    </div>
  );
}
