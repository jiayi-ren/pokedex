import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { fetchPokemon } from '../store/actions';

import PokedexCard from '../components/PokedexCard';
import PokedexSearchBar from './PokedexSearchBar';

const PokedexSearch = props =>{

    const { 
        isFetchingPokemon,
        pokemon,
        pokemonFetchError,
        fetchPokemon,
    } = props

    const history = useHistory()
    
    useEffect(()=>{
        fetchPokemon([`https://pokeapi.co/api/v2/pokemon/${history.location.search.slice(8, history.location.search.length)}`])
    },[fetchPokemon, history.location.search])

    useEffect(()=>{
        return history.listen((location)=>{
            fetchPokemon([`https://pokeapi.co/api/v2/pokemon/${location.search.slice(8, location.search.length)}`])
        })
    },[history, fetchPokemon])

    return(
        <div>
            <PokedexSearchBar/>
            {isFetchingPokemon && (
                <>
                <img src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif" alt="slowpoke"></img>
                <p>Searching Pokemon...</p>
                </>
            )}
            {!isFetchingPokemon && !pokemonFetchError && pokemon !== null && 
                (<>
                    <div className="card-container">
                        <PokedexCard data={pokemon} />
                    </div>
                </>)
            }
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
)(PokedexSearch);