import { ResponseProductDTO, ResponseSimilarProductsDTO, TrustLevel } from '../dto/Product'


export function mapSearchToRedux(searchObj: any) {
    return searchObj
}

export function mapSimilarProductsToRedux(positions : ResponseSimilarProductsDTO['positions']) {
    return positions.map(item => ({
        ...item,
        imageSrc: item.organizationImageSrc,
        isProtectedDeal: item.protectedDeal,
        trust: mapTrustToTrustLevel(item.trust)
    }))
}

export function mapProductToRedux({
    trust,
    protectedDeal,
    ...rest
}: ResponseProductDTO) : any {
    return {
        ...rest,
        isProtectedDeal: protectedDeal,
        trust: mapTrustToTrustLevel(trust)
    }
}

export function mapTrustToTrustLevel(trust: string) : TrustLevel {
    switch (trust) {
        case 'LOW':
            return TrustLevel.LOW
        case 'MEDIUM':
            return TrustLevel.MEDIUM
        case 'HIGH':
            return TrustLevel.HIGH
        default:
            throw new Error("Bad trust from server")
    }
}