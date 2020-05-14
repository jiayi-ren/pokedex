import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPokemons, fetchPokemon } from '../store/actions';

import Card from './Card';

const CardContainer = props =>{

    const {
        isFetchingPokemons,
        pokemons,
        pokemonsFetchError,
        fetchPokemons,
        isFetchingPokemon,
        pokemon,
        pokemonFetchError,
        fetchPokemon,
    } = props

    useEffect(()=>{
        console.log("!!!!!!!!!!POKEMONSSS")
        fetchPokemons()
    },[fetchPokemons])

    useEffect(() => {
        console.log("!!!!!!!!!!POKEMON");
        if (pokemons) {
          fetchPokemon(pokemons);
        }
      }, [pokemons, fetchPokemon]);

    return(
        <div className="pokedex">
            {isFetchingPokemons && <p>Fetching Pokemon list...</p>}
            {!isFetchingPokemons && pokemonsFetchError && <p>{pokemonsFetchError}</p>}
            {isFetchingPokemon && <p>Fetching Pokemons...</p>}
            {!isFetchingPokemon && !pokemonFetchError &&
                (<div className="card-container">
                    {pokemon.map( (pokemon, index) =>{
                    return ( <Card key={index} data={pokemon}/> )
                    })
                }   
                </div>)
            }
        </div>
    )
}

const mapStateToProps = state =>{
    // console.log("Container ", state);
    return {
        isFetchingPokemons: state.pokemons.isFetchingPokemons,
        pokemons: state.pokemons.pokemons,
        pokemonsFetchError: state.pokemons.pokemonsFetchError,
        isFetchingPokemon: state.pokemon.isFetchingPokemon,
        pokemon: state.pokemon.pokemon,
        pokemonFetchError: state.pokemon.pokemonsFetchError,
    };
}

export default connect(
    mapStateToProps,
    { fetchPokemons, fetchPokemon }
)(CardContainer);