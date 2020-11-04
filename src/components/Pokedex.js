import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPokedexUrls, fetchPokedexPokemons } from '../store/actions';
import { useHistory, useRouteMatch } from 'react-router';

import PokedexCard from './PokedexCard';
import PokedexSearchBar from './PokedexSearchBar';
import axios from 'axios';

const Pokedex = props => {
    const {
        isFetchingPokedexUrls,
        pokedexUrls, //individual pokedexUrls url
        pokedexUrlsFetchError,
        fetchPokedexUrls,
        isFetchingPokedexPokemons,
        pokedexPokemons, //array of pokemon info
        pokedexPokemonsFetchError,
        fetchPokedexPokemons,
    } = props;

    const match = useRouteMatch('/page/:page');
    const history = useHistory();

    const [pageNumber, setPageNumber] = useState(parseInt(match.params.page));

    const numberOfPokemon = 20;
    const [offset, setOffset] = useState(numberOfPokemon * (pageNumber - 1));
    const [limit, setLimit] = useState(numberOfPokemon);

    const [baseUrl, setBaseUrl] = useState(
        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`,
    );

    // cache all pokemon names for autosuggest
    useEffect(() => {
        axios
            .get('https://pokeapi.co/api/v2/pokemon?limit=808')
            .then(res => {
                window.sessionStorage.setItem(
                    '__a',
                    JSON.stringify(res.data.results),
                );
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        return history.listen(location => {
            const newPageNumber = parseInt(location.pathname.slice(6));
            setPageNumber(newPageNumber);
            setOffset(numberOfPokemon * (newPageNumber - 1));
            setLimit(numberOfPokemon);
            setBaseUrl(
                `https://pokeapi.co/api/v2/pokemon/?offset=${
                    numberOfPokemon * (newPageNumber - 1)
                }&limit=${numberOfPokemon}`,
            );
        });
    }, [history, limit, offset, pageNumber]);

    useEffect(() => {
        fetchPokedexUrls(baseUrl);
    }, [baseUrl, fetchPokedexUrls, pageNumber]);

    useEffect(() => {
        fetchPokedexPokemons(pokedexUrls);
    }, [pokedexUrls, fetchPokedexPokemons]);

    const previousPage = event => {
        event.preventDefault();
        if (pageNumber > 1) {
            history.push(`/page/${pageNumber - 1}`);
        }
    };

    const nextPage = event => {
        event.preventDefault();
        if (pageNumber < Math.ceil(808 / 20)) {
            history.push(`/page/${pageNumber + 1}`);
        }
    };

    return (
        <div className="pokedex">
            <PokedexSearchBar />
            {isFetchingPokedexUrls && (
                <>
                    <img
                        src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif"
                        alt="slowpoke"
                    ></img>
                    <p>Fetching Pokemon list...</p>
                </>
            )}
            {!isFetchingPokedexUrls && pokedexUrlsFetchError && (
                <p>{pokedexUrlsFetchError}</p>
            )}
            {isFetchingPokedexPokemons && (
                <>
                    <img
                        src="https://media.giphy.com/media/GTuchZPRzR3s4/source.gif"
                        alt="slowpoke"
                    ></img>
                    <p>Fetching Pokemons...</p>
                </>
            )}
            {!isFetchingPokedexPokemons && !pokedexPokemonsFetchError && (
                <>
                    {pageNumber !== 1 && (
                        <button
                            className="arrow-left"
                            onClick={previousPage}
                        ></button>
                    )}
                    {pageNumber !== Math.ceil(808 / 20) && (
                        <button
                            className="arrow-right"
                            onClick={nextPage}
                        ></button>
                    )}
                </>
            )}
            {!isFetchingPokedexPokemons && !pokedexPokemonsFetchError && (
                <>
                    <div className="card-container">
                        {pokedexPokemons.map((pokemon, index) => {
                            if (pokemon.id < 808) {
                                return (
                                    <PokedexCard key={index} data={pokemon} />
                                );
                            }
                            return null;
                        })}
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        isFetchingPokedexUrls: state.pokedexUrls.isFetchingPokedexUrls,
        pokedexUrls: state.pokedexUrls.pokedexUrls,
        pokedexUrlsFetchError: state.pokedexUrls.pokedexUrlsFetchError,
        isFetchingPokedexPokemons:
            state.pokedexPokemons.isFetchingPokedexPokemons,
        pokedexPokemons: state.pokedexPokemons.pokedexPokemons,
        pokedexPokemonsFetchError:
            state.pokedexPokemons.pokedexPokemonsFetchError,
    };
};

export default connect(mapStateToProps, {
    fetchPokedexUrls,
    fetchPokedexPokemons,
})(Pokedex);
