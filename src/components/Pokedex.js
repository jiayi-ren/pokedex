import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPokemons, fetchPokemon } from '../store/actions';

import PokedexCard from './PokedexCard';

const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"

const Pokedex = props =>{

    const {
        isFetchingPokemons,
        pokemons,   //individual pokemons url
        pokemonsFetchError,
        fetchPokemons,
        isFetchingPokemon,
        pokemon,    //array of pokemon info
        pokemonFetchError,
        fetchPokemon,
    } = props

    const numberOfPokemons = 20
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(numberOfPokemons)

    const [pageNumber, setPageNumber] = useState(1)

    const [baseUrl, setBaseUrl] = useState(url)

    useEffect(()=>{
        console.log("!!!!!!!!!!POKEMONSSS")
        fetchPokemons(baseUrl)
    },[baseUrl, fetchPokemons])

    useEffect(() => {
        console.log("!!!!!!!!!!POKEMON");
        if (pokemons) {
          fetchPokemon(pokemons);
        }
      }, [pokemons, fetchPokemon]);

    const PreviousPage = event =>{
        event.preventDefault()
        console.log("clicked prev")
        if(pageNumber > 1){
            console.log("not first Page")
            setPageNumber(pageNumber - 1)
            setOffset(offset - numberOfPokemons)
            setLimit(limit)
            setBaseUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${offset - numberOfPokemons}&limit=${limit}`)
        }
    }

    const NextPage = event =>{
        event.preventDefault()
        console.log("clicked next")
        if(pageNumber < Math.ceil(808/20)){
            console.log("not last Page")
            setPageNumber(pageNumber + +1)
            setOffset(offset + numberOfPokemons)
            setLimit(limit)
            setBaseUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${offset + numberOfPokemons}&limit=${limit}`)
        }
    }

    return(
        <div className="pokedex">
            {isFetchingPokemons && (
                <>
                <img src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif" alt="slowpoke"></img>
                <p>Fetching Pokemon list...</p>
                </>)}
            {!isFetchingPokemons && pokemonsFetchError && <p>{pokemonsFetchError}</p>}
            {isFetchingPokemon && (
                <>
                <img src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif" alt="slowpoke"></img>
                <p>Fetching Pokemons...</p>
                </>
            )}
            {!isFetchingPokemon && !pokemonFetchError &&
                (<>
                    {pageNumber !== 1 && <button className="arrow-left" onClick={PreviousPage}></button>}
                    {pageNumber !== Math.ceil(808/20) && <button className="arrow-right"onClick={NextPage}></button>}
                    <div className="card-container">
                        {pokemon.map( (pokemon, index) =>{
                            if(pokemon.id < 808){
                                return ( <PokedexCard key={index} data={pokemon}/> )
                            }
                            return null
                        })
                    }   
                    </div>
                </>)
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
)(Pokedex);