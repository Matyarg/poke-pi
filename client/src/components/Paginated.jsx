import React, { useState } from "react";
import "./styles/Paginated.css";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../actions";

function Paginated() {
	const pageNumbers = [];
	const dispatch = useDispatch();
	const allPokemons = useSelector((state) => state.pokemons);
	const currentPage = useSelector((state) => state.currentPage);
	const [pokemonsPerPage] = useState(12);


	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = allPokemons.slice(
		indexOfFirstPokemon,
		indexOfLastPokemon
	);

	const paginado = (pg) => {
		dispatch(setCurrentPage(pg))
	};

	const pokes = currentPokemons.map((p) => {
		return (
			<Card
				className="pokeCard"
				name={p.name}
				image={p.image}
				types={p.types}
				key={p.id}
				id={p.id}
			/>
		);
	});

	//calculo cuantos pokes quiero mostrar por pagina
	for (let i = 1; i <= Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div>
			<nav>
				<ul className="navPaginated">
					{pageNumbers &&
						pageNumbers.map((number) => (
							<li key={number} className="items">
								<button className="buttonPaginated" onClick={() => paginado(number)}>{number}</button>
							</li>
						))}
				</ul>
			</nav>
			<div className="allPokes">
				{console.log(allPokemons)}
				{pokes}
			</div>
			<nav>
				<ul className="navPaginated">
					{pageNumbers &&
						pageNumbers.map((number) => (
							<li key={number} className="items">
								<button className="buttonPaginated" onClick={() => paginado(number)}>{number}</button>
							</li>
						))}
				</ul>
			</nav>
		</div>
	);
}

export default Paginated;
