import React from "react";
import { useState } from "react";
function Terminal() {
  const [inputValue, setInputValue] = useState("");
  const inputWidth = `${inputValue.length * 9}px`;
  return (
    <div className="bg-[#111416] h-4/5 w-9/12 ml-3 rounded-lg">
      <div className="flex gap-2 p-2">
        <div className="text-[#01c801] font-mono">neeraj@tj#:</div>
        <input
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          style={{ width: inputWidth }}
          type="text"
          className="bg-transparent terminal font-mono text-white focus:none w-auto outline-none"
        />
        <p className="text-white font-bold font-mono blink">_</p>
      </div>
    </div>
  );
}

export default Terminal;
