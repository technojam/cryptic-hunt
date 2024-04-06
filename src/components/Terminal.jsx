/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
function Terminal({ UserData, UpdateData }) {
  const [inputValue, setInputValue] = useState("");
  const [inputElements, setInputElements] = useState([]);
  const { user } = useAuth0();
  const [userData, setUserData] = useState([""]);
  const [Question, setQuestion] = useState([""]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  useEffect(() => {
    setUserData(UserData);
    UpdateData();
    inputRef.current.focus();
    const banner = `
      ██████ ██████  ██    ██ ██████  ████████ ██  ██████     ██   ██ ██    ██ ███    ██ ████████ 
     ██      ██   ██  ██  ██  ██   ██    ██    ██ ██          ██   ██ ██    ██ ████   ██    ██    
     ██      ██████    ████   ██████     ██    ██ ██          ███████ ██    ██ ██ ██  ██    ██    
     ██      ██   ██    ██    ██         ██    ██ ██          ██   ██ ██    ██ ██  ██ ██    ██    
      ██████ ██   ██    ██    ██         ██    ██  ██████     ██   ██  ██████  ██   ████    ██    
                                                                                               `;

    const preBanner = (
      <div key={inputElements.length}>
        <pre
          style={{ fontSize: "10px" }}
          key={inputElements.length + 1}
          dangerouslySetInnerHTML={{
            __html: banner,
          }}
        ></pre>
        <div className="text-sm font-mono pl-6 pb-4">
          Type 'help' to see available commands. <br /> Cryptic Hunt is a
          cryptic treasure hunt event organized by xyz.
        </div>
      </div>
    );

    setInputElements([...inputElements, preBanner]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [inputElements]);

  const setHtml = (data) => {
    const newInput = (
      <div key={inputElements.length}>
        <span className="font-mono pr-2">{UserData.user.name}@tj#:</span>
        <span className="font-mono">{inputValue}</span>
        <pre
          className="font-mono pl-2 text-sm"
          key={inputElements.length + 1}
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        ></pre>
      </div>
    );
    setInputElements((prevInputElements) => [...prevInputElements, newInput]);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      const arguement = inputValue.split(" ");
      const command = arguement[0];
      const arg = arguement.slice(1).join(" ");
      setInputValue("");
      let value = "";
      if (command === "exit") return;
      if (command === "clear") {
        setInputElements([]);
      }
      if (command === "question") {
        let question = "";
        const user = await axios.post(`http://localhost:3001/`, {
          action: "getUser",
          email: UserData.email,
        });
        const level = user.data.user.level
        axios
          .post(`http://localhost:3001/`, {
            action: "getQt",
            level: level,
          })
          .then((response) => {
            console.log(response.data.questions);
            setQuestion(response.data.questions);
            setHtml(response.data.questions.question);
          });
        console.log(question);
        return;
      }
      if (command === "answer") {
        console.log(arg);
        if (!arg) {
          return setHtml(
            "Please type the answer in this format 'answer {your answer}'"
          );
        }
        if (!userData.user?.level) {
          return setHtml(
            "Please type 'question' to get the question <br> and then type 'answer' to check your answer"
          );
        }

        try {
          const Correct = await axios.post(`http://localhost:3001/`, {
            action: "checkAnswer",
            answer: arg,
            questionId: Question._id,
          });
          const correctstat = Correct.data.status;
          console.log(correctstat);
          if (correctstat) {
            console.log("correctstat");
            const user = await axios.post(`http://localhost:3001/`, {
              action: "getUser",
              email: UserData.email,
            });
            const llevel = user.data.user.level + 1;

            setHtml(
              "Correct Answer<br>Proceed to next level<br>type 'question' to get next question"
            );
            await axios.post(`http://localhost:3001/`, {
              action: "updateLevel",
              level: llevel,
              id: userData.user._id,
              points: userData.user.points + Question.points,
            });

            UpdateData();
          }
        } catch (error) {
          console.error("Error checking answer:", error);
          setHtml("Failed to check answer. Please try again.");
        }
      }
      if (command === "hint") {
        setHtml(Question.hint);
        return;
      }
      if (command === "score") {
        setHtml(`Your current score is ${userData.user.points}`);
        return;
      }
      if (command === "help") {
        value = `
          <div>
            <div>Available commands:</div>
            <div>question - Get the question</div>
            <div>answer - Check your answer</div>
            <div>hint - Get a hint</div>
            <div>score - Get your current score</div>
            <div>clear - Clear the terminal</div>
            <div>exit - Exit the terminal</div>
          </div>
        `;
        setHtml(value);
      }
    }
  };

  const handleMouseDown = () => {
    inputRef.current.focus();
  };

  return (
    <div
      onClick={handleMouseDown}
      className="terminal bg-black p-4 w-9/12 ml-3 rounded-lg overflow-y-auto max-h-[80vh]"
      ref={terminalRef}
      style={{ fontFamily: "monospace", color: "#8aff80" }}
    >
      <div className="mb-2">
        <pre style={{ fontSize: "16px" }}>{/* Your ASCII art banner */}</pre>
        <div className="text-sm text-gray-400">
          Type 'help' to see available commands.
          <br /> Cryptic Hunt is a cryptic treasure hunt event organized by xyz.
        </div>
      </div>
      {inputElements}
      <div className="flex items-center gap-2">
        <div className="font-mono text-[#8aff80]">{UserData.user.name}@tj#:</div>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          autoFocus={true}
          className="bg-transparent terminal font-mono focus:outline-none w-full text-[#8aff80]"
        />
      </div>
    </div>
  );
}

export default Terminal;
