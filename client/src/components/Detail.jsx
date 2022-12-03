import "./styles/Detail.css";
import React, { useEffect } from "react";
import { Link, useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions";

function Detail() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const pokemonDetail = useSelector((state) => state.detail);


	useEffect(() => {
		dispatch(getDetail(id));
	}, [dispatch, id]);



	return (
		<div className="container">
			<div>
				<Link to="/home">
					<button>Return to home</button>
				</Link>
			</div>

			{pokemonDetail.length ? (
				<div>

					<div className="detailedPoke">
						<div>
							<img
								src={pokemonDetail[0].image}
								alt="imagen-del-pokemon"
								className="image"
							/>
						</div>
						<div>
							<div>
								{pokemonDetail[0].name[0].toUpperCase() +
									pokemonDetail[0].name.slice(1)}
							</div>
							<div>
								{pokemonDetail[0].types.map((el) => (
									<p key={pokemonDetail[0].name + el}>{el.toUpperCase()}</p>
								))}
							</div>
							<div>ID #{pokemonDetail[0].id}</div>
							<ul className="stats">

								<li>
									<p className="statsTitle">Height</p>
									{pokemonDetail[0].height}
								</li>

								<li>
									<p className="statsTitle">Weight</p>
									{pokemonDetail[0].weight}
								</li>

								<li>
									<p className="statsTitle">Hp</p> {pokemonDetail[0].hp}
								</li>

								<li>
									<p className="statsTitle">Attack</p>
									{pokemonDetail[0].attack}
								</li>

								<li>
									<p className="statsTitle">Defense</p>
									{pokemonDetail[0].defense}
								</li>

								<li>
									<p className="statsTitle">Speed</p>
									{pokemonDetail[0].speed}
								</li>
							</ul>
						</div>
					</div>
					<Link to={`/pokemon/${id * 1 + 1}`}>
						<button>Next</button>
					</Link>
				</div>
			) : (
				<div>
					<h1>That Pokemon doesn't exist yet</h1>
					<img src="https://media.tenor.com/UZJd1pjj4NMAAAAC/surprised-pikachu.gif" alt="That Pokemon doesn't exist yet" />
				</div>
			)}
		</div>
	);
}

export default Detail;
