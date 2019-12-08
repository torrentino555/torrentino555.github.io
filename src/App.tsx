import React from 'react';
import { Route, Switch, Redirect } from 'react-router'

import './App.css';
import './api/config'
import { Routes } from './routing'
import Products from './pages/Products'
import Product from './pages/Product'
import { Header } from './common/Header'
import { NotFound } from './pages/NotFound'
import Footer from './common/Footer'
import Search from './pages/Search'


export default function App() {
    return (
        <div className="app">
            <div>
                <Header/>
                <div className="wrapper">
                    <Switch>
                        <Route exact path={ Routes.HOME } component={ Products }/>
                        <Route exact path={ Routes.PRODUCTS } component={ Products }/>
                        <Route exact path={ Routes.PRODUCT } component={ Product }/>
                        <Route exact path={ Routes.SEARCH } component={ Search }/>
                        <Route exact path={ Routes.NOT_FOUND } component={ NotFound }/>
                        <Redirect to={Routes.NOT_FOUND}/>
                    </Switch>
                </div>
            </div>
            <Footer />
        </div>
    )
}
