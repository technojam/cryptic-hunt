import React from "react";
import { useState } from "react";
function Terminal() {
  const [inputValue, setInputValue] = useState("def");
  const [inputElements, setInputElements] = useState([]);
  const [showTerminal, setShowTerminal] = useState(true);
  const inputWidth = `${inputValue.length * 9}px`;

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputValue.toLowerCase() === "help") {
        setShowTerminal(false);
        setInputElements((prevInputElements) => [
          ...prevInputElements,
          <input
            key={prevInputElements.length}
            style={{ width: inputWidth }}
            type="text"
            autoFocus={true}
            className="bg-transparent font-mono focus:none outline-none"
          />
        ]);
      }
    }
  };

  return (
    <div className="text-[#01c801] bg-[#111416] p-2 h-4/5 w-9/12 ml-3 rounded-lg">
        <h1>Type "help" for info</h1>
      <div className="flex gap-2">
        <div className="font-mono">neeraj@tj#:</div>
        <input
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          disabled={!showTerminal}
          style={{ width: inputWidth }}
          onKeyDown={handleKeyDown}
          type="text"
          autoFocus={true}
          className="bg-transparent terminal font-mono focus:none w-auto outline-none"
        />
        <p className="text-white font-bold font-mono blink">_</p>
      </div>
      <div className="text-[#01c801] mt-2" hidden={showTerminal}>
        <h1>Available Commands <br />answer <br />banner <br />echo <br />help <br />hint <br /></h1>
      </div>
      {inputElements}
    </div>
  );
}

export default Terminal;
