import React from 'react';

const PokemonCard = props =>{

    const { pokemon } = props

    console.log(pokemon)

    return(
        <div className="pokemon-container" key={pokemon.id}>
            <div className="pokemon-info">
                <div className="pokemon-img">
                    <figure><img src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`} alt={`${pokemon.name}`}></img></figure>
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
        </div>
    )
}

export default PokemonCard;