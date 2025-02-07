import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../../components/Forms/FormLayout";
import DrawerWrapper from "../../../components/Modal/DrawerWrapper";
import TextInputField from "../../../components/Forms/TextInputField";
import ContentText from "../../../components/Forms/ContentText";
import DropdownField from "../../../components/Forms/DropdownField";
import { createBlog, updateBlogs } from "../../../api/blogs"; // Import API functions
import { toast } from "react-toastify";

export default function FromBlogs({
  isOpen,
  onCancel,
  onSubmitSuccess,
  initialData,
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: initialData || {} });

  const statusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  useEffect(() => {
    if (initialData) {
      console.log("Populating form with:", initialData); // Debugging
      reset(initialData);
    }
  }, [initialData, reset]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        ...data,
        tags:
          typeof data.tags === "string"
            ? data.tags.split(",").map((tag) => tag.trim())
            : Array.isArray(data.tags)
            ? data.tags
            : [],
      };

      let response;
      if (initialData) {
        response = await updateBlogs(formattedData);
        toast.success("Blog  successfully update.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        response = await createBlog(formattedData);
        toast.success("Blog  successfully create.");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        navigate("/blogs");
      }

      console.log("Response from API:", response); // Debugging
      onSubmitSuccess(response);
      reset();
      onCancel();
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  return (
    <DrawerWrapper
      isOpen={isOpen}
      onClose={onCancel}
      title={initialData ? "Edit Blog" : "Add Blog"}
    >
      <FormLayout
        onSubmit={handleSubmit(onSubmit)}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
      >
        <TextInputField
          label="Title"
          name="title"
          placeholder="Enter Title"
          register={register}
          error={errors.title}
          required
        />
        <ContentText
          label="Content"
          name="content"
          placeholder="Write content"
          register={register}
          error={errors.content}
          required
        />
        <TextInputField
          label="Author"
          name="author"
          placeholder="Enter author's name"
          register={register}
          error={errors.author}
          required
        />
        <TextInputField
          label="Tags"
          name="tags"
          placeholder="Enter tags (comma-separated)"
          register={register}
          error={errors.tags}
          required
        />
        <DropdownField
          label="Status"
          name="status"
          options={statusOptions}
          control={control}
          error={errors.status}
          required
        />
      </FormLayout>
    </DrawerWrapper>
  );
}
