import { createReducer } from 'redux-from-void'
import { productInitialized } from '../actions'
import { OrganizationType, ProductType, ResponseProductDTO, TrustLevel } from '../dto/Product'


export interface ProductState {
    imageSrc: string
    productName: string
    productId: number | null
    positionId: number | null
    organizationName: string
    organizationId: number | null
    properties: string[]
    isProtectedDeal: boolean
    price: number | null
    bookmarks: boolean
    clientCount: number | null
    trust: TrustLevel | null
    productDescription: string
    organizationType: OrganizationType | null
    organizationDescription: string
    location: string
    similarProducts: {
        imageSrc: string
        organizationName: string
        type: ProductType
        isProtectedDeal: boolean
        clientCount: number
        trust: TrustLevel
        organizationDescription: string
        score: number
        price: number
        productDescription: string
        positionId: number
    }[] | null
}

const initialState : ProductState = {
    imageSrc: '',
    productName: '',
    productId: null,
    positionId: null,
    organizationName: '',
    organizationId: null,
    properties: [],
    isProtectedDeal: false,
    price: null,
    bookmarks: false,
    clientCount: null,
    trust: null,
    productDescription: '',
    organizationType: null,
    location: '',
    organizationDescription: '',
    similarProducts: null
}

export default createReducer(initialState)(
    productInitialized.success,
    (_: any, { payload } : { payload: ResponseProductDTO }) => ({
        ...payload
    }),

    productInitialized,
    initialState
)