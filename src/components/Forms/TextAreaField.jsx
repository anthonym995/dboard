export default function TextAreaFormField(props) {
  const {
    label,
    placeholder,
    register,
    name,
    error,
    disabled,
    hideLabel = false,
    minH = 200,
    required = false,
  } = props;

  return (
    <div>
      {!hideLabel && (
        <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
          {required && <span className="text-red-500">*</span>}
          {label}
        </label>
      )}

      <div className="mt-2">
        <textarea
          {...register(name)}
          id={name}
          className={`
            block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 
            ${error ? "focus:outline-red-500" : "focus:outline-indigo-600"} 
            placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 sm:text-sm/6
            ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          `}
          style={{ minHeight: `${minH}px` }}
          placeholder={placeholder}
          disabled={disabled}
        ></textarea>
        {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
      </div>
    </div>
  );
}
