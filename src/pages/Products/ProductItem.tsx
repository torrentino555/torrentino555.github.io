import React from 'react'

import './ProductItem.css'
import {TrustLevel} from '../../dto/Product'
import {ISearchItem} from '../../selectors/search'

export default function ProductItem({product}: {product: ISearchItem}) {
    const {name, type} = product

    const productName = "ИП Лепа"
    const location = 'Москва'
    return (
        <div className="product-item">
            <div className="product-item__header">
                <div className="product-item__left">
                    <div className="product-item__title text-ellipsis" >
                        {name}
                    </div>
                    {/*<div className="product-item__people">*/}
                    {/*    <PeopleIcon className="people-icon"/>*/}
                    {/*    { clientCount > 1 && (<sp an className="people-count">x{clientCount}</span>)}*/}
                    {/*</div>*/}
                </div>
                {/*<div className="product-item__right">*/}
                {/*    <Stars score={score} isWhite/>*/}
                {/*</div>*/}
            </div>
            <div className="product-item__content">
                <div className="product-item__icon"/>
                <div className="product-item__name-wrapper">
                    <div className="product-item__content-title">{productName}</div>
                    <div className="product-item__type">{type}</div>
                </div>
                <div className="product-item__location-wrapper">
                    <div className="product-item__content-title">МЕСТОПОЛОЖЕНИЕ</div>
                    <div className="product-item__location">{location}</div>
                </div>
                <div className="product-item__location-wrapper">
                    <div className="product-item__content-title">РЕЙТИНГ ДОВЕРИЯ</div>
                    <div className="product-item__location">{TrustLevel.HIGH}</div>
                </div>
            </div>
        </div>
    )
}