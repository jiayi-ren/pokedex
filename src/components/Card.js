import React from 'react';

const Card = props =>{

    console.log("Card")

    const { data} = props

    const imgSrc = `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`
    const imgAlt = `${data.name}`
    const imgLink = `/pokemon/${data.name}`
    const id = String(data.id).padStart(3, '0')

    return(
        <div className="card">
            <figure><a href={imgLink}><img className="card-pokemon-img" src={imgSrc} alt={imgAlt}></img></a></figure>
            <div className="card-pokemon-info">
                <p>#{id}</p>
                <h3>{data.name}</h3>
            </div>
            <div className="card-pokemon-type-container">
                {data.types.map( (type,index) =>{
                    console.log(type)
                    return <span key={index} className={type.type.name+ " card-pokemon-type"} >{type.type.name}</span>
                })}
            </div>
        </div>
    )
}

export default Card;