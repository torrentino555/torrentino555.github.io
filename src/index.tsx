import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker';
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'
import ErrorHandler from './pages/ErrorHandler'


const { store } = configureStore()


ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={ history }>
            <App/>
            <ErrorHandler />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();