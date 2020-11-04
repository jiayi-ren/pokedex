import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useHistory, useRouteMatch } from 'react-router';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}();'"|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    const pokemonList = JSON.parse(window.sessionStorage.getItem('__a'));

    return pokemonList.filter(pokemon => regex.test(pokemon.name));
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return <span>{suggestion.name}</span>;
}

const PokedexSearchBar = props => {
    const history = useHistory();
    const match = useRouteMatch('/page/:page');

    const [value, setSearchValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleSubmitSearch = event => {
        event.preventDefault();

        if (value !== '') {
            history.push(`/pokemon?search=${value}`);
        } else {
            if (match) {
                history.push(`/page/${match.params.page}`);
            } else {
                history.goBack();
            }
        }
    };

    const onChange = (event, { newValue, method }) => {
        setSearchValue(newValue);
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: 'Search by Pokemon Number or Name',
        value,
        onChange: onChange,
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmitSearch} className="search-box">
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <button className="search-button"></button>
            </form>
        </div>
    );
};

export default PokedexSearchBar;
