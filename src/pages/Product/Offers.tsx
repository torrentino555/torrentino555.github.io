import React from 'react'

import './Offers.css'
import { useSelector } from 'react-redux'
import { selectCheapestAndRecommendedOffer } from '../../selectors/product'
import { State } from '../../reducers'
import { isNil } from 'ramda'
import { numberWithSpaces } from '../../utils'
import { OrganizationType } from '../../dto/Product'

function Offers() {
    const { cheapest, recommended } = useSelector<State, any>(selectCheapestAndRecommendedOffer)

    if (isNil(cheapest) || isNil(recommended)) {
        return null
    }

    return (
        <div className="offers">
            <div className="offer">
                <div className="offer__title">БОЛЕЕ ДЕШЁВОЕ ПРЕДЛОЖЕНИЕ</div>
                <Offer
                    price={ cheapest.price }
                    description={ cheapest.organizationDescription }
                    avatarSrc={ cheapest.imageSrc }
                    name={ cheapest.name }
                    type={ cheapest.organizationType }
                    features={ cheapest.features }
                />
            </div>
            <div className="offer">
                <div className="offer__title">РЕКОМЕНДУЕМОЕ ПРЕДЛОЖЕНИЕ</div>
                <Offer
                    price={ recommended.price }
                    description={ recommended.organizationDescription }
                    avatarSrc={ recommended.imageSrc }
                    name={ recommended.name }
                    type={ recommended.organizationType }
                    features={ recommended.features }
                />
            </div>
        </div>
    )
}

interface OfferProps {
    name: string
    type: string
    features: string[]
    avatarSrc: string
    description: string
    price: number
}

function Offer(props: OfferProps) {
    const {name, type, features, avatarSrc, description, price} = props
    return (
        <div className="offer__content">
            <div className="offer__user">
                <img src={ avatarSrc } className="offer__icon" alt=""/>
                <div className="offer__user-content">
                    <div className="offer__name">{name}</div>
                    <div className="offer__type">{type}</div>
                </div>
            </div>
            <div className="offer__work">
                { description }
            </div>
            <div className="offer__feature">
                <div className="offer__feature-title">Особенности</div>
                <div className="offer__feature-options">
                    { features.map((feature) =>
                        <div key={feature}>{feature}</div>
                    )}
                </div>
            </div>
            <div className="offer__price">
                { numberWithSpaces(price) + ' ₽' }
            </div>
        </div>
    )
}


export default Offers