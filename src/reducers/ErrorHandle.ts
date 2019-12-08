import { createReducer } from 'redux-from-void'
import { errorHandle } from '../actions'


export interface ErrorHandleState {
    error: string | null
}

const initialState : ErrorHandleState = {
    error: null
}

export default createReducer(initialState)(
    errorHandle.occur,
    (_: any, { payload: error } : { payload: string }) => ({
        error
    }),

    errorHandle.clear,
    initialState
)