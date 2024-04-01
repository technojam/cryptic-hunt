import React from "react";
import { useState, useEffect } from "react";

function User() {
  const user = [
    {
      name: "Neeraj",
      email: "krishnaneeraj773@gmail.com",
      team: "Turbodev",
      points: 100,
    },
    {
      name: "Neeraj",
      email: "krishnaneeraj773@gmail.com",
      team: "Turbodev",
      points: 100,
    },
    {
      name: "hello",
      email: "krishnaneeraj773@gmail.com",
      team: "Turbodev",
      points: 100,
    },
  ];
  const [users, setUsers] = useState([]);
  const search = (e) => {
    user.filter((u) => {
      if (u.name || u.email || u.team || u.points === e.target.value) {
        setUsers(u);
      }
    });
  };

  useEffect(() => {
    setUsers(user);
  }, []);

  return (
    <div className="w-full scrollbar h-full rounded-xl  text-white bg-gray-700 m-3">
      <div className="flex items-center pt-6 justify-between">
        <h1 className="flex text-center text-xl font-semibold pl-7">
          Manage User
        </h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => {
            search(e);
          }}
          className="bg-gray-500 w-64 h-8 p-2 rounded-lg"
        />
        <button className="border h-min py-1 px-2 mr-3 bg-white text-black  rounded-md">
          Add New
        </button>
      </div>
      <div className="pt-6 px-7">
        <table className="w-full border">
          <thead>
            <tr className=" border-b border-r border-gray-200">
              <th className="px-4 py-2 text-center border-r">Name</th>
              <th className="px-4 py-2 text-center border-r">Email</th>
              <th className="px-4 py-2 text-center border-r">Team</th>
              <th className="px-4 py-2 text-center border-r">Points</th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={index} className="border-b  border-gray-200">
                <td className="px-4 py-2 border-r">{u.name}</td>
                <td className="px-4 py-2 border-r">{u.email}</td>
                <td className="px-4 py-2 border-r">{u.team}</td>
                <td className="px-4 py-2 border-r">{u.points}</td>
                <td className="px-4 py-2 flex justify-center">
                  <button className="px-2 py-1 text-black bg-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default User;
