import React from 'react';
import { Route } from 'react-router-dom';

import Pokedex from './components/Pokedex';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Pokemon from './components/Pokemon';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">

          <Navigation />
          <Route exact path="/pokemon/:name" component={Pokemon}></Route>
          <Route exact path="/pokemon" component={Pokedex}></Route>
          <Route exact path="/" component={Home}></Route>
          <Footer />
    </div>
  );
}

export default App;
