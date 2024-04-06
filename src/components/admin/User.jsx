import React, { useState, useEffect } from "react";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [reqPayload, setReqPayload] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [team, setTeam] = useState([]);
  const url = "http://localhost:3001";

  const onAddClick = () => {
    setShowPopup(!showPopup);
  };

  const setReq = (e) => {
    setReqPayload({ ...reqPayload, [e.target.name]: e.target.value });
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setShowPopup(true);
  };

  const handleDeleteClick = (user) => {
    console.log(user);
     axios
       .post(url, {
         action: "deleteUser",
         id: user._id,
       })
       .then((response) => {
         console.log(response.data);
         setUsers(users.filter((u) => u._id !== user._id));
       });
  
  
  }
  useEffect(() => {
    axios.post(url, { action: "getUsers" }).then((response) => {
      console.log(response.data);
      setUsers(response.data.users);
    });
  }, []); // Added empty dependency array to run only once when component mounts

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

  const AddUser = () => {
    axios
      .post(url, {
        action: "addUser",
        ...reqPayload,
      })
      .then((response) => {
        console.log(response.data);
        setUsers([...users, response.data]);
        setShowPopup(false);
      });
  };
  return (
    <>
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
          <button
            onClick={onAddClick}
            className="border h-min py-1 px-2 mr-6 bg-white text-black  rounded-md"
          >
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
                  Points
                </th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index} className="border  border-gray-600">
                  <td className="px-4 py-2 border  border-gray-600">
                    {u.name}
                  </td>
                  <td className="px-4 py-2 border  border-gray-600">
                    {u.email}
                  </td>
                 
                  <td className="px-4 py-2 border  border-gray-600">
                    {u.points}
                  </td>
                  <td className="px-4 py-2 flex justify-center">
                    <button
                      onClick={() => handleDeleteClick(u)}
                      className="px-2 py-1 text-black bg-white rounded-md "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-700 p-6 rounded-lg">
            <h1 className="text-white text-2xl font-semibold">Add User</h1>
            <form className="flex  text-white flex-col gap-3 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={setReq}
                className="bg-gray-500 p-2 rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={setReq}
                className="bg-gray-500 p-2 rounded-lg"
              />
              <input
                type="number"
                name="points"
                onChange={setReq}
                placeholder="Points"
                className="bg-gray-500 p-2 rounded-lg"
              />
            </form>
            <button
              onClick={AddUser}
              className="bg-blue-500  text-white p-2 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => {
                setShowPopup(false);
              }}
              className="bg-blue-500  text-white p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default User;
