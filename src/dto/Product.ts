export interface ResponseProductDTO {
    imageSrc: string
    productDescription: string
    organizationImageSrc: string
    productName: string
    productId?: number
    positionId?: number
    organizationName: string
    organizationId: number
    properties: string[]
    protectedDeal: boolean
    price: number
    bookmarks: boolean
    clientCount: number
    trust: TrustLevel
    type: ProductType
    organizationType: OrganizationType
    organizationDescription: string
    score: number
    location: string
    productImageSrc: string
}

export enum OrganizationType {
    ORG = "ORG",
    IP = "IP",
    SAM = "SAM'"
}

export enum TrustLevel {
    LOW = 'Ненадёжный',
    MEDIUM = 'Нейтральный',
    HIGH = 'Надёжный'
}

export enum ProductType {
    PRODUCT = 'Продукт',
    SERVICE = 'Услуга'
}

export interface ResponseSimilarProductsDTO {
    positions: ResponseProductDTO[]
}

export interface RequestSimilarProductOffersDTO {
    positionId: number
}

export interface RequestProductDTO {
    positionId: number
}