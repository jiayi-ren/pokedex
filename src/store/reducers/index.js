import { combineReducers } from 'redux';
import { pokedexPokemonsReducer as pokedexPokemons } from './pokedexPokemonsReducer';
import { pokedexUrlsReducer as pokedexUrls } from './pokedexUrlsReducer';
import { evolutionReducer as evolution } from './evolutionReducer';
import { pokemonReducer as pokemon } from './pokemonReducer';

export default combineReducers({
    pokedexPokemons,
    pokedexUrls,
    evolution,
    pokemon,
})