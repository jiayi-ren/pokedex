import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from "./store/reducers";

// import './index.css';
import './sass/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import Navigation from './components/Navigation';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>


    <Router>
      <Navigation />
      <Route exact path="/pokemon" component={App}/>
      <Route path="/" component={Home}></Route>

    </Router>
  </Provider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
