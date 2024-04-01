import React, { useEffect, useState } from "react";

function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState([]);

  const initialLeaderBoard = [
    {
      team: "Turbodev",
      points: 100,
    },
    {
      team: "Turbodev1",
      points: 50,
    },
    {
      team: "Turbodev2",
      points: 60,
    },
  ];

  const search = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredUsers = initialLeaderBoard.filter((u) => {
      const nameMatches = u.team.toLowerCase().includes(searchValue);
      const pointsMatches = u.points.toString().includes(searchValue);
      return nameMatches || pointsMatches;
    });
    setLeaderBoard(filteredUsers);
  };
  useEffect(() => {
    setLeaderBoard(initialLeaderBoard);
  }, []);

  return (
    <div className="w-full h-full rounded-xl text-white bg-gray-700 m-3 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Leaderboard</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => search(e)}
          className="bg-gray-500 w-64 h-8 p-2 rounded-lg"
        />
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-4 border border-gray-600">Position</th>
              <th className="py-2 px-4 border border-gray-600">Team</th>
              <th className="py-2 px-4 border border-gray-600">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map((l, i) => (
              <tr key={i} className="bg-gray-700 text-white">
                <td className="py-2 px-4 border border-gray-600">{i + 1}</td>
                <td className="py-2 px-4 border border-gray-600">{l.team}</td>
                <td className="py-2 px-4 border border-gray-600">{l.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaderBoard;
