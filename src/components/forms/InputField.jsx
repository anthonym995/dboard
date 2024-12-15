import React from "react";

const InputField = ({ label, id, register, validation, errors }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...register(id, validation)}
        id={id}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
          errors[id] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id].message}</p>}
    </div>
  );
};

export default InputField;
