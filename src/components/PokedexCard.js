import React from 'react';
import { useHistory } from 'react-router-dom';

const PokedexCard = props =>{

    console.log("Card")

    const { data } = props
    const { push } = useHistory()

    const imgSrc = `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`
    const imgAlt = `${data.name}`
    const imgLink = `/pokemon/${data.name}`
    const id = String(data.id).padStart(3, '0')

    return(
        <div className="card">
            <figure><img className="card-pokemon-img" src={imgSrc} alt={imgAlt} onClick={()=>{push(imgLink)}}></img></figure>
            <div className="card-pokemon-info">
                <p>#{id}</p>
                <h3>{data.name}</h3>
            </div>
            <div className="card-pokemon-type-container">
                {data.types.map( (type,index) =>{
                    // console.log(type)
                    return <span key={index} className={type.type.name+ " card-pokemon-type"} >{type.type.name}</span>
                })}
            </div>
        </div>
    )
}

export default PokedexCard;