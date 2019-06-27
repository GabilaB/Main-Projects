import React from "react";
// import CardList from "./CardList";
// import SearchBox from "./SearchBox";
// import { robots } from "./robots";

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className="pa2">
      <input
        className="pa3 ba b--green bg-lightest-blue"
        type="Search"
        placeholder="Search bots"
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
