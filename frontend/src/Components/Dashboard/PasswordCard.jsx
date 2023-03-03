import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PasswordCard = () => {
  return (
    <div className="flex justify-between items-center m-6">
      <div className="flex">
        <FontAwesomeIcon icon={faKey} className="border p-4 rounded-xl text-lg" />
        <div className="px-5">
          <p className="font-medium">Google.com</p>
          <p className="text-gray-600">chessrajat</p>
        </div>
      </div>
      <div className="divide-x-2">
        <button className="p-2 bg-black text-white mx-2 rounded-md">View Password</button>
        <button className="p-2 bg-black text-white mx-2 rounded-md">Update</button>
      </div>
    </div>
  );
};

export default PasswordCard;
