import React from "react";
import { toast } from "react-toastify";
import { useDeleteCredsMutation } from "../../API/PasswordsApi";

const DeletePasswordModal = ({ showModal, domain, username }) => {
  const [deleteCreds, deleteCredsStates] = useDeleteCredsMutation();

  const handleDelete = async () => {
    const creds = {
      domain: domain,
      username: username,
    };
    try {
      const res = await deleteCreds(creds).unwrap();
      toast.success(res.message);
      showModal(false);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  return (
    <div className="absolute top-0 left-0 bg-slate-700 w-full h-full z-[100] bg-opacity-50">
      <div className="flex justify-center items-center h-full w-full">
        <div className="bg-white p-10 border-2 rounded-lg">
          <p className="text-2xl my-10 mx-5">Are you sure?</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => showModal(false)}
              className="border-2 border-gray-600 bg-gray-200 p-2 rounded-lg font-medium text-gray-600 w-full"
            >
              Close
            </button>
            <button
              onClick={handleDelete}
              className="border-2 border-red-400 bg-red-100 text-red-500 p-2 rounded-lg font-medium w-full"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePasswordModal;
