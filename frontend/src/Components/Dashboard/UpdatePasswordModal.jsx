import {
  faClose,
  faGlobe,
  faKey,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateCredsMutation } from "../../API/PasswordsApi";

const UpdatePasswordModal = ({ showModal, domain, username }) => {
  const [domainInput, setDomainInput] = useState(domain);
  const [usernameInput, setUsernameInput] = useState(username);
  const [password, setPassword] = useState("");

  const [updateCreds, updateCredsStates] = useUpdateCredsMutation()

  const handleUpdate = async () => {
    const creds = {
      domain: domainInput,
      username: usernameInput,
      password: password,
    };
    try {
      const res = await updateCreds(creds).unwrap();
      toast.success(res.message);
      showModal(false);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  }

  return (
    <div className="absolute top-0 left-0 bg-slate-700 w-full h-full z-[100] bg-opacity-50">
      <div className="flex justify-center items-center h-full w-full">
        <div className="bg-white p-10 border-2 rounded-lg">
          <div className="flex mb-3 opacity-60">
            <FontAwesomeIcon
              icon={faGlobe}
              className="bg-black text-white p-4"
            />
            <input
              type="string"
              name="domain"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder="Domain (example.com)"
              disabled
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <div className="flex mb-3 opacity-60">
            <FontAwesomeIcon
              icon={faUser}
              className="bg-black text-white p-4"
            />
            <input
              type="string"
              name="username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Username"
              disabled
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <div className="flex mb-3">
            <FontAwesomeIcon icon={faKey} className="bg-black text-white p-4" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <button onClick={handleUpdate} className="bg-black text-white p-2 w-full rounded-lg">
            {updateCredsStates.isLoading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="mr-2 animate-spin"
                />
              )}
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
