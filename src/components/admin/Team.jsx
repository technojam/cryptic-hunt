import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function Team() {
  // State for teams
  const [initialTeam, setInitialTeam] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [team, setTeam] = useState(initialTeam);
  const [newTeam, setNewTeam] = useState("");

  const url = "http://localhost:3001";

  const HandleAddClick = () => {
    setShowPopup(true);
  };
  const handleAddTeam = () => {
    setShowPopup(false);
    axios
      .post(url, {
        action: "addTeam",
        name: newTeam,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const search = (e) => {
    const searchValue = e.target.value.toLowerCase();

    const filteredTeams = initialTeam.filter((team) => {
      const nameMatches = team.name.toLowerCase().includes(searchValue);
      const pointsMatches = team.points.toString().includes(searchValue);
      const memberMatches = team.members.some((member) =>
        member.name.toLowerCase().includes(searchValue)
      );
      return nameMatches || pointsMatches || memberMatches;
    });

    setTeam(filteredTeams);
  };

  useEffect(() => {
    axios
      .post(url, {
        action: "getTeams", // Removed 'body' key
      })
      .then((response) => {
        console.log(response.data);
        setInitialTeam(response.data.teams);
        setTeam(response.data.teams); // Move this line here
      });
  }, []); // Added empty dependency array to run only once when component mounts

  return (
    <>
      <div className="w-full scrollbar h-full rounded-xl  text-white bg-gray-700 m-3">
        <div className="flex items-center pt-6 justify-between">
          <h1 className="flex text-center text-xl font-semibold pl-7">
            Manage Teams
          </h1>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => search(e)}
            className="bg-gray-500 w-64 h-8 p-2 rounded-lg"
          />
          <button
            onClick={HandleAddClick}
            className="border h-min py-1  px-2 mr-6 bg-white text-black  rounded-md"
          >
            Add New
          </button>
        </div>
        <div className="pt-6 px-7">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-800">
                <th className="border px-4 py-2 border-gray-600">Name</th>
                <th className="border px-4 py-2 border-gray-600">Members</th>
                <th className="border px-4 py-2 border-gray-600">Points</th>
                <th className="border px-4 py-2 border-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {team.map((t) => (
                <tr key={t.name}>
                  <td className="border pl-2  border-gray-600">{t.name}</td>
                  <td className="border  border-gray-600">
                    {t.members.map((m, index) => (
                      <React.Fragment key={index}>
                        {m.role === "leader" && (
                          <div
                            className="pl-2 text-green-400 font-bold"
                            key={m}
                          >
                            {m.name}
                          </div>
                        )}
                        {m.role !== "Admin" && (
                          <div className="pl-2" key={m}>
                            {m.name}{" "}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </td>

                  <td className="border  border-gray-600 text-center">
                    {t.points}
                  </td>
                  <td className="border  border-gray-600">
                    <div className="h-full flex justify-center">
                      <button
                        onClick={() => {}}
                        className="bg-white text-black p-1 px-3 rounded-md"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h1 className="text-white text-lg font-semibold">Add New Team</h1>
            <input
              type="text"
              placeholder="Team Name"
              onChange={(e) => setNewTeam(e.target.value)}
              className="bg-gray-500 w-64 h-8 p-2 rounded-lg"
            />
            <button
              onClick={handleAddTeam}
              className="border h-min py-1 px-2 mr-6 bg-white text-black  rounded-md"
            >
              Add
            </button>
            <button
              onClick={() => setShowPopup(false)}
              className="border h-min py-1 px-2 bg-white text-black  rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Team;
