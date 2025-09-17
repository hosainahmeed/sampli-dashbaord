import React from "react";

const Loader = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center  h-full">
      <div className="flex space-x-2">
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></span>
      </div>
      <div>{message}</div>
    </div>
  );
};

export default Loader;
