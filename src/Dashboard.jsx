import React from "react";
import LeaderBoard from "./components/LeaderBoard";
import Terminal from "./components/Terminal";
function Dashboard() {
  return (
    <div className="flex flex-col bg-gray-800 h-screen">
      <h1 className="text-center text-white text-4xl p-6">Dashboard</h1>
      <div className="flex h-screen justify-around">
        {/*Terminal */}
        <Terminal />
        {/*Leaderboard */}
        <LeaderBoard />
      </div>
    </div>
  );
}

export default Dashboard;
