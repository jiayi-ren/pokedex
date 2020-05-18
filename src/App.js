import React from 'react';
import { Route } from 'react-router-dom';

import CardContainer from './components/CardContainer';
import Home from './components/Home';
import Navigation from './components/Navigation';
import Pokemon from './components/Pokemon';
import './App.css';

function App() {
  return (
    <div className="App">

          <Navigation />
          <Route exact path="/pokemon/:name" component={Pokemon}></Route>
          <Route exact path="/pokemon" component={CardContainer}></Route>
          <Route exact path="/" component={Home}></Route>
          
    </div>
  );
}

export default App;
