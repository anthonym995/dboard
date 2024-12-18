import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../../api/blogs"; // Ensure this is correctly defined and imported
import Loader from "../../../components/ui/Loader";
import ErrorState from "../../../components/ui/ErrorState";

export default function PostDetail() {
  const [postdata, setPostdata] = useState(null); // State for a single post
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams(); // Get the post ID from the route parameters


 



  const Datacall = async () => {
    try {
      const data = await fetchPostById (id); // Use fetchPostById to get the post by ID
      if (data) {
        setPostdata(data);
      } else {
        setError("No post found.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching the post.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Datacall();
  }, [id]); // Dependency array to ensure fetchData is called when id changes

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState errorMessage={error} />;
  }

  if (!postdata) {
    return <p>No post found!</p>; // Display when no post is available
  }

  return (
    <div>
     
    </div>
  );
}
