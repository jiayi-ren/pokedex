import {
    FETCH_EVOLUTION_START,
    FETCH_EVOLUTION_SUCCESS,
    FETCH_EVOLUTION_FAILURE,
} from '../actions';

const initialState = {
    isFetchingEvo: false,
    pokemonChain: [],
    evoFetchError: '',
};

export const evolutionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EVOLUTION_START:
            return {
                ...state,
                isFetchingEvo: true,
            };
        case FETCH_EVOLUTION_SUCCESS:
            return {
                ...state,
                isFetchingEvo: false,
                pokemonChain: action.payload,
                evoFetchError: '',
            };
        case FETCH_EVOLUTION_FAILURE:
            return {
                ...state,
                isFetchingEvo: false,
                evoFetchError: 'Unable to fetch Pokemon Evolution',
            };
        default:
            return state;
    }
};
