import React from "react";
import { useState } from "react";
import Navbar from "./components/admin/Navbar";
import Question from "./components/admin/Question";
import User from "./components/admin/User";
function Admin() {
  const [Action, setAction] = useState(null);

  const onAction = (action) => {
    return () => {
      setAction(action);
    };
  };
  return (
    <div className="flex flex-col h-screen bg-gray-800">
      <Navbar />
      <div className="flex h-[80%]">
        <div className="bg-gray-700 min-w-52 m-3 h-max rounded-xl  ">
          <h1 className="text-center text-white text-xl font-semibold p-6">
            Actions
          </h1>
          <div className="flex flex-col gap-3 p-4">
            <button
              onClick={onAction("Q")}
              className="bg-gray-800 text-white rounded-lg p-2"
            >
              Manage Question
            </button>
            <button
              onClick={onAction("U")}
              className="bg-gray-800 text-white rounded-lg p-2"
            >
              Manage User
            </button>
            <button className="bg-gray-800 text-white rounded-lg p-2">
              Manage Team
            </button>
            <button className="bg-gray-800 text-white rounded-lg p-2">
              Manage Leaderboard
            </button>
            <button className="bg-gray-800 text-white rounded-lg p-2">
              Admin
            </button>
          </div>
        </div>
        {Action === "Q" && <Question />}
        {Action === "U" && <User />}
      </div>
    </div>
  );
}

export default Admin;
