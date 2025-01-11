import React from "react";

export default function FormWrapper({ title, onSubmit, children }) {
  return (
    <div className="bg-gray-50 w-full flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          {title}
        </h2>
        {children}
      </form>
    </div>
  );
}
