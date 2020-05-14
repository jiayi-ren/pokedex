import axios from 'axios';

export const FETCH_POKEMONS_START = "FETCH_POKEMONS_START";
export const FETCH_POKEMONS_SUCCESS = "FETCH_POKEMONS_SUCCESS";
export const FETCH_POKEMONS_FAILURE = "FETCH_POKEMONS_FAILURE";

export const fetchPokemons = () =>{

    console.log("FETCH POKEMON LIST")

    return dispatch => {
        dispatch({ type: FETCH_POKEMONS_START })

        axios
            .get(`https://pokeapi.co/api/v2/pokemon/`)
            .then(res =>{
                // console.log(res.data)
                console.log("FETCH CONTAINER SUCCESS")
                dispatch({type: FETCH_POKEMONS_SUCCESS, payload: res.data.results})
            })
            .catch(err =>{
                console.log(err)
                dispatch({type: FETCH_POKEMONS_FAILURE})
            })
    }

};

export const FETCH_POKEMON_START = "FETCH_POKEMON_START";
export const FETCH_POKEMON_SUCCESS = "FETCH_POKEMON_SUCCESS";
export const FETCH_POKEMON_FAILURE = "FETCH_POKEMON_FAILURE";

export const fetchPokemon = urls =>{

    console.log("FETCH POKEMON")

    const requests = urls.map( url =>{
        return axios.get(url)
    })

    console.log(requests)
    return dispatch => {
        dispatch({ type: FETCH_POKEMON_START })
        axios
            .all(requests)
            .then(axios.spread((...responses) =>{
                const data = responses.map( response =>{
                    return response.data
                })
                console.log("FETCH CARD SUCCESS")
                // console.log(data)
                dispatch({type: FETCH_POKEMON_SUCCESS, payload: data})
            }))
            .catch(err =>{
                console.log(err)
                dispatch({type: FETCH_POKEMON_FAILURE})
            })
    }

};
