import { all, takeLatest } from 'redux-saga/effects'

import * as actionCreators from '../actions'
import { productInitialized } from './product'
import { searching } from './search'


function * rootSaga() {
    yield all([
        takeLatest(actionCreators.productInitialized.type, productInitialized),
        takeLatest(actionCreators.searching.type, searching)
    ])
}

export default rootSaga