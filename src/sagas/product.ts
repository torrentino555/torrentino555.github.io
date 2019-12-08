import { call } from 'redux-saga/effects'

import * as api from '../api'
import * as actions from '../actions'
import { assertResponse } from '../errorHandling'
import { mapProductToRedux, mapSimilarProductsToRedux } from './mappers'


export function * productInitialized({ payload: positionId }: any) {
    try {
        const response = yield call(api.getProduct, { positionId })

        assertResponse(response)

        const similarProducts = yield call(api.getSimilarProductOffers,  { positionId })

        assertResponse(similarProducts)

        console.log(similarProducts.data)

        yield call(actions.productInitialized.success, {
            ...mapProductToRedux(response.data),
            similarProducts: mapSimilarProductsToRedux(similarProducts.data) })
    } catch ({ message }) {
        yield call(actions.errorHandle.occur, message)
    } finally {
    }
}