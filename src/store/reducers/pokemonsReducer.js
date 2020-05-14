import {
    FETCH_POKEMONS_START,
    FETCH_POKEMONS_SUCCESS,
    FETCH_POKEMONS_FAILURE,
} from '../actions'

const initialState = {
    isFetchingPokemons: false,
    pokemons:[],
    pokemonsFetchError:""
}

export const pokemonsReducer = ( state = initialState, action ) =>{
    switch(action.type){
        case FETCH_POKEMONS_START:
            return{
                ...state,
                isFetchingPokemons: true,
            }
        case FETCH_POKEMONS_SUCCESS:
            const  pokemonsLinks = action.payload.map( pokemon =>{
                return pokemon.url
            })

            return{
                ...state,
                isFetchingPokemons: false,
                pokemons: pokemonsLinks,
                pokemonsFetchError:"",
            }
        case FETCH_POKEMONS_FAILURE:
            return{
                ...state,
                isFetchingPokemons: false,
                pokemonsFetchError:"Unable to fetch Pokemons",
            }
        default:
            return state;
    }
}