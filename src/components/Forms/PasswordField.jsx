import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function PasswordField(props) {
  const { label, placeholder, register, name, error, disabled } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative">
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(name)}
          type={showPassword ? "text" : "password"}
          id={name}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 ${
            error ? "focus:outline-red-500" : "focus:outline-indigo-600"
          } placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6 ${
            disabled && "bg-gray-100 cursor-not-allowed"
          }`}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {error && (
          <p id={`${name}-error`} className="text-red-500 text-sm mt-1">
            {error.message}
          </p>
        )}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute top-9 right-3 flex items-center text-sm leading-5 text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
