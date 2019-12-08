import React, {useEffect} from 'react'
import { isNil } from 'ramda'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import queryString from 'query-string'

import './Product.css'
import { MAX_ID } from '../../constants'
import { NotFound } from '../NotFound'
import {productInitialized} from '../../actions'
import Cart from './Cart'
import Offers from './Offers'
import Properties from './Properties'

type Params = { positionId?: string }

interface Props extends RouteComponentProps<any> {
}

function Product({ match: { params }, location }: Props) {
    useEffect(() => {
        if (isValidParams(params)) {
            productInitialized(params.positionId)
        }
    }, [ params ])

    if (!isValidParams(params)) {
        return <NotFound/>
    }

    let numberLastPrice
    const parsedParams = queryString.parse(location.search)
    if (parsedParams.startPrice) {
        const startPrice = parsedParams.startPrice
        if (typeof (startPrice) === 'string') {
            const parsedStartPrice = parseInt(startPrice)
            if (!isNaN(parsedStartPrice)) {
                numberLastPrice = parsedStartPrice
            }
        }
    }
    return (
        <div className="product">
            <Cart lastPrice={numberLastPrice}/>
            <Offers/>
            <Properties />
        </div>
    )
}

function isValidParams({positionId}: Params){
    if (isNil(positionId)) {
        return false
    }
    const parsedPositionId = parseId(positionId)
    return !isNil(parsedPositionId)
}

function parseId(value: string) {
    const parseId = parseInt(value)
    if (!isNaN(parseId) && parseId < MAX_ID) {
        return parseId
    }
    return null
}
export default withRouter(Product)