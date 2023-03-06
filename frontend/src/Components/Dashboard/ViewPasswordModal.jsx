import { faClose, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useGetCredsQuery } from "../../API/PasswordsApi";

const ViewPasswordModal = ({ showModal, domain, username }) => {
  const [isCopied, setIsCopied] = useState(false);
  const {
    data: password,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCredsQuery({ domain, username });

  return (
    <div className="absolute top-0 left-0 bg-slate-700 w-full h-full z-[100] bg-opacity-50">
      <div className="flex justify-center items-center h-full w-full">
        <div className="relative bg-white p-12 rounded-lg">
          <FontAwesomeIcon
            onClick={() => showModal(false)}
            icon={faClose}
            className="absolute right-2 top-1 p-1 cursor-pointer border rounded-full w-4"
          />
          {isLoading ? (
            "Loading..."
          ) : password.length > 0 ? (
            <div
              onClick={() => {
                navigator.clipboard.writeText(password[0].password).then(() => {
                  setIsCopied(true);
                });
              }}
              className="flex border p-2 items-center cursor-pointer"
            >
              <p>{password[0].password}</p>
              <FontAwesomeIcon
                icon={faCopy}
                className={`ml-5 p-2 ${isCopied && "text-green-600"}`}
              />
            </div>
          ) : (
            toast.error("No password found")
          )}

          {isCopied ? (
            <p className="italic font-medium text-sm text-green-600 text-center">
              copied!
            </p>
          ) : (
            <p className="italic text-sm text-gray-400 text-center">
              Click to copy
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPasswordModal;
