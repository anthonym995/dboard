import { useForm } from "react-hook-form";
import FormLayout from "../../../components/Forms/FormLayout";
import DrawerWrapper from "../../../components/Modal/DrawerWrapper";
import TextInputField from "../../../components/Forms/TextInputField";
import DropdownField from "../../../components/Forms/DropdownField";
import { createUser, updateUser } from "../../../api/users";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function UserForm({ user, isOpen, onCancel }) {
  const generateRandomImage = () => {
    const gender = Math.random() > 0.5 ? "men" : "women";
    const number = Math.floor(Math.random() * 100);
    return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
  };
  // default value
  const defaultValue = {
    name: "",
    email: "",
    phone: "",
    address: "",
    role: "user",
    image: generateRandomImage(),
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues: user || defaultValue });

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const handleFormSubmit = async (data) => {
    try {
      if (user) {
        await updateUser(data);
        toast.success("User updated successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        await createUser(data);
        toast.success("User created successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error("An error occurred while saving the user.");
    }
  };

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  return (
    <DrawerWrapper isOpen={isOpen} onClose={onCancel} title={user ? "Edit user" : "Add user"}>
      <FormLayout
        onSubmit={handleSubmit(handleFormSubmit)}
        onCancel={onCancel}
        cancelText="Cancel"
        submitText="Submit"
        isSubmitting={isSubmitting}
      >
        <TextInputField
          label="Name"
          name="name"
          placeholder="Enter your name"
          register={register}
          error={errors.name}
          required={true}
        />
        <TextInputField
          label="Email"
          name="email"
          placeholder="Enter your email"
          type="email"
          register={register}
          error={errors.email}
          required={true}
        />
        <TextInputField
          label="Phone"
          name="phone"
          placeholder="Enter your phone number"
          register={register}
          error={errors.phone}
          required={true}
        />
        <TextInputField
          label="Address"
          name="address"
          placeholder="Enter your address"
          register={register}
          error={errors.address}
          required={true}
        />
        <TextInputField
          label="Image"
          name="image"
          placeholder="Image url"
          register={register}
          error={errors.image}
          required={true}
        />
        <DropdownField
          label="Role of user"
          name="role"
          options={roles}
          control={control}
          error={errors.role}
          required={true}
        />
      </FormLayout>
    </DrawerWrapper>
  );
}
