import { faEllipsisV, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { useState } from "react";
import useOnClickOutside from "../../Utils/OnClickOutsideHook";
import DeletePasswordModal from "./DeletePasswordModal";
import UpdatePasswordModal from "./UpdatePasswordModal";
import ViewPasswordModal from "./ViewPasswordModal";

const PasswordCard = ({ domain, username }) => {
  const [showViewPasswordModal, setShowViewPasswordModal] = useState(false);
  const [showUpdatePasswordModal, setUpdatePasswordModal] = useState(false);
  const [showDeletePasswordModal, setShowDeletePasswordModal] = useState(false);

  const [showUpdateMenu, setShowUpdateMenu] = useState(false);

  const ref = useRef();

  useOnClickOutside(ref, () => setShowUpdateMenu(false));

  return (
    <div className="flex justify-between items-center m-6">
      <div className="flex relative">
        <FontAwesomeIcon
          icon={faKey}
          className="border p-4 rounded-xl text-lg"
        />
        <div className="px-5">
          <p className="font-medium">{domain}</p>
          <p className="text-gray-600">{username}</p>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => setShowViewPasswordModal(true)}
          className="p-2 bg-black text-white mx-2 rounded-md"
        >
          View Password
        </button>
        <div ref={ref} className="relative">
          <FontAwesomeIcon
            onClick={() => setShowUpdateMenu(!showUpdateMenu)}
            icon={faEllipsisV}
            className="cursor-pointer p-2 text-lg"
          />

          <div
            className={`absolute divide-y-2 right-0 z-10 w-40 origin-top-right mt-2 shadow-lg border border-black bg-white ${
              !showUpdateMenu && "hidden"
            }`}
          >
            <button
              onClick={() => setUpdatePasswordModal(true)}
              className="block px-4 py-2 text-sm font-semibold w-full text-left hover:bg-gray-100"
              tabIndex="-1"
            >
              Update
            </button>
            <button
              onClick={() => setShowDeletePasswordModal(true)}
              className="block px-4 py-2 text-sm font-semibold w-full text-left hover:bg-gray-100"
              tabIndex="-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {showViewPasswordModal && (
        <ViewPasswordModal
          showModal={setShowViewPasswordModal}
          domain={domain}
          username={username}
        />
      )}
      {showUpdatePasswordModal && (
        <UpdatePasswordModal
          showModal={setUpdatePasswordModal}
          domain={domain}
          username={username}
        />
      )}
      {showDeletePasswordModal && (
        <DeletePasswordModal
          showModal={setShowDeletePasswordModal}
          domain={domain}
          username={username}
        />
      )}
    </div>
  );
};

export default PasswordCard;
