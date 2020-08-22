import React, { useState, useEffect } from 'react';
import { Images } from '../images/Images';
import PokemonEvo from './PokemonEvo';

const PokemonCard = props =>{
    
    const { pokemon } = props

    console.log(pokemon)

    const [selectedOption, setSelectedOption] = useState(1)
    const [imgName, setImgName] = useState("")

    const exceptionIdForms = [412,413,421,487,492,585,586,641,642,647,648,718,719,720,741,745,746,774,778]
    const isException = exceptionIdForms.includes(pokemon.id)

    useEffect(()=>{
        const imgId = `image${pokemon.id}_f${selectedOption}`
        setImgName(imgId)
    },[selectedOption, pokemon.id])

    const handleSelectChange = event =>{
        const value = parseInt(event.target.value)
        setSelectedOption(value)
    }

    const imgSrc = isException? Images[imgName]:`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`

    return(
        <div className="pokemon-container" key={pokemon.id}>
            {isException && (
                    <select value={selectedOption} onChange={handleSelectChange}>
                    {pokemon.forms.map( (form,index) =>{
                        return(
                            <option key={index} value={index +1}>{form.name}</option>
                        )
                    })}
                </select>
                )}
            <div className="pokemon-info">
                <div className="pokemon-img">
                    {isException && (
                        <figure><img src={imgSrc} alt={`${pokemon.name}`}></img></figure>
                    )}
                    {!isException && (
                        <figure><img src={imgSrc} alt={`${pokemon.name}`}></img></figure>
                    )}
                </div>
                <div className="pokemon-basic-info">
                    <h2 className="pokemon-name">{pokemon.name} &nbsp; #{String(pokemon.id).padStart(3, '0')}</h2>
                    <div className="pokemon-types">
                        {pokemon.types.map( (type,index) =>{
                            // console.log(type)
                            return <span key={index} className={type.type.name+ " pokemon-type"} >{type.type.name}</span>
                        })}
                    </div>
                    <h3 className="pokemon-stat">Height: {pokemon.height}m</h3>
                    <h3 className="pokemon-stat">Weight: {pokemon.weight}kg</h3>
                    <div className="pokemon-stats">
                        <div className="pokemon-stats-bar">
                            {pokemon.stats.map( (stat, index) =>{
                                // console.log(pokemon.types[0].type.name)
                                const classList = `${pokemon.types[0].type.name} pokemon-stat-bar`
                                const barStyle = {
                                    height: `${stat.base_stat+20}px`,
                                    top:`${100-stat.base_stat}px`,
                                }
                            return <span key={index} className={classList} style={barStyle}>{stat.base_stat}</span>
                            })}
                        </div>
                        <div className="pokemon-stats-tick">
                            {pokemon.stats.map( (stat, index) =>{
                                // console.log(stat.stat.name)
                                return <span key={index} className="pokemon-stat-tick">{stat.stat.name}</span>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <PokemonEvo pokemon={pokemon} />  
        </div>
    )
}

export default PokemonCard;