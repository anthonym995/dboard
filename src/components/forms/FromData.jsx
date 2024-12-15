import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { createUser as createUserAPI } from "../../api/users";
import InputField from '../forms/InputField';
import SelectField from "../forms/SelectField";

export default function FromData() {
  const [list, setList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // setError(null);
    try {
      const user = await createUserAPI(data);
      setList((prevList) => [...prevList, user]);
      reset(); // Clear form inputs
    } catch (error) {
      //   setError(error.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            < InputField
              label="Name"
              id="name"
              register={register}
              validation={{ required: "Name is required" }}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              label="Email"
              id="email"
              register={register}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              }}
              errors={errors}
            />
          </div>
          <div>
            <InputField
              label="Phone"
              id="phone"
              register={register}
              validation={{
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be 10 digits",
                },
              }}
              errors={errors}
            />
          </div>
          <div>
            < InputField
              label="Address"
              id="address"
              register={register}
              validation={{ required: "Address is required" }}
              errors={errors}
            />
          </div>
          <div>
            <SelectField
              label="Role"
              id="role"
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
              register={register}
              validation={{ required: "Role is required" }}
              errors={errors}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 text-white rounded-md ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  )
}
