import React from "react";

const Image = ({ src, onClick, isSelected, position }) => {
  return (
    <button
      className={`absolute text-2xl text-black font-bold text-center ${position} ${
        isSelected ? "bg-red-500" : ""
      }`}
      onClick={onClick}
    >
      <img src={src} alt="wheel" className="w-[4rem] h-[4rem]" />
    </button>
  );
};

export default Image;
