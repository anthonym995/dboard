import React from "react";

export default function Loader() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
    </div>
  );
}
