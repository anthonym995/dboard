import React from "react";
import { useForm } from "react-hook-form";
import FormLayout from "../../../components/Forms/FormLayout";
import DrawerWrapper from "../../../components/Modal/DrawerWrapper";
import TextInputField from "../../../components/Forms/TextInputField";
import ContentText from "../../../components/Forms/ContentText";
import { updateBlogs } from "../../../api/blogs"; // Ensure this function is correctly defined
import DropdownField from "../../../components/Forms/DropdownField";

export default function FormBlogstwo({ isOpen, onCancel }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // Fixed status dropdown options
  const statusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  const onSubmit = async (data) => {
    try {
      // Convert tags to an array
      const formattedData = {
        ...data,
        tags: data.tags.split(",").map((tag) => tag.trim()),
      };

      const response = await updateBlogs(formattedData);
      console.log("Blog Created Successfully:", response);
      alert("Blog Created Successfully");
      reset(); // Clear form after submission

      if (typeof addcard === "function") {
        addcard(); // Call only if it's a function
      }

      onCancel(); // Close the modal
    } catch (error) {
      console.error("Error creating blog:", error);
      alert(`Error creating blog: ${error.message}`);
    }
  };

  return (
    <>
      <DrawerWrapper isOpen={isOpen} onClose={onCancel} title="Add Blog">
        <FormLayout
          onSubmit={handleSubmit(onSubmit)}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        >
          {/* Title Field */}
          <TextInputField
            label="Title"
            name="title"
            placeholder="Enter your Title"
            register={register}
            error={errors.title}
            required
          />

          {/* Content Field */}
          <ContentText
            label="Content"
            name="content"
            placeholder="Please write the content"
            register={register}
            error={errors.content}
            required
          />

          {/* Author Field */}
          <TextInputField
            label="Author"
            name="author"
            placeholder="Enter the author's name"
            register={register}
            error={errors.author}
            required
          />

          {/* Tags Field */}
          <TextInputField
            label="Tags"
            name="tags"
            placeholder="Enter tags (comma-separated)"
            register={register}
            error={errors.tags}
            required
          />

          {/* Status Dropdown Field (Fixed) */}
          <DropdownField
            label="Status"
            name="status"
            options={statusOptions}
            control={control} // Corrected react-hook-form integration
            error={errors.status} // Fixed error handling
            required={true}
          />
        </FormLayout>
      </DrawerWrapper>
    </>
  );
}
