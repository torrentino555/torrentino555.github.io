import { createReducer } from 'redux-from-void'
import { ResponseProductDTO } from '../dto/Product'
import { searching } from '../actions'


export interface SearchState {
    positions: ResponseProductDTO[]
}

const initialState : SearchState = {
    positions: []
}

export default createReducer(initialState)(
    searching.success,
    (_: any, { payload } : { payload: any }) => ({
        positions: { ...payload }
    }),
)