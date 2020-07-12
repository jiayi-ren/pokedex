import React, { useState } from 'react';
import { useHistory } from 'react-router';

const PokedexSearchBar = props =>{

    const history = useHistory()
    const [searchByPokemonID, setSearchByPokemonID] = useState("")

    const handleChangeSearch = event =>{
        const value = event.target.value? event.target.value:""
        setSearchByPokemonID(value)
    }

    const handleSubmitSearch = event =>{
        event.preventDefault()
        if (searchByPokemonID != ""){
            history.push(`/pokemon/search?search=${searchByPokemonID}`)
        }else{
            history.push("/pokemon/page/1")
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmitSearch}>
                <input 
                    name="searchPokemon"
                    value={searchByPokemonID}
                    type="text"
                    placeholder="Search by Poke Number"
                    onChange={handleChangeSearch}
                />
                <button>Search</button>
            </form>
        </div>
    )
}

export default PokedexSearchBar;