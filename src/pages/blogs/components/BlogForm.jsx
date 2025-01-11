import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "../../../components/Forms/BlogsFroms/InputField";
import TextareaField from "../../../components/Forms/BlogsFroms/TextareaField";
import SelectField from "../../../components/Forms/BlogsFroms/SelectField";
import SubmitButton from "../../../components/Forms/BlogsFroms/SubmitButton";
import PostModal from "../../../components/Modal/PostModal";
import FormWrapper from "../../../components/Forms/BlogsFroms/FormWrapper";
import Loader from "../../../components/ui/Loader";
import { toast } from "react-toastify";
import { createBlogs, updateBlog } from "../../../api/blogs";

export default function BlogForm({
  isModalOpen,
  toggleModal,
  onSubmitSuccess,
  initialData = {},
}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: initialData,
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let response;
      if (initialData._id) {
        response = await updateBlog({ ...data, _id: initialData._id });
        toast.success("Blog updated successfully!");
      } else {
        response = await createBlogs(data);
        toast.success("Blog created successfully!");
      }
      reset();
      toggleModal();
      onSubmitSuccess(response);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to submit blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostModal isModalOpen={isModalOpen} toggleModal={toggleModal}>
      {loading ? (
        <Loader />
      ) : (
        <FormWrapper title={initialData._id ? "Edit Blog" : "Create Blog"} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            id="title"
            label="Title"
            placeholder="Enter title"
            register={register}
            validation={{ required: "Title is required" }}
            error={errors.title}
          />
          <TextareaField
            id="content"
            label="Content"
            placeholder="Enter content"
            register={register}
            validation={{ required: "Content is required" }}
            error={errors.content}
          />
          <InputField
            id="author"
            label="Author"
            placeholder="Author name"
            register={register}
            validation={{ required: "Author is required" }}
            error={errors.author}
          />
          <SelectField
            id="status"
            label="Status"
            register={register}
            validation={{ required: "Status is required" }}
            error={errors.status}
            options={[
              { value: "draft", label: "Draft" },
              { value: "published", label: "Published" },
            ]}
          />
          <SubmitButton label={initialData._id ? "Update Blog" : "Create Blog"} loading={loading} />
        </FormWrapper>
      )}
    </PostModal>
  );
}
