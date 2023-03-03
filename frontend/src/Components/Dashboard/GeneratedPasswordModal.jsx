import { faClose, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";

const GeneratedPasswordModal = ({ showModal }) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div className="absolute top-0 left-0 bg-slate-700 w-full h-full z-[100] bg-opacity-50">
      <div className="flex justify-center items-center h-full w-full">
        <div className="relative bg-white p-12 rounded-lg">
          <FontAwesomeIcon
            onClick={() => showModal(false)}
            icon={faClose}
            className="absolute right-2 top-1 p-1 cursor-pointer border rounded-full w-4"
          />
          <div
            onClick={() => {
              navigator.clipboard
                .writeText("This is my password it is very secure11")
                .then(() => {
                  setIsCopied(true);
                });
            }}
            className="flex border p-2 items-center cursor-pointer"
          >
            <p>This is my password it is very secure11</p>
            <FontAwesomeIcon
              icon={faCopy}
              className={`ml-5 p-2 ${isCopied && "text-green-600"}`}
            />
          </div>
          {isCopied ? (
            <p className="italic font-medium text-sm text-green-600 text-center">copied!</p>
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
