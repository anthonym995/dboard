import React, { useEffect } from "react";
import FormLayout from "../../../components/Forms/FormLayout";
import DrawerWrapper from "../../../components/Modal/DrawerWrapper";
import { useForm } from "react-hook-form";
import TextInputField from "../../../components/Forms/TextInputField";
import TextAreaFieldMessage from "../../../components/Forms/TextAreaFieldMessage";
import DropdownField from "../../../components/Forms/DropdownField";
import { updateBlogs, CreateBlogs } from "../../../api/blogs";

export default function FormBlogs({ isOpen, onCancel, blog, addCard }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (blog) {
      reset({
        id: blog._id || "",
        title: blog.title || "",
        content: blog.content || "",
        status: blog.status || "draft",
        tags: blog.tags ? blog.tags.join(", ") : "",
        author: blog.author || "",
        categories: blog.categories || "",
        createdAt: blog.createdAt || new Date().toISOString(),
      });
    } else {
      reset({
        id: "",
        title: "",
        content: "",
        status: "draft",
        tags: "",
        author: "",
        categories: "",
        createdAt: new Date().toISOString(),
      });
    }
  }, [blog, reset]);

  const statusOptions = [
    { value: "published", label: "Published" },
    { value: "draft", label: "Draft" },
  ];

  const onSubmit = async (data) => {
    try {
      data.tags = data.tags
        ? data.tags.split(",").map((tag) => tag.trim())
        : [];
      if (data.id) {
        await updateBlogs(data);
        alert("Blog Updated Successfully");
      } else {
        const newBlog = await CreateBlogs(data);
        alert("Blog Created Successfully");
        addCard(newBlog);
      }
      onCancel();
    } catch (error) {
      console.error("Error processing blog:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <DrawerWrapper
      isOpen={isOpen}
      onClose={onCancel}
      title={blog ? "Edit Blog" : "Add Blog"}
    >
      <FormLayout onCancel={onCancel} onSubmit={handleSubmit(onSubmit)}>
        <TextInputField
          label="Title"
          name="title"
          placeholder="Enter your Title"
          register={register}
          error={errors.title}
          required
        />
        <TextAreaFieldMessage
          label="Content"
          name="content"
          placeholder="Write your thoughts here..."
          register={register}
          error={errors.content}
          required
        />
        <TextInputField
          label="Author"
          name="author"
          placeholder="Enter Author Name"
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
        <TextInputField
          label="Categories"
          name="categories"
          placeholder="Enter categories (comma-separated)"
          register={register}
          error={errors.categories}
          required
        />
        <TextInputField
          label="Created At"
          name="createdAt"
          placeholder="Enter created date"
          register={register}
          error={errors.createdAt}
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
