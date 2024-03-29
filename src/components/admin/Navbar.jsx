import React from "react";

function Navbar() {
  return (
    <div className="flex pt-2 justify-between items-center mx-4">
      <img
        src="https://res.cloudinary.com/dyfhbqtjm/image/upload/f_auto,q_auto/nvpkmaabzlvihppq7d0o"
        className="w-16 h-16"
      />
      <h1 className="text-center text-4xl mt-5 text-white font-bold">
        Admin Panel
      </h1>
      <button className="bg-red-500 h-9 px-2 text-white font-semibold rounded-lg ">
        Logout
      </button>
    </div>
  );
}

export default Navbar;