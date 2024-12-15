const PrimaryButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 text-sm rounded-md bg-indigo-600 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
