import React from "react";

const ContentText = ({
  id,
  label,
  register,
  name,
  placeholder,
  rows = 4,
  error,
  required = false, // Added required prop
}) => {
  return (
    <div className="mb-4">
      {/* Label with Required Asterisk */}

      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {required && <span className="text-red-500">*</span>}
        {label}
      </label>

      {/* Textarea */}
      <textarea
        id={id}
        {...register(name, { required })}
        rows={rows}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
      />

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default ContentText;
