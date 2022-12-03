import React from "react";
import { Link } from "react-router-dom";
import "./styles/Card.css";

export default function Card({ name, image, types, id }) {
	return (
		<Link to={`/pokemon/${id}`}>
			<div className="card">
				<div>{name[0].toUpperCase() + name.slice(1)}</div>
				<img src={image} alt="imagen card" className="imagePoke" />
				<div>
					{types.map((type) => (
						<div key={id + type}>{type.toUpperCase()}</div>
					))}
				</div>
			</div>
		</Link>
	);
}
