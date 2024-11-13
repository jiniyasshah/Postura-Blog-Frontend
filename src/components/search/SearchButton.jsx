import React from "react";

const SearchButton = () => {
  return (
    <div className="relative text-[#bfbfbf]">
      <input
        type="search"
        id="search"
        className="block w-full p-[0.8rem] ps-5 text-lg  outline-none  rounded-[5rem] bg-[#404040] border-0 placeholder-gray-400 text-white "
        placeholder="Search"
        required
        autoComplete="off"
      />
    </div>
  );
};

export default SearchButton;
