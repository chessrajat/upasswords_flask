import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faKey,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation, useSignupMutation } from "../../API/apiSlice";
import { useState } from "react";
import { setCredentials } from "./AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, loginStates] = useLoginMutation();
  const [signup] = useSignupMutation();

  const handleLogin = async () => {
    const creds = { email: email, password: password };
    try {
      const res = await login(creds).unwrap();
      const token = res.token;
      dispatch(setCredentials(token));
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
              icon={faEnvelope}
              className="bg-black text-white p-4"
            />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="p-2 border-2 border-black w-full focus:outline-0"
            />
          </div>
          <div className="flex">
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
          <button
            onClick={() => handleLogin()}
            className="bg-black text-white font-bold w-full p-2 mt-8 mb-1"
          >
            {loginStates.isLoading && (
              <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
            )}
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
  }
};

export default Login;
