import {
  faClose,
  faGlobe,
  faKey,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useSaveCredsMutation } from "../../API/PasswordsApi";
import useOnClickOutside from "../../Utils/OnClickOutsideHook";

const NewPasswordModal = ({ showModal }) => {
  const [domain, setDomain] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [saveCreds, saveCredsState] = useSaveCredsMutation();

  const handleAddCreds = async () => {
    const creds = {
      domain: domain,
      username: username,
      password: password,
    };
    try {
      const res = await saveCreds(creds).unwrap();
      toast.success(res.message);
      showModal(false);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

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
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
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
            <button
              onClick={handleAddCreds}
              className="bg-black text-white p-2 w-full rounded-lg"
            >
              {saveCredsState.isLoading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="mr-2 animate-spin"
                />
              )}
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPasswordModal;
