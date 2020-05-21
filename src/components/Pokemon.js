import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPokemon } from '../store/actions';
import PokemonCard from './PokemonCard';

const Pokemon = props =>{

    const { name } = useParams('/pokemon/:name')
    const {
        isFetchingPokemon,
        pokemon,
        pokemonFetchError,
        fetchPokemon,
    } = props

    console.log()

    useEffect(() => {
        console.log("!!!!!!!!!!POKEMON");
        if (name) {
          fetchPokemon([`https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/pokemon/${name}`]);
        }
      }, [name, fetchPokemon]);

    console.log(name)
    return(
        <div className="pokemon">
            {isFetchingPokemon && (
                <>
                <img src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif" alt="slowpoke"></img>
                <p>Fetching Pokemons...</p>
                </>
            )}
            {!isFetchingPokemon && !pokemonFetchError &&
                (<>
                    {pokemon.map( pokemon =>{
                        return (
                            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                        )
                    })
                }   
                </>)
            }
        </div>
    )
}

const mapStateToProps = state =>{
    // console.log("Container ", state);
    return {
        isFetchingPokemon: state.pokemon.isFetchingPokemon,
        pokemon: state.pokemon.pokemon,
        pokemonFetchError: state.pokemon.pokemonsFetchError,
    };
}
export default connect(
    mapStateToProps,
    { fetchPokemon }
)(Pokemon);