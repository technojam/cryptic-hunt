import React from "react";
import { useState } from "react";
import Navbar from "./components/admin/Navbar";
import Question from "./components/admin/Question";
import User from "./components/admin/User";
import Team from "./components/admin/Team";
import LeaderBoard from "./components/admin/LeaderBoard";
import AdminDash from "./components/admin/AdminDash";
import {withAuthenticationRequired} from "@auth0/auth0-react"
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
              Manage Teams
            </button>

            <button
              onClick={onAction("L")}
              className="bg-gray-800 text-white rounded-lg p-2"
            >
              Manage Leaderboard
            </button>
            <button
              onClick={onAction("A")}
              className="bg-gray-800 text-white rounded-lg p-2"
            >
              Admin
            </button>
          </div>
        </div>
        {Action === null && (
          <div className="flex flex-col w-full h-full rounded-xl justify-center items-center text-white bg-gray-700 m-3 p-6">
            <h1 className="text-2xl font-semibold">Welcome to Admin Panel</h1>
            <div>
              <p className="text-lg mt-4">
                Please select an action from the left
              </p>
            </div>
          </div>
        )}
        {Action === "Q" && <Question />}
        {Action === "U" && <User />}
        {Action === "T" && <Team />}
        {Action === "L" && <LeaderBoard />}
        {Action === "A" && <AdminDash />}
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Admin);
