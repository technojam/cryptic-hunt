import React from "react";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

function AdminDash() {
  const [add, setAdd] = useState(false);
  const admins = [
    {
      name: "Admin1",
      email: "admin1@xyz.com",
    },
    {
      name: "Admin2",
      email: "admin2@xyz.com",
    },
    {
      name: "Admin3",
      email: "admin4@xyz.com",
    },
    {
      name: "Admin4",
      email: "admin4@xyz.com",
    },
  ];

  const handleAdd = () => {
    setAdd(!add);
  };

  return (
    <>
      <div className="w-full scrollbar h-full rounded-xl  text-white bg-gray-700 m-3">
        <div className="flex items-center justify-between">
          <h1 className="flex text-center text-xl font-semibold p-6">
            Admin Dashboard
          </h1>
          <button
            onClick={handleAdd}
            className="border h-min py-1 px-2 mr-3 bg-white text-black  rounded-md"
          >
            Add New
          </button>
        </div>
        {/* Admin List in a table  */}
        <div className="pt-6 px-7">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-800">
                <th className="border px-4 py-2 border-gray-600">Name</th>
                <th className="border px-4 py-2 border-gray-600">Email</th>

                <th className="border px-4 py-2 border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.name}>
                  <td className="border pl-2 px-4 py-2 border-gray-600">
                    {admin.name}
                  </td>
                  <td className="border px-4 py-2  border-gray-600">
                    {admin.email}
                  </td>
                  <td className="border px-4 py-2 border-gray-600">
                    <div className="h-full flex justify-center">
                      <button className="bg-white text-black p-1 px-4 rounded-md">
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Add Admin form */}
      </div>
      {add && (
        <div className="w-[50%] p-5 gap-4 left-[25%]  bg-gray-700 shadow-2xl flex flex-col justify-center items-center shadow-black rounded-lg  absolute">
          <div className="flex w-full justify-between">
            <p className="text-xl text-white">Add New Admin</p>
            <AiFillCloseCircle
              className="h-7 w-7 text-white cursor-pointer"
              onClick={handleAdd}
            />
          </div>
          
          <div className="flex flex-col w-full gap-4">
            <input
              type="text"
              placeholder="Name"
              className="bg-gray-800 text-white rounded-lg p-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-800 text-white rounded-lg p-2"
            />
          </div>
          <button className="bg-gray-200 w-52  text-black rounded-lg p-2">
            Add
          </button>
        </div>
      )}
    </>
  );
}

export default AdminDash;
