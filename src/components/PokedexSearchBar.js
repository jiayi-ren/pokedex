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
        if (searchByPokemonID !== ""){
            history.push(`/pokemon?search=${searchByPokemonID}`)
        }else{
            history.push("/page/1")
        }
    }

    return(
        <div className="search-bar">
            <form onSubmit={handleSubmitSearch} className="search-box">
                <input 
                    name="searchPokemon"
                    value={searchByPokemonID}
                    type="text"
                    placeholder="Search by Pokemon Number or Name"
                    onChange={handleChangeSearch}
                    className="search-input"
                />
                <button
                    className="search-button"
                ></button>
            </form>
        </div>
    )
}

export default PokedexSearchBar;