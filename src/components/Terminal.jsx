/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

function Terminal({UserData}) {
  const [inputValue, setInputValue] = useState("");
  const [inputElements, setInputElements] = useState([]);
  const {user } = useAuth0();
  const [userData, setUserData] = useState([""]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const filesAndFolders = ["about.md", "projects.md", "contact.md"];

  useEffect(() => {

    axios
    .post("https://localhost:3000/", {
      action: "getUser",
      email: user.email,
    })
    .then((res) => {
      console.log(res);
      setUserData(res.data);
      console.log(res.data);
    });


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

  const handleCommand = (command, arg) => {
    switch (command.toLowerCase()) {
      case "clear":
        setInputElements([]);
        return "";
      case "help":
        return `
          clear - Clears the terminal screen.
          exit - Exits the terminal.
          banner - Displays an ASCII art banner.
          echo [text] - Prints the provided text.
          hint - Provides a hint.
          answer - Displays the answer.
          ls - Lists files and folders.
          cat [filename] - Displays the content of the specified file.
          cd - Change directory (not implemented).
          pwd - Prints the current working directory.
          whoami - Prints the current user.
          uname - Prints system information.
          date - Prints the current date.
          time - Prints the current time.
          ping - Pings the terminal (PONG response).
          mkdir [dirname] - Creates a new directory.
          rm [filename] - Removes a file.
          rmdir [dirname] - Removes a directory.
          mv [source] [destination] - Moves a file or directory.
          cp [source] [destination] - Copies a file or directory.
          touch [filename] - Creates a new file.
          find - Lists all files and folders.
          grep - Searches for a pattern in files (not implemented).
          chmod - Changes file permissions (not implemented).
          chown - Changes file owner (not implemented).
          chgrp - Changes file group (not implemented).
          ps - Lists active processes.
          kill [pid] - Terminates a process.
          top - Displays real-time system status (not implemented).
          df - Displays disk space usage.
          du - Displays disk usage.
          free - Displays free memory.
          cmatrix - Displays Matrix digital rain effect.
          `;

      case "exit":
        return "";
      case "banner":
        return "ASCII art banner";
      case "echo":
        return arg || "echo: missing argument";
      case "hint":
        return arg ? "This is a hint." : "hint: missing argument";
      case "answer":
        return "This is the answer.";
      case "ls":
        return filesAndFolders.join(" ");
      case "cat":
        switch (arg) {
          case "about.md":
            return "Content of about.md";
          case "projects.md":
            return "Content of projects.md";
          case "contact.md":
            return "Content of contact.md";
          default:
            return `cat: ${arg}: No such file or directory`;
        }
      case "cd":
        return "cd: command not found";
      case "pwd":
        return "/home/neeraj";
      case "whoami":
        return "neeraj";
      case "uname":
        return "Linux localhost 5.4.0-80-generic #90-Ubuntu SMP Fri Jul 9 22:49:44 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux";
      case "date":
        return new Date().toLocaleString();
      case "time":
        return new Date().toLocaleTimeString();
      case "ping":
        return "PONG";
      case "mkdir":
        filesAndFolders.push(arg);
        return "";
      case "rm":
        if (!arg) return "rm: missing operand";
        if (filesAndFolders.includes(arg)) {
          filesAndFolders.splice(filesAndFolders.indexOf(arg), 1);
          return "";
        } else {
          return `rm: cannot remove '${arg}': No such file or directory`;
        }
      case "rmdir":
        if (!arg) return "rmdir: missing operand";
        if (filesAndFolders.includes(arg)) {
          filesAndFolders.splice(filesAndFolders.indexOf(arg), 1);
          return "";
        } else {
          return `rmdir: failed to remove '${arg}': No such file or directory`;
        }
      case "mv":
        if (!arg) return "mv: missing operand";
        const [source, destination] = arg.split(" ");
        if (filesAndFolders.includes(source)) {
          filesAndFolders[filesAndFolders.indexOf(source)] = destination;
          return "";
        } else {
          return `mv: cannot stat '${source}': No such file or directory`;
        }
      case "cp":
        if (!arg) return "cp: missing operand";
        const [source1, destination1] = arg.split(" ");
        if (filesAndFolders.includes(source1)) {
          filesAndFolders.push(destination1);
          return "";
        } else {
          return `cp: cannot stat '${source1}': No such file or directory`;
        }
      case "touch":
        filesAndFolders.push(arg);
        return "";
      case "find":
        return filesAndFolders.join(" ");
      case "grep":
      case "chmod":
      case "chown":
      case "chgrp":
      case "ps":
      case "kill":
      case "top":
        return `${command}: command not found`;
      case "df":
        return "Filesystem     1K-blocks     Used Available Use% Mounted on";
      case "du":
        return "du: missing operand";
      case "free":
        return "total        used        free      shared  buff/cache   available";
      case "question":
        console.log(UserData)
        let question =''
        axios
          .post(`http://localhost:3000/`, {
            action: "getQt",
            level: UserData.level
          })
          .then((res) => {
            const data = res.data;
            console.log(data);
          question = data.question
            return data;
          });
        return question
      default:
        return `${command}: command not found </br>Type 'help' to see available commands.`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const arguement = inputValue.split(" ");
      const command = arguement[0];
      const arg = arguement.slice(1).join(" ");
      setInputValue("");

      const output = handleCommand(command, arg);
      if (arguement[0] !== "clear") {
        const newInput = (
          <div key={inputElements.length}>
            <span className="font-mono pr-2">neeraj@tj#:</span>
            <span className="font-mono">{inputValue}</span>
            <pre
              className="font-mono pl-2 text-sm"
              key={inputElements.length + 1}
              dangerouslySetInnerHTML={{
                __html: output,
              }}
            ></pre>
          </div>
        );

        setInputElements((prevInputElements) => [
          ...prevInputElements,
          newInput,
        ]);
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
        <div className="text-sm">
          Type 'help' to see available commands.
          <br /> Cryptic Hunt is a cryptic treasure hunt event organized by xyz.
        </div>
      </div>
      {inputElements}
      <div className="flex items-center gap-2">
        <div className="font-mono text-[#8aff80]">neeraj@tj#:</div>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          autoFocus={true}
          className="bg-transparent terminal font-mono focus:none w-full outline-none text-[#8aff80]"
        />
      </div>
    </div>
  );
}

export default Terminal;
