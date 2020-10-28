import {
    FETCH_POKEDEX_POKEMONS_START,
    FETCH_POKEDEX_POKEMONS_SUCCESS,
    FETCH_POKEDEX_POKEMONS_FAILURE,
} from '../actions';

const initialState = {
    isFetchingPokedexPokemon: false,
    pokedexPokemons: [],
    pokedexPokemonsFetchError: '',
};

export const pokedexPokemonsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POKEDEX_POKEMONS_START:
            return {
                ...state,
                isFetchingPokedexPokemon: true,
            };
        case FETCH_POKEDEX_POKEMONS_SUCCESS:
            return {
                ...state,
                isFetchingPokedexPokemon: false,
                pokedexPokemons: action.payload,
                pokedexPokemonsFetchError: '',
            };
        case FETCH_POKEDEX_POKEMONS_FAILURE:
            return {
                ...state,
                isFetchingPokedexPokemon: false,
                pokedexPokemonsFetchError: 'Unable to fetch Pokedex Pokemon',
            };
        default:
            return state;
    }
};
