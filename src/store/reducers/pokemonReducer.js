import {
    FETCH_POKEMON_START,
    FETCH_POKEMON_SUCCESS,
    FETCH_POKEMON_FAILURE,
} from '../actions';

const initialState = {
    isFetchingPokemon: false,
    pokemon: null,
    pokemonFetchError: '',
};

export const pokemonReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POKEMON_START:
            return {
                ...state,
                isFetchingPokemon: true,
            };
        case FETCH_POKEMON_SUCCESS:
            return {
                ...state,
                isFetchingPokemon: false,
                pokemon: action.payload,
                pokemonFetchError: '',
            };
        case FETCH_POKEMON_FAILURE:
            return {
                ...state,
                isFetchingPokemon: false,
                pokemonFetchError: 'Unable to fetch Pokemon',
            };
        default:
            return state;
    }
};
