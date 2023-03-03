import React, { useEffect } from "react";
import { Link, Navigate, redirect } from "react-router-dom";

const Home = () => {
  
  return (
    <div
      className="relative flex items-center 
    justify-center h-screen overflow-hidden"
    >
      <video
        src="/assets/bg_video.mp4"
        autoplay="{true}"
        loop
        muted
        className="absolute w-auto 
        min-w-full min-h-full max-w-none"
      />
      <div className="z-10 flex justify-center flex-col items-center max-w-4xl">
        <img
          src="/assets/upasswords-logo.png"
          alt="Logo"
          className="w-60 mb-10"
        />
        <p className="text-white text-5xl font-bold text-center m-20 leading-relaxed">
          The only Password Manager you will ever need.
        </p>
        <Link
          to="/login"
          className="bg-white align-middle p-3 text-black font-bold border-2
         hover:bg-black hover:text-white"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
