import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getPokemonByName } from "../actions";
import "./styles/SearchBar.css"

function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleInput = (ev) => {
    setInput(ev.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(getPokemonByName(input));
    setInput("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Find your pokemon..."
        onChange={(e) => handleInput(e)}
        value={input}

      />
      <button
        type="submit"
        onClick={(e) => handleSubmit(e)}
       className="find"
      >
        Find Pokemon
      </button>
    </div>
  );
}

export default SearchBar;
