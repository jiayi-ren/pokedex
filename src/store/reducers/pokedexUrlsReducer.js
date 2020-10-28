import {
    FETCH_POKEDEX_URLS_START,
    FETCH_POKEDEX_URLS_SUCCESS,
    FETCH_POKEDEX_URLS_FAILURE,
} from '../actions';

const initialState = {
    isFetchingPokedexUrls: false,
    pokedexUrls: [],
    pokedexUrlsFetchError: '',
};

export const pokedexUrlsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POKEDEX_URLS_START:
            return {
                ...state,
                isFetchingPokedexUrls: true,
            };
        case FETCH_POKEDEX_URLS_SUCCESS:
            const pokedexLinks = action.payload.map(pokemon => {
                return pokemon.url;
            });

            return {
                ...state,
                isFetchingPokedexUrls: false,
                pokedexUrls: pokedexLinks,
                pokedexUrlsFetchError: '',
            };
        case FETCH_POKEDEX_URLS_FAILURE:
            return {
                ...state,
                isFetchingPokedexUrls: false,
                pokedexUrlsFetchError: 'Unable to fetch Pokemons',
            };
        default:
            return state;
    }
};
