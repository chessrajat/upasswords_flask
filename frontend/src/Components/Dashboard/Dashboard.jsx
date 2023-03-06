import { faGear, faLock, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useListCredsQuery } from "../../API/PasswordsApi";
import useOnClickOutside from "../../Utils/OnClickOutsideHook";
import DashboardNav from "./DashboardNav";
import GeneratedPasswordModal from "./GeneratedPasswordModal";
import NewPasswordModal from "./NewPasswordModal";
import PasswordCard from "./PasswordCard";

const Dashboard = () => {
  const [showAddPasswordModal, setShowAddPasswordModal] = useState(false);
  const [showGeneratedPasswordModal, setShowGeneratedPasswordModal] =
    useState(false);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredPasswords, setFilteredPasswords] = useState([]);

  const {
    data: passwordsList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useListCredsQuery();

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
    let updatedList = [...passwordsList];
    updatedList = updatedList.filter((item) => {
      return (
        item.domain.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
      );
    });
    setFilteredPasswords(updatedList);
  };

  useEffect(() => {
    setFilteredPasswords(passwordsList);
  }, [isSuccess, passwordsList]);

  return (
    <div>
      <DashboardNav />

      <div className="max-w-7xl mx-auto">
        <div className="p-3 flex justify-between">
          <h1 className="text-4xl font-semibold">Dashboard</h1>
          <div className="flex items-center">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearch}
              placeholder="Search"
              className="p-2 bg-transparent border-4 border-black rounded-tl-md rounded-bl-md focus:outline-none"
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="text-white bg-black p-4 cursor-pointer rounded-tr-md rounded-br-md"
            />
          </div>
        </div>
        <div className="p-4">
          <div className="mt-5 flex justify-center items-center">
            <div
              onClick={() => setShowAddPasswordModal(true)}
              className="cursor-pointer relative overflow-hidden border mx-5 bg-gray-200 w-80 h-64 
                              rounded-3xl p-10 flex flex-col justify-between items-start"
            >
              <FontAwesomeIcon
                icon={faLock}
                className="bg-gray-800 text-white text-xl p-3 rounded-xl"
              />

              <p className="text-xl font-medium z-10">Add a new password</p>
              <FontAwesomeIcon
                icon={faLock}
                className="absolute text-white text-9xl -bottom-8 -right-5"
              />
            </div>

            <div
              onClick={() => setShowGeneratedPasswordModal(true)}
              className="relative overflow-hidden border-2 mx-5 cursor-pointer w-80 h-64 
                          rounded-3xl p-10 flex flex-col justify-between items-start"
            >
              <FontAwesomeIcon
                icon={faGear}
                className="bg-gray-800 text-white text-xl p-3 rounded-xl"
              />

              <p className="text-xl font-medium z-10">Generate Password</p>
              <FontAwesomeIcon
                icon={faGear}
                className="absolute text-gray-300 text-9xl -bottom-8 -right-5"
              />
            </div>
          </div>
          <div className="h-12"></div>
          <div className="p-4">
            <div className="flex">
              <p className="text-2xl font-medium">Your Passwords</p>
              <div className="flex-grow border-t border-gray-300 m-5"></div>
            </div>
            <div className="px-3 my-3">
              {isLoading
                ? "Loading ..."
                : filteredPasswords &&
                  filteredPasswords.map((passwordinfo, i) => (
                    <PasswordCard
                      key={i}
                      domain={passwordinfo.domain}
                      username={passwordinfo.username}
                    />
                  ))}
            </div>
          </div>
          {/* <div className="flex justify-center mt-10">
            <button className="p-2 bg-black text-white rounded-md w-96">
              View More
            </button>
          </div> */}
          <div className="h-12"></div>
        </div>
      </div>
      {showAddPasswordModal && (
        <NewPasswordModal showModal={setShowAddPasswordModal} />
      )}
      {showGeneratedPasswordModal && (
        <GeneratedPasswordModal showModal={setShowGeneratedPasswordModal} />
      )}
    </div>
  );
};

export default Dashboard;
