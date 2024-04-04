import React, { useEffect, useState } from "react";
import LeaderBoard from "./components/LeaderBoard";
import Terminal from "./components/Terminal";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
function Dashboard() {
  const [userData, setUserData] = useState({});
  const { user, logout } = useAuth0();
  console.log(user);
  useEffect(() => {
    axios
      .post("http://localhost:3000/", {
        action: "getUser",
        email: user.email,
      })
      .then((res) => {
        console.log(res);
        setUserData(res.data);
        console.log(res.data);
      });
  }, []);

  return (
    <div className="flex flex-col bg-gray-800 h-screen">
      <h2 className="text-left text-white text-xl">Welcome {userData.name}</h2>
      <h2 className=" text-center text-white text-xl">You are at level {userData.level} </h2>
      <h1 className="text-center text-white text-4xl p-6">Dashboard</h1>
      <button
        onClick={() =>
          logout({
            logoutParams: { returnTo: window.location.origin },
          })
        }
        className="bg-red-500 text-white p-2 rounded-lg"
      >
        Logout
      </button>
      <div className="flex h-screen justify-around">
        {/*Terminal */}
        <Terminal />
        {/*Leaderboard */}
        <LeaderBoard />
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Dashboard);
