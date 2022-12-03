const axios = require("axios");
const { Pokemon, Type } = require("../db");

const cleanResponse = (pokeDetail) => {
  const infoPokemons = {
    id: pokeDetail.data.id,
    name: pokeDetail.data.name,
    hp: pokeDetail.data.stats[0].base_stat,
    attack: pokeDetail.data.stats[1].base_stat,
    defense: pokeDetail.data.stats[2].base_stat,
    speed: pokeDetail.data.stats[5].base_stat,
    height: pokeDetail.data.height,
    weight: pokeDetail.data.weight,
    image: pokeDetail.data.sprites.other.home.front_default ? pokeDetail.data.sprites.other.home.front_default : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeDetail.data.id}.png`,
    types: pokeDetail.data.types.map((el) => el.type.name),
  };
  return infoPokemons;
}


// peticion por API (solo 40 pokemons)
const getInfoApi = async () => {
  try {
    const primerosPokemon = await axios.get(
      "https://pokeapi.co/api/v2/pokemon"
    );
    //la api nos trae 20 pokemons y nos piden trabajar con 40.
    const segundosPokemon = await axios.get(primerosPokemon.data.next);
    const allPokemon = primerosPokemon.data.results.concat(
      segundosPokemon.data.results
    );
    const infoPokemons = await Promise.all(
      allPokemon.map(async (pokemon) => {
        let pokeDetail = await axios.get(pokemon.url);
        return cleanResponse(pokeDetail);
      })
    );

    return infoPokemons;
  } catch (error) {
    console.log("entre al error del getinfoapi", error);
  }
};


// peticion por base de datos
const getInfoDb = async () => {
  const pokemonsDB = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
// sacamos a los types del objeto para mostrar el valor plano en array
  const pokemonsMapeados = pokemonsDB.map((pokemon) => {
    const { types } = pokemon;
    const pokemonData = {
      ...pokemon.dataValues,
      types: types.map((t) => t.name),
    };
    return pokemonData;
  });
  return pokemonsMapeados;
};


//  traer todos los pokemons 
const getAllPokemons = async () => {
  try {
    const apiInfo = await getInfoApi();
    const dbInfo = await getInfoDb();
    const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
  } catch (error) {
    console.log("entre al error del getAllPokemons", error);
  }
};



module.exports = {
  getAllPokemons,
  getInfoDb, getInfoApi, cleanResponse

};
