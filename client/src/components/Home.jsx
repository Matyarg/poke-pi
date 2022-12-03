import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getPokemons,
	filterCreated,
	filterType,
	orderByAttack,
	orderByName,
	resetPokemons,
} from "../actions";
import landingPoke from "../img/pokedex.png";
import Paginated from "./Paginated";
import { Link } from "react-router-dom";
import "./styles/Home.css";
import SearchBar from "./SearchBar";

function Home() {
	const dispatch = useDispatch();
	const pokemonsCopia = useSelector((state) => state.allPokemons);

	useEffect(() => {
		if (!pokemonsCopia.length) {
			dispatch(getPokemons());
		}
	}, [dispatch, pokemonsCopia.length]);

	function handleFilterCreated(e) {
		dispatch(filterCreated(e.target.value));
	}

	function handleFilterType(e) {
		dispatch(filterType(e.target.value));
	}

	function handleOrder(ev) {
		if (ev.target.value === "asc" || ev.target.value === "desc") {
			ev.preventDefault();
			dispatch(orderByName(ev.target.value));
		}

		if (ev.target.value === "strongest" || ev.target.value === "weakest") {
			ev.preventDefault();
			dispatch(orderByAttack(ev.target.value));
		}

		if (ev.target.value === "all") {
			ev.preventDefault();
			dispatch(resetPokemons());
		}
	}

	function handleRefresh() {
		dispatch(resetPokemons())
	}

	return (

		<div className="homeContainer">
			<div className="pokedexContainer">
				<Link to="/">
					<img src={landingPoke} alt="landingPoke" className="pokedex" />
				</Link>
				<h1>HENRYDEX</h1><h1 className="lime">-APP</h1>
				<Link to="/createpokemon">
					<button className="pokeBotton">Add Pokemon</button>
				</Link>
				<SearchBar></SearchBar>
				<button onClick={(e) => handleRefresh(e)}>Clean Filters & Search</button>
			</div>

			<div className="filters">
				<select onChange={(e) => handleOrder(e)}>
					<option key={"all"} value="all">
						Choose an Order
					</option>
					<option key={"asc"} value="asc">
						A to Z
					</option>
					<option key={"desc"} value="desc">
						Z to A
					</option>
					<option key={"strongest"} value="strongest">
						Strongest
					</option>
					<option key={"weakest"} value="weakest">
						Weakest
					</option>
				</select>

				<select onChange={(e) => handleFilterType(e)}>
					<option key="" value="all">
						Filter by Type
					</option>
					<option key="shadow" value="shadow">
						Shadow
					</option>
					<option key="normal" value="normal">
						Normal
					</option>
					<option key="fighting" value="fighting">
						Fighting
					</option>
					<option key="flying" value="flying">
						Flying
					</option>
					<option key="ground" value="ground">
						Ground
					</option>
					<option key="steel" value="steel">
						Steel
					</option>
					<option key="grass" value="grass">
						Grass
					</option>
					<option key="ghost" value="ghost">
						Ghost
					</option>
					<option key="ice" value="ice">
						Ice
					</option>
					<option key="fairy" value="fairy">
						Fairy
					</option>
					<option key="dark" value="dark">
						Dark
					</option>
					<option key="psychic" value="psychic">
						Psychic
					</option>
					<option key="water" value="water">
						Water
					</option>
					<option key="rock" value="rock">
						Rock
					</option>
					<option key="bug" value="bug">
						Bug
					</option>
					<option key="poison" value="poison">
						Poison
					</option>
					<option key="fire" value="fire">
						Fire
					</option>
					<option key="dragon" value="dragon">
						Dragon
					</option>
					<option key="electric" value="electric">
						Electric
					</option>
					<option key="unknown" value="unknown">
						Unknown
					</option>
				</select>
				<select onChange={(e) => handleFilterCreated(e)}>
					<option key={"all"} value="all">
						Filter By Created
					</option>
					<option key={"created"} value="created">
						Created by User
					</option>
					<option key={"existing"} value="existing">
						By Default
					</option>
				</select>


			</div>
			<div className="pokeContainer">
				<Paginated></Paginated>
			</div>
		</div>

	);
}

export default Home;
