const SubtleButton = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`rounded-md bg-indigo-50 font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100  px-2.5 py-1.5 text-sm`}
    >
      {label}
    </button>
  );
};

export default SubtleButton;
