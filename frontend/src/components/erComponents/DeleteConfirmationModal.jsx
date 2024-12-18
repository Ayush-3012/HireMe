/* eslint-disable react/prop-types */

const ConfirmationModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center z-10 justify-center bg-black bg-opacity-80">
      <div className="bg-slate-900 text-yellow-400 p-6 rounded-lg shadow-md w-11/12 max-w-2xl">
        <h2 className="text-lg font-bold">Confirm Deletion</h2>
        <p className="mt-4">Are you sure you want to delete this job?</p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
