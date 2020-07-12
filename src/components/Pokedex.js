import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPokemons, fetchPokemon } from '../store/actions';
import { useHistory } from 'react-router';

import PokedexCard from './PokedexCard';
import PokedexSearchBar from './PokedexSearchBar';

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

    const [pageNumber, setPageNumber] = useState(parseInt(1))

    const history = useHistory()
    
    const numberOfPokemon = 20
    const [offset, setOffset] = useState(numberOfPokemon * (pageNumber-1))
    const [limit, setLimit] = useState(numberOfPokemon)

    const [baseUrl, setBaseUrl] = useState(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`)

    useEffect(()=>{
        return history.listen((location)=>{
            const newPage = parseInt(location.pathname[location.pathname.length-1])
            setPageNumber(newPage)
            setOffset(numberOfPokemon * (newPage-1))
            setLimit(numberOfPokemon)
            setBaseUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${numberOfPokemon * (newPage-1)}&limit=${numberOfPokemon}`)
        })
    },[history, limit, offset, pageNumber])

    useEffect(()=>{
        // console.log("!!!!!!!!!!POKEMONSSS")
        fetchPokemons(baseUrl)
    },[baseUrl, fetchPokemons, pageNumber])

    useEffect(() => {
        // console.log("!!!!!!!!!!POKEMON");
        // if (pokemons && !search && !searchByPokemonID) {
            fetchPokemon(pokemons);
        // }
        // if (search && searchByPokemonID) {
            // fetchPokemon([`https://pokeapi.co/api/v2/pokemon/${searchByPokemonID}`])
            // setSearch(true)
        // }
      },[pokemons, fetchPokemon]);

    const previousPage = event =>{
        event.preventDefault()
        console.log("clicked prev")
        if( pageNumber > 1){
            console.log("not first Page")
            const newPage = pageNumber - 1
            history.push(`/pokemon/page/${newPage}`)
            
        }
    }

    const nextPage = event =>{
        event.preventDefault()
        console.log("clicked next")
        if(pageNumber < Math.ceil(808/20)){
            console.log("not last Page")
            const newPage = pageNumber + 1
            history.push(`/pokemon/page/${newPage}`)
        }
    }

    return(
        <div className="pokedex">
            <PokedexSearchBar/>
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
                    {pageNumber !== 1 && <button className="arrow-left" onClick={previousPage}></button>}
                    {pageNumber !== Math.ceil(808/20) && <button className="arrow-right"onClick={nextPage}></button>}
                </>)
            }
            {!isFetchingPokemon && !pokemonFetchError &&
                (<>
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
    return {
        isFetchingPokemons: state.pokemons.isFetchingPokemons,
        pokemons: state.pokemons.pokemons,
        pokemonsFetchError: state.pokemons.pokemonsFetchError,
        isFetchingPokemon: state.pokemon.isFetchingPokemon,
        pokemon: state.pokemon.pokemon,
        pokemonFetchError: state.pokemon.pokemonFetchError,
    };
}

export default connect(
    mapStateToProps,
    { fetchPokemons, fetchPokemon }
)(Pokedex);