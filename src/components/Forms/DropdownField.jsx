import { Controller } from "react-hook-form";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function DropdownField(props) {
  const { control, label, name, options, defaultValue = 0, error, rules, required = false } = props;

  return (
    <div>
      <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
        {required && <span className="text-red-500">*</span>}
        {label}
      </label>
      <div className="mt-2 relative">
        <Controller
          name={name}
          control={control}
          defaultValue={options[defaultValue]?.value || ""}
          rules={rules}
          render={({ field }) => (
            <select
              {...field}
              id={name}
              className="block w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
        />
        <ChevronDownIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-2 right-2 h-5 w-5 text-gray-500 sm:h-4 sm:w-4"
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
