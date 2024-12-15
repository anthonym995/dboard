import { Controller } from "react-hook-form";
import { classNames } from "./helper";

export default function SwitchFormField(props) {
  const { control, label, name, description, error, required = false } = props;

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="text-sm font-medium text-gray-900 leading-6">
          {required && <span className="text-red-500">*</span>}
          {label}
        </label>
        <Controller
          name={name}
          control={control}
          defaultValue={true}
          render={({ field: { onChange, value } }) => (
            <button
              type="button"
              aria-pressed={value}
              onClick={() => onChange(!value)}
              className={classNames(
                value ? "bg-green-500" : "bg-red-500",
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  value ? "translate-x-5" : "translate-x-0",
                  "inline-block h-5 w-5 transform bg-white rounded-full shadow transition ease-in-out duration-200"
                )}
              />
            </button>
          )}
        />
      </div>
      {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
