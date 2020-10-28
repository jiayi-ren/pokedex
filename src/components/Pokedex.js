import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPokedexUrls, fetchPokedexPokemons } from '../store/actions';
import { useHistory } from 'react-router';

import PokedexCard from './PokedexCard';
import PokedexSearchBar from './PokedexSearchBar';

const Pokedex = props =>{

    const {
        isFetchingPokedexUrls,
        pokedexUrls,   //individual pokedexUrls url
        pokedexUrlsFetchError,
        fetchPokedexUrls,
        isFetchingPokedexPokemons,
        pokedexPokemons,    //array of pokemon info
        pokedexPokemonsFetchError,
        fetchPokedexPokemons,
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
        fetchPokedexUrls(baseUrl)
    },[baseUrl, fetchPokedexUrls, pageNumber])

    useEffect(() => {
        fetchPokedexPokemons(pokedexUrls);
    },[pokedexUrls, fetchPokedexPokemons]);

    const previousPage = event =>{
        event.preventDefault()
        // console.log("clicked prev")
        if( pageNumber > 1){
            // console.log("not first Page")
            const newPage = pageNumber - 1
            history.push(`/page/${newPage}`)
        }
    }

    const nextPage = event =>{
        event.preventDefault()
        // console.log("clicked next")
        if(pageNumber < Math.ceil(808/20)){
            // console.log("not last Page")
            const newPage = pageNumber + 1
            history.push(`/page/${newPage}`)
        }
    }

    return(
        <div className="pokedex">
            <PokedexSearchBar/>
            {isFetchingPokedexUrls && (
                <>
                <img src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif" alt="slowpoke"></img>
                <p>Fetching Pokemon list...</p>
                </>)}
            {!isFetchingPokedexUrls && pokedexUrlsFetchError && <p>{pokedexUrlsFetchError}</p>}
            {isFetchingPokedexPokemons && (
                <>
                <img src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif" alt="slowpoke"></img>
                <p>Fetching Pokemons...</p>
                </>
            )}
            {!isFetchingPokedexPokemons && !pokedexPokemonsFetchError &&
                (<>
                    {pageNumber !== 1 && <button className="arrow-left" onClick={previousPage}></button>}
                    {pageNumber !== Math.ceil(808/20) && <button className="arrow-right"onClick={nextPage}></button>}
                </>)
            }
            {!isFetchingPokedexPokemons && !pokedexPokemonsFetchError &&
                (<>
                    <div className="card-container">
                        {console.log("!isFetchingPokedexPokemons ")}
                        {pokedexPokemons.map( (pokemon, index) =>{
                            console.log("inside map")
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
        isFetchingPokedexUrls: state.pokedexUrls.isFetchingPokedexUrls,
        pokedexUrls: state.pokedexUrls.pokedexUrls,
        pokedexUrlsFetchError: state.pokedexUrls.pokedexUrlsFetchError,
        isFetchingPokedexPokemons: state.pokedexPokemons.isFetchingPokedexPokemons,
        pokedexPokemons: state.pokedexPokemons.pokedexPokemons,
        pokedexPokemonsFetchError: state.pokedexPokemons.pokedexPokemonsFetchError,
    };
}

export default connect(
    mapStateToProps,
    { fetchPokedexUrls, fetchPokedexPokemons }
)(Pokedex);