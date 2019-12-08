import { State } from '../reducers'
import { OrganizationType, ProductType, TrustLevel } from '../dto/Product'


export interface ICompany {
    id: number
    name: string
    // рейтинг position у данного клиента
    score: number
    price: number
    trust: TrustLevel
    organizationType: OrganizationType
    clientCount: number
    location?: string
}

export interface ISearchItem {
    id: number
    score: number
    name: string
    type: ProductType
    companies: ICompany[]
}

export interface ISearch {
    [id :number]: ISearchItem
}

export function selectSearchProducts(state: State) {
    const { positions } = state.search

    if (!positions || (positions && positions.length === 0)) {
        return []
    }

    const products : ISearch = {}

    Object.values(positions).map(item => {
        if (!item.productId) {
            return {}
        }
        const company = {
            id: item.organizationId,
            name: item.organizationName,
            clientCount: item.clientCount,
            organizationType: item.organizationType,
            trust: item.trust,
            score: item.score*5,
            price: item.price,
            location: item.location
        }
        if (products.hasOwnProperty(item.productId)) {
            products[item.productId].companies.push(company)
        } else {
            products[item.productId] = {
                id: item.productId, name: item.productName, score: item.score, type: item.type, companies: [company]
            }
        }
        return {}
    })

    return Object.values(products)
}