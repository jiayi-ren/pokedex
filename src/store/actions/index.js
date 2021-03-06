import axios from 'axios';

export const FETCH_POKEDEX_URLS_START = 'FETCH_POKEDEX_URLS_START';
export const FETCH_POKEDEX_URLS_SUCCESS = 'FETCH_POKEDEX_URLS_SUCCESS';
export const FETCH_POKEDEX_URLS_FAILURE = 'FETCH_POKEDEX_URLS_FAILURE';

export const fetchPokedexUrls = url => {
    return dispatch => {
        dispatch({ type: FETCH_POKEDEX_URLS_START });

        axios
            .get(url)
            .then(res => {
                dispatch({
                    type: FETCH_POKEDEX_URLS_SUCCESS,
                    payload: res.data.results,
                });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: FETCH_POKEDEX_URLS_FAILURE });
            });
    };
};

export const FETCH_POKEDEX_POKEMONS_START = 'FETCH_POKEDEX_POKEMONS_START';
export const FETCH_POKEDEX_POKEMONS_SUCCESS = 'FETCH_POKEDEX_POKEMONS_SUCCESS';
export const FETCH_POKEDEX_POKEMONS_FAILURE = 'FETCH_POKEDEX_POKEMONS_FAILURE';

export const fetchPokedexPokemons = urls => {
    const requests = urls.map(url => {
        return axios.get(url);
    });

    return dispatch => {
        dispatch({ type: FETCH_POKEDEX_POKEMONS_START });
        axios
            .all(requests)
            .then(
                axios.spread((...responses) => {
                    const data = responses.map(response => {
                        return response.data;
                    });
                    dispatch({
                        type: FETCH_POKEDEX_POKEMONS_SUCCESS,
                        payload: data,
                    });
                }),
            )
            .catch(err => {
                console.log(err);
                dispatch({ type: FETCH_POKEDEX_POKEMONS_FAILURE });
            });
    };
};

export const FETCH_EVOLUTION_START = 'FETCH_EVOLUTION_START';
export const FETCH_EVOLUTION_SUCCESS = 'FETCH_EVOLUTION_SUCCESS';
export const FETCH_EVOLUTION_FAILURE = 'FETCH_EVOLUTION_FAILURE';

export const fetchEvolution = url => {
    return dispatch => {
        dispatch({ type: FETCH_EVOLUTION_START });
        axios
            .get(url)
            .then(res => {
                axios
                    .get(res.data.evolution_chain.url)
                    .then(res => {
                        let pokemonIdChain = [];
                        let evolve = [res.data.chain];

                        while (evolve.length !== 0) {
                            let id = evolve[0].species.url.split('/');
                            pokemonIdChain.push(id[id.length - 2]);
                            evolve = evolve[0].evolves_to
                                ? evolve[0].evolves_to
                                : [];
                        }
                        dispatch({
                            type: FETCH_EVOLUTION_SUCCESS,
                            payload: pokemonIdChain,
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        dispatch({ type: FETCH_EVOLUTION_FAILURE });
                    });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: FETCH_EVOLUTION_FAILURE });
            });
    };
};

export const FETCH_POKEMON_START = 'FETCH_POKEMON_START';
export const FETCH_POKEMON_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMON_FAILURE = 'FETCH_POKEMON_FAILURE';

export const fetchPokemon = url => {
    return dispatch => {
        dispatch({ type: FETCH_POKEMON_START });

        axios
            .get(url)
            .then(res => {
                dispatch({ type: FETCH_POKEMON_SUCCESS, payload: res.data });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: FETCH_POKEMON_FAILURE });
            });
    };
};
