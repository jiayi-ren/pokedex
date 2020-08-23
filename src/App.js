import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import PokedexSearch from './components/PokedexSearch';
// import Home from './components/Home';
// import Navigation from './components/Navigation';
import Pokemon from './components/Pokemon';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="nav-title">
        <a href="/"><h1>P<div className="nav-pokeball"></div>kédex</h1></a>
        <div className="nav-anime"></div> {/*title pokemon gif*/}
      </div>
      {/* <Navigation /> */}
      <Route exact path="/pokemon/name/:name" component={Pokemon}></Route>
      <Route exact path="/pokemon/page/:page" component={Pokedex}></Route>
      <Route exact path="/pokemon/search" component={PokedexSearch}></Route>
      <Route exact path="/"><Redirect to="/pokemon/page/1" component={Pokedex}/></Route>
      <Footer />
    </div>
  );
}

export default App;
