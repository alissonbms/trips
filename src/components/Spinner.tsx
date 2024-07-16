"use client";

import React from "react";
import { BeatLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <BeatLoader color="rgb(30, 130, 76)" size={30} />;
    </div>
  );
};

export default Spinner;
