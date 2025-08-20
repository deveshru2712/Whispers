import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-black dark:text-white">
        <TailChase size="40" speed="1.75" color="currentColor" />
      </div>
    </div>
  );
};

export default Loader;
