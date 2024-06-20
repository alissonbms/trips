"use client";

import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <BeatLoader color="#590bd8" size={30} />;
    </div>
  );
};

export default Spinner;
