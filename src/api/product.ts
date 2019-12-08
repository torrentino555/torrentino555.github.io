import {
    RequestProductDTO,
    RequestSimilarProductOffersDTO
} from '../dto/Product'
import { get } from './config'


export const getProduct = (postObj: RequestProductDTO) : Promise<RequestProductDTO> => get('/getProduct/' + postObj.positionId)
export const getSimilarProductOffers = (postObj: RequestSimilarProductOffersDTO) => get('/getSimilarProductOffers/' + postObj.positionId)