import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function HomeCard() {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="flex justify-around  text-gray-300 font-russo items-center w-screen">
      <div className="glass p-10 max-w-96  bg-white justify-center">
        <h1 className="text-4xl mb-5 text-center  font-bold">CRYPTIC HUNT</h1>
        <p className="text-white  text-md ">
          Welcome to the Cryptic hunt! Glad You are here. As u are aware,
          cryptic hunt event is an online treasure hunt being conducted under
          the Metacognition '22 by Team Enthiran ! Before beginning, please go
          through the below mentioned rules and Guidelines! We wish you luck!
          Get Rules & Guidelines : click here
        </p>
      </div>
      <div className="glass flex flex-col gap-5 items-center p-10 justify-center">
        <h1 className="text-4xl font-bold">Log in to Continue</h1>
        <button
          onClick={() => {
            loginWithRedirect();  
          }}
          className="px-2 py-1 text-black rounded-lg bg-white"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default HomeCard;
