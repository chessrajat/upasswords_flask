import {
  faEnvelope,
  faKey,
  faSpinner,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation, useSignupMutation } from "../../API/apiSlice";
import { setCredentials } from "./AuthSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signup, signupStates] = useSignupMutation();
  const [login, loginStates] = useLoginMutation();

  const handleRegister = async () => {
    const creds = {
      name: name,
      email: email,
      password: password,
    };
    try {
      await signup(creds).unwrap();
      toast.success("Registered successfully");
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.token));
      navigate("/dashboard");
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };

  const token = useSelector((state) => state.auth.token);
  if (token) {
    return <Navigate to="/dashboard" />;
  } else {
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
              icon={faUser}
              className="bg-black text-white p-4"
            />
            <input
              type="string"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <div className="flex mb-3">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="bg-black text-white p-4"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <div className="flex">
            <FontAwesomeIcon icon={faKey} className="bg-black text-white p-4" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <button
            onClick={handleRegister}
            className="bg-black text-white font-bold w-full p-2 mt-8 mb-1"
          >
            {(loginStates.isLoading || signupStates.isLoading) && (
              <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
            )}
            Register
          </button>
          <p>
            Already have a account?{" "}
            <Link to="/login" className="font-bold underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    );
  }
};

export default SignUp;
