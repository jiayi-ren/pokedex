import React from 'react';
import { useHistory } from 'react-router-dom';
import { Images } from '../images/Images';

const PokedexCard = props => {
    const { data } = props;
    const { push } = useHistory();

    const exceptionIdForms = [
        412,
        413,
        421,
        487,
        492,
        585,
        586,
        641,
        642,
        647,
        648,
        718,
        719,
        720,
        741,
        745,
        746,
        774,
        778,
        719,
    ];
    const isException = exceptionIdForms.includes(data.id);

    const imgId = `image${data.id}_f1`;
    const imgSrc = isException
        ? Images[imgId]
        : `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`;
    const imgAlt = `${data.name}`;
    const imgLink = `/pokemon/name/${data.name}`;
    const id = String(data.id).padStart(3, '0');

    return (
        <div className="card">
            {isException && (
                <img
                    className="card-pokemon-img"
                    src={imgSrc}
                    alt={imgAlt}
                    onClick={() => {
                        push(imgLink);
                    }}
                ></img>
            )}
            {!isException && (
                <img
                    className="card-pokemon-img"
                    src={imgSrc}
                    alt={imgAlt}
                    onClick={() => {
                        push(imgLink);
                    }}
                ></img>
            )}
            <div className="card-pokemon-info">
                <p>#{id}</p>
                <h3>{data.name}</h3>
            </div>
            <div className="card-pokemon-type-container">
                {data &&
                    data.types.map((type, index) => {
                        return (
                            <span
                                key={index}
                                className={
                                    type.type.name + ' card-pokemon-type'
                                }
                            >
                                {type.type.name}
                            </span>
                        );
                    })}
            </div>
        </div>
    );
};

export default PokedexCard;
