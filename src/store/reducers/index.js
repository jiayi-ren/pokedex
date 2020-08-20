import { combineReducers } from 'redux';
import { pokemonReducer as pokemon } from './pokemonReducer';
import { pokemonsReducer as pokemons } from './pokemonsReducer';
import { evolutionReducer as evolution } from './evolutionReducer';

export default combineReducers({
    pokemon,
    pokemons,
    evolution,
})