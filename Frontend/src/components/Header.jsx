import React, { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./SearchBar";

function Header({ status }) {
  const navigate = useNavigate();
  // const [searchQuery, setSearchQuery] = useState("");
  // console.log(searchQuery);
  return (
    <div className="h-32 fixed w-full bg-black flex justify-around shadow-violet-700 shadow-xl items-center text-white z-[9999]">
      <div
        className="p-3"
        onClick={() => {
          navigate("/");
        }}
      >
        <h1 className="m-4 text-4xl cursor-pointer font-poppins">
          Play<b className="text-violet-700">Now</b>
        </h1>
      </div>
      <div>
        <SearchBar />
      </div>
    </div>
  );
}

export default Header;
