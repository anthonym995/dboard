const DangerButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-2.5 py-1.5 text-sm bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 `}
    >
      {label}
    </button>
  );
};

export default DangerButton;
