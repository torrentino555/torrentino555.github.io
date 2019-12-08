import { call } from 'redux-saga/effects'
import * as api from '../api'
import { assertResponse } from '../errorHandling'
import * as actions from '../actions'
import { mapSearchToRedux } from './mappers'


export function * searching({ payload: query }: any) {
    try {
        const response = yield call(api.getSearch, query)

        assertResponse(response)

        yield call(actions.searching.success, { ...mapSearchToRedux(response.data) })
    } catch ({ message }) {
        yield call(actions.errorHandle.occur, message)
    }
}