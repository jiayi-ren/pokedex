import React, { useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';

const PokedexSearchBar = props =>{

    const history = useHistory()
    const match = useRouteMatch("/page/:page");

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
            if (match) {
                history.push(`/page/${match.params.page}`)
            }else {
                history.goBack()
            }
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