import React, { useState, useEffect } from "react";

function User() {
  const initialUsers = [
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

  useEffect(() => {
    setUsers(initialUsers);
  }, []);

  const search = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredUsers = initialUsers.filter((u) => {
      const nameMatches = u.name.toLowerCase().includes(searchValue);
      const emailMatches = u.email.toLowerCase().includes(searchValue);
      const teamMatches = u.team.toLowerCase().includes(searchValue);
      const pointsMatches = u.points.toString().includes(searchValue);
      return nameMatches || emailMatches || teamMatches || pointsMatches;
    });
    setUsers(filteredUsers);
  };

  return (
    <div className="w-full scrollbar h-full rounded-xl  text-white bg-gray-700 m-3">
      <div className="flex items-center pt-6 justify-between">
        <h1 className="flex text-center text-xl font-semibold pl-7">
          Manage User
        </h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => search(e)}
          className="bg-gray-500 w-64 h-8 p-2 rounded-lg"
        />
        <button className="border h-min py-1 px-2 mr-6 bg-white text-black  rounded-md">
          Add New
        </button>
      </div>
      <div className="pt-6 px-7">
        <table className="w-full ">
          <thead>
            <tr className="border bg-gray-800 border-gray-600">
              <th className="px-4 py-2 text-center  border-gray-600 border">
                Name
              </th>
              <th className="px-4 py-2 text-center  border-gray-600 border">
                Email
              </th>
              <th className="px-4 py-2 text-center  border-gray-600 border">
                Team
              </th>
              <th className="px-4 py-2 text-center  border-gray-600 border">
                Points
              </th>
              <th className="px-4 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, index) => (
              <tr key={index} className="border  border-gray-600">
                <td className="px-4 py-2 border  border-gray-600">{u.name}</td>
                <td className="px-4 py-2 border  border-gray-600">{u.email}</td>
                <td className="px-4 py-2 border  border-gray-600">{u.team}</td>
                <td className="px-4 py-2 border  border-gray-600">
                  {u.points}
                </td>
                <td className="px-4 py-2 flex justify-center">
                  <button className="px-2 py-1 text-black bg-white rounded-md ">
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
