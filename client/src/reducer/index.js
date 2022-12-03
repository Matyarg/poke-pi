import {
    GET_POKEMONS,
    GET_DETAIL,
    SET_CURRENT_PAGE,
    GET_DETAIL_FROM_STATE,
	GET_TYPES,
	FILTER_CREATED,
	FILTER_TYPE,
	ORDER_BY_NAME,
	ORDER_BY_ATTACK,
	RESET_POKEMONS,
	POST_POKEMON,
	GET_POKEMON_BY_NAME,
} from "../actions/index.js"


const initialState = {
    pokemons: [],
    allPokemons: [],
	currentPage: 1,
    allTypes: [],
    detail: [],
  };

function rootReducer(state = initialState, action) {
    switch (action.type) {
			case GET_POKEMONS:
				if (!action.payload.includes(null)) {
					return {
						...state,
						pokemons: action.payload,
						allPokemons: action.payload,
					};
				} else {
					return { ...state, error: true };
				}
			case SET_CURRENT_PAGE:
				return {
					...state,
					currentPage: action.payload,
				};
			case GET_DETAIL:
				return {
					...state,
					detail: action.payload,
				};

			case GET_TYPES:
				return {
					...state,
					allTypes: action.payload,
				};

			case GET_DETAIL_FROM_STATE:
				const todosLosPokemon = [...state.allPokemons];
				const detallesPokemon = todosLosPokemon.filter(
					(p) => p.id.toString() === action.payload
				);

				return {
					...state,
					detail: detallesPokemon,
				};

				case FILTER_TYPE:
					if (action.payload === "all") {
						return {
							...state,
							pokemons: state.allPokemons,
							currentPage: 1,
						} 
					}else {
							const allPoke = [...state.allPokemons];
							const typesFilter = allPoke.filter((p) => p.types.includes(action.payload))
							return {
								...state,
								pokemons: typesFilter,
								currentPage: 1,
							}
						}

				case FILTER_CREATED:
					const allPoke = [...state.allPokemons];
					let pokesFiltered = allPoke;
					if (action.payload === "created") {
					  pokesFiltered = allPoke.filter((p) => p.createdb === false);
					  if (!pokesFiltered.length) {
						return {
						  ...state,
						};
					  }
					}
					if (action.payload === "existing") {
						pokesFiltered = allPoke.filter((p) => !p.createdb);
					}
					return {
					  ...state,
					  pokemons: pokesFiltered,
					  currentPage: 1,
					};

					case ORDER_BY_NAME:

						const sortedPokemon =
						  action.payload === "asc"
							? [...state.pokemons].sort(function (a, b) {
								if (a.name > b.name) {
								  return 1;
								}
								if (b.name > a.name) {
								  return -1;
								}
								return 0;
							  })
							: [...state.pokemons].sort(function (a, b) {
								if (a.name > b.name) {
								  return -1;
								}
								if (b.name > a.name) {
								  return 1;
								}
								return 0;
							  });
						return {
						  ...state,
						  pokemons: sortedPokemon,
						  currentPage: 1,
						};
				  
					  case ORDER_BY_ATTACK:
						const sortedPokemonAttack =
						  action.payload === "strongest"
							? [...state.pokemons].sort(function (a, b) {
								if (a.attack > b.attack) {
								  return -1;
								}
								if (b.attack > a.attack) {
								  return 1;
								}
								return 0;
							  })
							: [...state.pokemons].sort(function (a, b) {
								if (a.attack > b.attack) {
								  return 1;
								}
								if (b.attack > a.attack) {
								  return -1;
								}
								return 0;
							  });
						return {
						  ...state,
						  pokemons: sortedPokemonAttack,
						  currentPage: 1,
						};

					case RESET_POKEMONS:
						const allPokemons = [...state.allPokemons]
						return {
							...state,
							pokemons: allPokemons,
						}

						case POST_POKEMON:
							return {
							  ...state,
							};

					case GET_POKEMON_BY_NAME:
						return{
							...state,
							pokemons: action.payload,
						}

			default:
				return { ...state };
		};

		}


export default rootReducer;
