import axios from "axios";

export const GET_POKEMONS = "GET_POKEMONS";
export const SET_ERROR = "SET_ERROR";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const GET_DETAIL = "GET_DETAIL";
export const GET_DETAIL_FROM_STATE= "GET_DETAIL_FROM_STATE";
export const GET_TYPES = "GET_TYPES";
export const FILTER_CREATED = "FILTER_CREATED"
export const FILTER_TYPE = "FILTER_TYPE"
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const RESET_POKEMONS = "RESET_POKEMONS"
export const POST_POKEMON = "POST_POKEMON"
export const GET_POKEMON_BY_NAME = "GET_POKEMON_BY_NAME";

export function getPokemons() {
    return async function (dispatch) {
      try {
        const json = await axios.get("http://localhost:3001/pokemon");
        return dispatch({
          type: GET_POKEMONS,
          payload: json.data,
        });
      } catch (error) {
        return dispatch({
          type: SET_ERROR,
          payload: true,
        });
      }
    };
  }
  
  export function setError(payload) {
    return {
      type: SET_ERROR,
      payload,
    };
  }

  export function setCurrentPage(payload) {
    return {
      type: SET_CURRENT_PAGE,
      payload,
    };
  }

  export function getDetail(pokemonId) {
    return async function(dispatch) {
      const json = await axios.get(`http://localhost:3001/pokemon/${pokemonId}`)
      return dispatch({
        type: GET_DETAIL,
        payload:json.data
      })      
    }
  }

  export function getDetailFromState(payload) {
    return {
      type: GET_DETAIL_FROM_STATE,
      payload,
    };
  }
  
  export function getTypes() {
    return async function (dispatch) {
      try {
        const types = await axios.get("http://localhost:3001/types");
        return dispatch({
          type: GET_TYPES,
          payload: types.data,
        });
      } catch (error) {
        return dispatch({
          type: SET_ERROR,
          payload: true,
        });
      }
    };
  }

  export function filterCreated(payload){
    return{      
      type: "FILTER_CREATED",
      payload
    }
  }


  export function filterType(payload){
    return{      
      type: "FILTER_TYPE",
      payload
    }
  }

  export function orderByName(payload) {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
  }
  
  export function orderByAttack(strongOrWeak) {
    return {
      type: ORDER_BY_ATTACK,
      strongOrWeak,
    };
  }

  export function resetPokemons() {
    return {
      type: RESET_POKEMONS,
    };
  }

  export function postPokemon(dataPost) {
    return async function (dispatch) {
      console.log(dataPost)
      const json = await axios.post("http://localhost:3001/pokemon", dataPost);
      return json;
    };
  }

  export function getPokemonByName(pokeName){
    return async function(dispatch) {
      try{
      const json = await axios.get("http://localhost:3001/pokemon?name="+pokeName);
        return dispatch({
          type: "GET_POKEMON_BY_NAME",
          payload: json.data
        })
      } catch (error) {
        return dispatch({
          type: SET_ERROR,
          payload: true,
        });
      }
    }
  }
