import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPokemon } from '../store/actions';
import PokemonCard from './PokemonCard';

const Pokemon = props =>{

    const { name } = useParams('/pokemon/name/:name')
    const {
        isFetchingPokemon,
        pokemon,
        pokemonFetchError,
        fetchPokemon,
    } = props

    useEffect(() => {
        if (name) {
          fetchPokemon([`https://cors-anywhere.herokuapp.com/https://pokeapi.co/api/v2/pokemon/${name}`]);
        }
      }, [name, fetchPokemon]);

    return(
        <div className="pokemon">
            {isFetchingPokemon && pokemon === null &&(
                <>
                <img src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif" alt="slowpoke"></img>
                <p>Fetching Pokemon...</p>
                </>
            )}
            {!isFetchingPokemon && pokemonFetchError === "" && pokemon !== null && pokemon.hasOwnProperty('id') && (
                (
                    <PokemonCard pokemon={pokemon}/>
                )
            )}
        </div>
    )
}

const mapStateToProps = state =>{

    return {
        isFetchingPokemon: state.pokemon.isFetchingPokemon,
        pokemon: state.pokemon.pokemon,
        pokemonFetchError: state.pokemon.pokemonFetchError,
    };
}
export default connect(
    mapStateToProps,
    { fetchPokemon }
)(Pokemon);