import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getPokemons, getTypes, postPokemon } from "../actions";
import "./styles/CreatePokemon.css"

function validate(input) {
  const errors = {};
  if (!input.name || input.name.length < 3) {
    errors.name = "Debe tener un nombre de mas de tres letras";
  }

  if (!input.hp || input.hp < 0 || input.hp > 150) {
    errors.hp = "Debe tener hp entre 1 - 150";
  }

  if (!input.attack || input.attack < 0 || input.attack > 150) {
    errors.attack = "Debe tener ataque entre 1 - 150";
  }

  if (!input.defense || input.defense < 0 || input.defense > 150) {
    errors.defense = "Debe tener defensa entre 1 - 150";
  }

  if (!input.speed || input.speed < 0 || input.speed > 150) {
    errors.speed = "Debe tener velocidad entre 1 - 150";
  }

  if (input.types.length === 0) {
    errors.types = "Debe tener por lo menos un tipo";
  }

  // if (input.image.find((/[^a-zA-Z0-9 ]/g, '') !== input.image.length)) {
  //   errors.image = "No se permiten caracteres especiales en los links"
  // }

  return errors;
}

function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.allTypes);

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    types: [],
  });

  let btnDisabled =
    !(
      input.name.length &&
      input.hp.length &&
      input.attack.length &&
      input.defense.length &&
      input.speed.length &&
      input.types.length
    ) ||
    input.hp > 150 ||
    input.attack > 150 ||
    input.defense > 150 ||
    input.speed > 150;

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    setErrors(
      validate({
        ...input,
      })
    );
  }, [input]);

  const handleChange = (ev) => {
    setInput({
      ...input,
      [ev.target.name]: ev.target.value,
    });

    setErrors(
      validate({
        ...input,
        [ev.target.name]: ev.target.value,
      })
    );
  };

  const handleSelect = (ev) => {
    if (!input.types.includes(ev.target.value)) {
      setInput({
        ...input,
        types: [...input.types, ev.target.value],
      });
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    dispatch(postPokemon(input));
    alert("Pokemon creado");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
      types: [],
      
    });
    history.push("/home");
    dispatch(getPokemons())
  };

  const handleDeleteType = (ev) => {
    setInput({
      ...input,
      types: input.types.filter((t) => t !== ev),
    });
  };

  return (
    <div>
      <div className="navBar">
        <Link to="/home">
          <button className="buttonHome">Return to home</button>
        </Link>
      </div>
      <div className="contGral">
        <div className="cardCreate">
          <div className="redTitle">
            <div className="title">Create your pokemon</div>
          </div>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <div >
                <div>
                  <div>Name:</div>
                  <input
                    type="text"
                    value={input.name}
                    name="name"
                    onChange={(e) => handleChange(e)}
                    placeholder="Name"
                    className="inputs"
                  />
                  {errors.name && (
                    <div className="error">{errors.name}</div>
                  )}
                </div>

                <div>
                  <div>Hp:</div>
                  <input
                    type="number"
                    value={input.hp}
                    name="hp"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className="inputs"
                  />
                  {errors.hp && <div className="error">{errors.hp}</div>}
                </div>

                <div>
                  <div>Attack:</div>
                  <input
                    type="number"
                    value={input.attack}
                    name="attack"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className="inputs"
                  />
                  {errors.attack && (
                    <div className="error">{errors.attack}</div>
                  )}
                </div>

                <div>
                  <div>Defense:</div>
                  <input
                    type="number"
                    value={input.defense}
                    name="defense"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className="inputs"
                  />
                  {errors.defense && (
                    <div className="error">{errors.defense}</div>
                  )}
                </div>

                <div>
                  <select
                    onChange={(e) => handleSelect(e)}
                    className="select"
                    disabled={input.types.length >= 2}
                    defaultValue="title"
                  >
                    <option value="title" disabled name="types">
                      Types
                    </option>
                    {types.map((t) => {
                      return (
                        <option
                          value={t.name}
                          key={t.name}
                          className="options"
                        >
                          {t.name[0].toUpperCase() + t.name.slice(1)}
                        </option>
                      );
                    })}
                  </select>

                  <ul className="types">
                    {input.types.map((t) => {
                      return (
                        <li key={t} className="types">
                          {t[0].toUpperCase() + t.slice(1)}
                          <button
                            onClick={() => handleDeleteType(t)}
                            className="deleteButton"
                          >
                            x
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                  {errors.types && (
                    <div className="error">{errors.types}</div>
                  )}
                </div>
              </div>

              <div className="der">
                <div>
                  <div>Speed:</div>
                  <input
                    type="number"
                    value={input.speed}
                    name="speed"
                    onChange={(e) => handleChange(e)}
                    placeholder="1 - 150"
                    className="inputs"
                  />
                  {errors.speed && (
                    <div className="error">{errors.speed}</div>
                  )}
                </div>

                <div>
                  <div>
                    Height <small>(cm)</small>:
                  </div>
                  <input
                    type="number"
                    value={input.height}
                    name="height"
                    onChange={(e) => handleChange(e)}
                    placeholder="Height"
                    className="inputs"
                  />
                </div>

                <div>
                  <div>
                    Weight <small>(kg)</small>:
                  </div>
                  <input
                    type="number"
                    value={input.weight}
                    name="weight"
                    onChange={(e) => handleChange(e)}
                    placeholder="Weight"
                    className="inputs"
                  />
                </div>

                <div>
                  <div>Image:</div>
                  <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    className="inputs"
                    placeholder="URL"
                    onkeypress={"return (event.charCode >= 48 && event.charCode <= 57)"}
                  />
                  {errors.image && (
                    <div className="error">{errors.image}</div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={btnDisabled}
                  className="button"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePokemon;