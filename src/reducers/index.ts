import { History } from 'history'

import errorHandle, { ErrorHandleState } from './ErrorHandle'
import product, { ProductState } from './Product'
import search, { SearchState } from './Search'


export interface State {
    router: { history: History }
    errorHandle: ErrorHandleState,
    product: ProductState
    search: SearchState
}

export {
    errorHandle,
    product,
    search
}