import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchEvolution } from '../store/actions';
import { Images } from '../images/Images';

const PokemonEvo = props => {
    const {
        pokemon,
        isFetchingEvo,
        pokemonChain,
        evoFetchError,
        fetchEvolution,
    } = props;

    const [imgName] = useState('');
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
    ];
    const isException = exceptionIdForms.includes(pokemon.id);

    useEffect(() => {
        console.log(pokemon.species.url);
        if (pokemon.species.url) {
            fetchEvolution(pokemon.species.url);
        }
    }, [pokemon, fetchEvolution]);

    return (
        <div className="pokemon-evolution">
            <div>Evolutions</div>
            {isFetchingEvo && (
                <>
                    <img
                        src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif"
                        alt="slowpoke"
                    ></img>
                    <p>Fetching Evolution...</p>
                </>
            )}
            <div className="pokemon-evolution-container">
                {!isFetchingEvo &&
                    pokemonChain.map((id, index) => {
                        const imgSrc = isException
                            ? Images[imgName]
                            : `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
                        const isLast = index === pokemonChain.length - 1;
                        return (
                            <div className="pokemon-evo-single" key={id}>
                                <div className="pokemon-evo-img">
                                    <figure>
                                        <img
                                            src={imgSrc}
                                            alt={`${pokemon.name}`}
                                        ></img>
                                    </figure>
                                </div>
                                {!isLast && <span>{`>>`}</span>}
                                {isLast && <span>&nbsp;&nbsp;</span>}
                            </div>
                        );
                    })}
            </div>
            {isFetchingEvo && <>{evoFetchError}</>}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isFetchingEvo: state.evolution.isFetchingEvo,
        pokemonChain: state.evolution.pokemonChain,
        evoFetchError: state.evolution.evoFetchError,
    };
};

export default connect(mapStateToProps, { fetchEvolution })(PokemonEvo);
