import React from "react";

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
      <div className="z-10">
        <img src="/assets/logo.png" alt="Logo" />
        <p className="text-white">
          The only Password Manager you will ever need.
        </p>
      </div>
    </div>
  );
};

export default Home;
