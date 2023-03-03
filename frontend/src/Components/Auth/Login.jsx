import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div
      style={{ backgroundImage: "url('/assets/login_bg.jpg')" }}
      className="flex justify-center items-center min-h-screen bg-no-repeat bg-cover bg-center"
    >
      <div className="border rounded-md px-5 py-10 w-96 backdrop-blur-sm">
        <Link to="/">
          <img
            src="/assets/upasswords-logo.png"
            alt="Logo"
            className="w-60 mb-10 mx-auto"
          />
        </Link>

        <div className="flex mb-3">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="bg-black text-white p-4"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="p-2 border-2 border-black w-full focus:outline-0"
          />
        </div>
        <div className="flex">
          <FontAwesomeIcon icon={faKey} className="bg-black text-white p-4" />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 border-2 border-black w-full focus:outline-0"
          />
        </div>
        <button className="bg-black text-white font-bold w-full p-2 mt-8 mb-1">
          Login
        </button>
        <p>
          Don't have a account?{" "}
          <Link to="/register" className="font-bold underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;