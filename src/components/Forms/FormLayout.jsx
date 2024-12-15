export default function FormLayout(props) {
  const { onCancel, onSubmit, cancelText = "Cancel", submitText = "Submit", children, isSubmitting = false } = props;
  return (
    <form className="" onSubmit={onSubmit}>
      {/* form content will comes here */}
      <div>{children}</div>

      {/* form button will comes here */}
      <div className="flex justify-end space-x-4 mt-6 border-t pt-4">
        <button
          type="button"
          className="rounded-md px-2.5 py-1.5 text-sm bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          onClick={onCancel}
        >
          {cancelText}
        </button>

        <button
          type="submit"
          className="px-2.5 py-1.5 text-sm rounded-md bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : submitText}
        </button>
      </div>
    </form>
  );
}
