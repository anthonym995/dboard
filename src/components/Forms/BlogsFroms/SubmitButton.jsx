import React from "react";

export default function SubmitButton({ label, loading }) {
  return (
    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      disabled={loading}
    >
      {loading ? "Submitting..." : label}
    </button>
  );
}
