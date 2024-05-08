import React from "react";

const WalletBalance = ({ balance }) => {
  return (
    <div className="absolute top-0 right-20 bg-white px-4 py-2 text-black font-bold text-center">
      My balance = {balance}
    </div>
  );
};

export default WalletBalance;
