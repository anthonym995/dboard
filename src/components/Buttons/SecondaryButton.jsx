const SecondaryButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md px-2.5 py-1.5 text-sm bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 `}
    >
      {label}
    </button>
  );
};

export default SecondaryButton;
