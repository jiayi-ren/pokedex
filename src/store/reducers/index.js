import { combineReducers } from 'redux';
import { pokemonReducer as pokemon } from './pokemonReducer';
import { pokemonsReducer as pokemons } from './pokemonsReducer';

export default combineReducers({
    pokemon,
    pokemons,
})