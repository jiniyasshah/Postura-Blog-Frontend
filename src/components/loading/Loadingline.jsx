// LoadingLine.js
import React from "react";

const Loadingline = ({ className }) => {
  return (
    <div
      className={`loadingLineAnimate h-[3px] absolute t-0 shadow-lg w-full right-[100%] ${className}`}
    ></div>
  );
};

export default Loadingline;
