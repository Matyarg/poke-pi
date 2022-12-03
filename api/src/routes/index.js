const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { getAllPokemons, cleanResponse } = require("./utils");
const { Pokemon, Type } = require("../db");
const e = require("express");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//get para home y filtrar por name
router.get("/pokemon", async (req, res) => {
	const name = req.query.name;
	let infoTotal = await getAllPokemons();

	if (name) {
		let pokemonName = await infoTotal.filter(
			(el) => el.name.toLowerCase() === name.toLowerCase()
		);
		pokemonName.length
			? res.status(200).send(pokemonName)
			: res.status(404).send("no esta el pokemon");
	} else {
		res.status(200).send(infoTotal);
	}
});

// get para types y para llenar DB
router.get("/types", async (req, res) => {
	let apiType = await axios.get("https://pokeapi.co/api/v2/type");
	let apiTypeData = apiType.data;
	let types = apiTypeData.results.map((e) => e.name);

	console.log(types);

	types.forEach((element) => {
		Type.findOrCreate({
			where: {
				name: element,
			},
		});
	});
	const allTypes = await Type.findAll();
	return res.status(200).send(allTypes);
});

// get para buscar por ID en la API y DB
router.get("/pokemon/:id", async (req, res) => {
	try {
			const { id } = req.params;
			let allpokemonById = await getAllPokemons();

			if (id) {
				let pokemonById = await allpokemonById.filter((el) => el.id === id);
				console.log(pokemonById);
				if (pokemonById.length) {
					res.status(200).send(pokemonById);
				} else {
					let pokeDetail = await axios.get(
						`https://pokeapi.co/api/v2/pokemon/${id}`
					);
					let infoPokemon = [];
					infoPokemon.push(cleanResponse(pokeDetail));

					res.status(200).send(infoPokemon);
				}
			} else {
				res.status(200).send(allpokemonById);
			}
	} catch (error) {
		res.status(400).json({ error: error.message });
		}
});

router.post("/pokemon", async (req,res ) => {
    const { name, hp, attack, defense, speed, height, weight, image, types } = req.body;
    if (name) {
        const allPokemon = await getAllPokemons();
        const alreadyExist = allPokemon.find(el => el.name.toLowerCase() === name.toLowerCase())
        if(!alreadyExist) {
            const pokemon = await Pokemon.create({
                name, hp, attack, defense, speed, height, weight, image,
            })

            const typeDb = await Type.findAll({
                where: {
                    name: types,
                }                
            });
            pokemon.addType(typeDb);
            return res.status(201).send(pokemon)
        }
        return res.status(404).send('There is already a Pokemon with that name, please choose another one')
    }
    if (!name) return res.status(404).send('The field \"name\" is mandatory, please fill it.')

})


module.exports = router;
