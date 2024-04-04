import React, { useEffect, useState } from "react";
import Loader from "./Loader"
import axios from "axios";

function LeaderBoard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.post(`http://localhost:3000/`,{"action":"getUsers"})
      .then(res => {
        const data = res.data;
        if (data.status == 200) {
          setLoading(false);
        }
        setUsers(data.users);
      })
  }, [])
  
  return (
    <div className="flex scrollbar flex-col gap-2 bg-[#111416] h-4/5 items-center w-1/5 rounded-lg">
      <h1 className="text-center my-3 font-semibold text-2xl text-white">Leaderboard</h1>
      {!loading?<div className="flex flex-col gap-3 overflow-y-scroll w-full h-5/6 rounded-lg items-center ">
        {users.map((user)=>{
        return <div key={user._id} className="flex items-center bg-slate-600 w-[96%] py-2 rounded-2xl">
          <img
            className="w-7 h-7 ml-2 mr-3"
            src="https://res.cloudinary.com/dyfhbqtjm/image/upload/f_auto,q_auto/nvpkmaabzlvihppq7d0o"
            alt=""
          />
          <div className="flex w-full justify-between items-center">
            <div className="text-white font-semibold">{user.name}</div>
            <div className="rounded-full aspect-square w-8 text-sm flex justify-center items-center bg-white mx-2">
              <p>{user.points}</p>
            </div>
          </div>
        </div>})}
      </div>:<Loader />}
    </div>
  );
}

export default LeaderBoard;