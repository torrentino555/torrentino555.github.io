import { createBrowserHistory, History } from 'history'
import { applyMiddleware, createStore, combineReducers, DeepPartial } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'

import * as reducers from './reducers'
import { State } from './reducers'
import rootSaga from './sagas'
import { wrap } from './actions'


export const history = createBrowserHistory()
const composeEnhancers = composeWithDevTools({})
const sagaMiddleware = createSagaMiddleware()

const createRootReducer = (history: History) => combineReducers<any>({
    router: connectRouter(history),
    ...reducers
})

export default function configureStore(preloadedState? : DeepPartial<State>) {
    const store = wrap(createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancers(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                sagaMiddleware
            )
        )
    ))

    sagaMiddleware.run(rootSaga)

    return { store }
}