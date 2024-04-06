import React, { useEffect, useState } from "react";
import LeaderBoard from "./components/LeaderBoard";
import Terminal from "./components/Terminal";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
function Dashboard() {
  const [userData, setUserData] = useState({});
  const { user, logout } = useAuth0();

  const setUSERDATA = () => {
    axios
      .post("http://localhost:3001/", {
        action: "getUser",
        email: user.email,
      })
      .then((res) => {
        setUserData(res.data);
      });
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/", {
        action: "getUser",
        email: user.email,
      })
      .then((res) => {
        setUserData(res.data);
      });
  }, []);

  return (
    <div className="flex flex-col bg-gray-800 h-screen">
      <div className="flex items-center justify-between">
      <h2 className=" text-white text-xl">Welcome {userData.name}</h2>
  
      <h1 className=" text-white text-4xl ">Dashboard</h1>
      <button
        onClick={() =>
          logout({
            logoutParams: { returnTo: window.location.origin },
          })
        }
        className="bg-red-500 text-white p-1 rounded-lg"
      >
        Logout
      </button>
      </div>
     
      <div className="flex h-5/6 justify-around">
        {/*Terminal */}
        <Terminal UserData={userData} UpdateData = {setUSERDATA} />
        {/*Leaderboard */}
        <LeaderBoard />
      </div>
    </div>
  );
}

export default withAuthenticationRequired(Dashboard);
