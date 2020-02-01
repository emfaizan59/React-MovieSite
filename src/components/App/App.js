import React from 'react';
import './App.css';
import { BrowserRouter, Route , Switch } from 'react-router-dom'
import Header from '../elements/Header/Header';
import Home from '../Home/Home';
import NotFound from '../NotFound/NotFound';
import Movie from '../Movie/Movie';

const App = () => {
    return    (
        
            <BrowserRouter>
            <React.Fragment>
            <Header />
            <Switch>
            <Route component={Home} path="/" exact />
            <Route component={Movie} path="/:movieId" exact />
            <Route component = {NotFound} />
            </Switch>
            </React.Fragment>
            </BrowserRouter>
        
    )
}


export default App;