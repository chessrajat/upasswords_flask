import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useOnClickOutside from "../../Utils/OnClickOutsideHook";
import { logOut } from "../Auth/AuthSlice";

const DashboardNav = () => {
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useDispatch();

  const ref = useRef();
  useOnClickOutside(ref, () => setShowSettings(false));

  const handleLogout = () => {
    dispatch(logOut())
  }
  return (
    <div className="flex bg-white shadow-lg p-2 justify-between">
      <Link to="/dashboard">
        <img
          src="/assets/upasswords-logo.png"
          alt="logo"
          width={200}
          className=""
        />
      </Link>

      <div className="flex justify-center items-center px-4">
        <p className="w-28 truncate px-2 font-semibold">Rajat Tyagi</p>
        <div ref={ref} className="relative">
          <FontAwesomeIcon
            icon={faUser}
            className="border p-2 rounded-full border-black cursor-pointer"
            onClick={() => setShowSettings(!showSettings)}
          />
          <div
            className={`absolute right-0 z-10 w-40 origin-top-right py-1 mt-2 mr-1 shadow-lg border border-black bg-white ${
              !showSettings && "hidden"
            }`}
          >
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-sm font-semibold w-full text-left"
              tabIndex="-1"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNav;
