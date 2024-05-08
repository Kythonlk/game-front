import React from "react";

const MultiplierButton = ({ value, onClick }) => {
  return (
    <button
      className={`text-xl text-black text-center bg-sky-100 rounded-xl p-3 ${onClick(value) ? "bg-red-500" : ""}`}
      onClick={() => onClick(value)}
    >
      {value}x
    </button>
  );
};

export default MultiplierButton;
