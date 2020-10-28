import React from 'react';

const Footer = props => {
    return (
        <div className="footer">
            <p>
                Created by{' '}
                <a href="https://github.com/jiayi-ren/pokedex">Jiayi Ren</a>,
                powered by <a href="https://pokeapi.co/">PokéApi</a>
            </p>
            <p>
                All content is © Nintendo, Game Freak, and The Pokémon Company.
            </p>
        </div>
    );
};

export default Footer;
