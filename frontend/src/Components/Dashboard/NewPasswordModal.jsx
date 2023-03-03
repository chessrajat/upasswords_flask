import {
  faClose,
  faGlobe,
  faKey,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import useOnClickOutside from "../../Utils/OnClickOutsideHook";

const NewPasswordModal = ({ showModal }) => {
  const addPasswordRef = useRef();
  useOnClickOutside(addPasswordRef, () => showModal(false));
  return (
    <div className="absolute top-0 left-0 bg-slate-700 w-full h-full z-[100] bg-opacity-50">
      <div className="flex justify-center items-center h-full w-full">
        <div className="bg-white p-10 border-2 rounded-lg">
          <div className="flex mb-3">
            <FontAwesomeIcon
              icon={faGlobe}
              className="bg-black text-white p-4"
            />
            <input
              type="string"
              name="domain"
              placeholder="Domain (example.com)"
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <div className="flex mb-3">
            <FontAwesomeIcon
              icon={faUser}
              className="bg-black text-white p-4"
            />
            <input
              type="string"
              name="username"
              placeholder="Username"
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <div className="flex mb-3">
            <FontAwesomeIcon icon={faKey} className="bg-black text-white p-4" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <div className="flex mt-10">
            <button
              onClick={() => showModal(false)}
              className="border-2 border-black text-black p-2 rounded-lg w-12 mr-4"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
            <button className="bg-black text-white p-2 w-full rounded-lg">
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordModal;
