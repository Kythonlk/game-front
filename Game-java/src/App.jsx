import React, { useState, useEffect } from "react";
import img1 from "./assets/image1.png";
import img2 from "./assets/image2.png";
import img3 from "./assets/image3.png";
import img4 from "./assets/image4.png";
import img5 from "./assets/image5.png";
import img6 from "./assets/image6.png";
import img7 from "./assets/image7.png";
import img8 from "./assets/image8.png";
import Mul from "./mul.jsx";
import Wallet from "./wallet.jsx";

function App() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [countdown, setCountdown] = useState(5);
  const [totalWallet, setTotalWallet] = useState(1000);
  const [winningImages, setWinningImages] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isRunning && countdown > 0) {
        setCountdown(countdown - 1);
      } else if (countdown === 0) {
        const winningImagesCount = 6;
        const winningImages = [];
        const availableImages = [...selectedImages];
        for (let i = 0; i < winningImagesCount; i++) {
          if (availableImages.length === 0) {
            break;
          }
          const randomIndex = Math.floor(
            Math.random() * availableImages.length,
          );
          const winnerImage = availableImages[randomIndex];
          winningImages.push(winnerImage);
          availableImages.splice(randomIndex, 1);
        }
        setWinningImages(winningImages);
        setIsRunning(false);
        setCountdown(5);
        setSelectedImages([]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [isRunning, countdown, selectedImages]);

  const startGame = () => {
    const betAmount = multiplier * 1;
    if (selectedImages.length > 0 && totalWallet >= betAmount) {
      setIsRunning(true);
      setTotalWallet(totalWallet - betAmount);
    } else {
      console.log("Insufficient funds or no selected images.");
    }
  };
  useEffect(() => {
    if (!isRunning && selectedImages.length > 0) {
      setIsRunning(true); // Start the game automatically when images are selected
      setCountdown(5); // Reset the countdown
      setWinningImages([]); // Reset the winning images
    }
  }, [selectedImages]);

  const handleImageClick = (image) => {
    if (selectedImages.length < 6) {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleMultiplierClick = (value) => {
    setMultiplier(value);
  };

  useEffect(() => {
    if (!isRunning && selectedImages.length > 0) {
      startGame(); // Automatically start the game when images are selected
    }
  }, [selectedImages]);
  const isImageSelected = (image) => selectedImages.includes(image);
  return (
    <>
      <div className="Main">
        <div className="game-wheel flex justify-center relative">
          <Wallet balance={totalWallet} />
          <button
            className={`absolute top-[32%] left-[6%] text-2xl text-black font-bold text-center ${
              isImageSelected(img1) ? "bg-red-500" : ""
            }`}
            onClick={() => handleImageClick(img1)}
          >
            <img src={img1} alt="wheel" className="w-14 h-14" />
          </button>
          <button
            className={`absolute top-[19%] left-[16%] text-2xl text-black font-bold text-center ${
              isImageSelected(img2) ? "bg-red-500" : ""
            }`}
            onClick={() => handleImageClick(img2)}
          >
            <img src={img2} alt="wheel" className="w-14 h-14" />
          </button>
          <button
            className={`absolute top-[16%] left-30 text-2xl text-black font-bold text-center ${
              isImageSelected(img3) ? "bg-red-500" : ""
            }`}
            onClick={() => handleImageClick(img3)}
          >
            <img src={img3} alt="wheel" className="w-14 h-14" />
          </button>
          <button className="spin-button text-2xl text-black font-bold mb-44 text-center">
            {isRunning ? countdown : "Count"}
          </button>
          <button
            className={`absolute top-[19%] right-[16%] text-2xl text-black font-bold text-center ${
              isImageSelected(img4) ? "bg-red-500" : ""
            }`}
            onClick={() => handleImageClick(img4)}
          >
            <img src={img4} alt="wheel" className="w-14 h-14" />
          </button>
          <button
            className={`absolute top-[32%] right-[7%] text-2xl text-black font-bold text-center ${
              isImageSelected(img5) ? "bg-red-500" : ""
            }`}
            onClick={() => handleImageClick(img5)}
          >
            <img src={img5} alt="wheel" className="w-[3.5rem] h-[3.5rem]" />
          </button>
          <button
            className={`absolute top-[45%] right-[15%] text-2xl text-black font-bold text-center ${
              isImageSelected(img6) ? "bg-red-500" : ""
            }`}
            onClick={() => handleImageClick(img6)}
          >
            <img src={img6} alt="wheel" className="w-14 h-14" />
          </button>
          <button
            className={`absolute top-[49%] right-[43%] text-2xl text-black font-bold text-center ${
              isImageSelected(img7) ? "bg-red-500" : ""
            }`}
            onClick={() => handleImageClick(img7)}
          >
            <img src={img7} alt="wheel" className="w-14 h-14" />
          </button>
          <button
            className={`absolute top-[45%] left-[15%] text-2xl text-black font-bold text-center ${
              isImageSelected(img8) ? "bg-red-500" : ""
            }`}
            onClick={() => handleImageClick(img8)}
          >
            <img src={img8} alt="wheel" className="w-14 h-14" />
          </button>
          <div className="absolute top-[70%] text-xl text-black text-center flex gap-2">
            <Mul value={10} onClick={handleMultiplierClick} />
            <Mul value={50} onClick={handleMultiplierClick} />
            <Mul value={100} onClick={handleMultiplierClick} />
            <Mul value={1000} onClick={handleMultiplierClick} />
          </div>
          {winningImages.length > 0 && (
            <div className="absolute top-[88%] winning-images flex gap-4 justify-center items-center">
              {winningImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Winner ${index}`}
                  className="w-10 h-10"
                />
              ))}
              <p>Multiplier: {multiplier}x</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
