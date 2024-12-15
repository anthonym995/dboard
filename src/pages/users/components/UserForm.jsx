import { useForm } from "react-hook-form";
import FormLayout from "../../../components/Forms/FormLayout";
import DrawerWrapper from "../../../components/Modal/DrawerWrapper";
import TextInputField from "../../../components/Forms/TextInputField";
import DropdownField from "../../../components/Forms/DropdownField";
import { createUser, updateUser } from "../../../api/users";

export default function UserForm({ user, isOpen, onCancel }) {
  // default value
  const defaultValue = {
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    role: user?.role || "user",
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: defaultValue });

  const roles = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  const handleFormSubmit = async (data) => {
    try {
      if (user) {
        await createUser(`/users/${data.uuid}`, data);
      } else {
        await updateUser("/users", data);
      }
      alert("User saved successfully!");
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred while saving the user.");
    }
  };

  return (
    <DrawerWrapper isOpen={isOpen} onClose={onCancel}>
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
        <DropdownField label="Role" name="role" options={roles} control={control} error={errors.role} required={true} />
      </FormLayout>
    </DrawerWrapper>
  );
}
