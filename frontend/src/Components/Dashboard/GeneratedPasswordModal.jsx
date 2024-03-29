import { faClose, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useGeneratePasswordQuery } from "../../API/apiSlice";

const GeneratedPasswordModal = ({ showModal }) => {
  const [isCopied, setIsCopied] = useState(false);

  const {
    data: generatedPassword,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGeneratePasswordQuery();

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
          ) : (
            <div
              onClick={() => {
                navigator.clipboard
                  .writeText(generatedPassword.password)
                  .then(() => {
                    setIsCopied(true);
                  });
              }}
              className="flex border p-2 items-center cursor-pointer"
            >
              <p>{generatedPassword.password}</p>
              <FontAwesomeIcon
                icon={faCopy}
                className={`ml-5 p-2 ${isCopied && "text-green-600"}`}
              />
            </div>
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

export default GeneratedPasswordModal;
