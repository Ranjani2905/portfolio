import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/tasks"); // Navigate to the tasks page
  };

  return (
    <span
      onClick={handleGoBack}
      className="absolute mt-10 left-6 p-2 bg-purple-500 text-white rounded-full cursor-pointer z-10"
    >
      <FaArrowLeft size={24} /> {/* Back icon */}
    </span>
  );
};

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("");

  const handleClick = (value: string) => {
    if (value === "AC") {
      setDisplay("");
    } else if (value === "DE") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString()); // Use eval carefully
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  return (
    <>
      <BackButton /> {/* Use BackButton component here */}
      <div className="flex justify-center items-center h-screen bg-purple-300">
        <div className="bg-purple-200 p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <input
              type="text"
              value={display}
              readOnly
              className="w-full text-right text-4xl p-3 rounded-lg border-none bg-white text-black shadow-inner"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {["AC", "DE", ".", "/"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className="w-16 h-16 bg-purple-500 text-white text-xl font-bold rounded-lg shadow-md hover:shadow-lg active:shadow-sm"
              >
                {btn}
              </button>
            ))}
            {["7", "8", "9", "*"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className="w-16 h-16 bg-purple-500 text-white text-xl font-bold rounded-lg shadow-md hover:shadow-lg active:shadow-sm"
              >
                {btn}
              </button>
            ))}
            {["4", "5", "6", "-"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className="w-16 h-16 bg-purple-500 text-white text-xl font-bold rounded-lg shadow-md hover:shadow-lg active:shadow-sm"
              >
                {btn}
              </button>
            ))}
            {["1", "2", "3", "+"].map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className="w-16 h-16 bg-purple-500 text-white text-xl font-bold rounded-lg shadow-md hover:shadow-lg active:shadow-sm"
              >
                {btn}
              </button>
            ))}
            {["00", "0", "="].map((btn) => (
              <button
                key={btn}
                onClick={() => handleClick(btn)}
                className={`w-16 h-16 bg-purple-500 text-white text-xl font-bold rounded-lg shadow-md hover:shadow-lg active:shadow-sm ${
                  btn === "=" ? "col-span-2 w-36" : ""
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
