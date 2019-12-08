import React, { useState } from 'react'
import cn from 'classnames'

import { ReactComponent as HeartIcon } from '../../images/icons/heart.svg'
import { ReactComponent as HeartRedIcon } from '../../images/icons/heart-red.svg'

import './Cart.css'
import Button from '../../common/Button'
import { useSelector } from 'react-redux'
import { State } from '../../reducers'
import { getWordWithNumberInRightCase, numberWithSpaces } from '../../utils'
import { isNil } from 'ramda'

function Cart({lastPrice}: {lastPrice?: number}) {
    const {
        isProtectedDeal,
        bookmarks,
        productDescription,
        productName,
        organizationName,
        clientCount,
        trust,
        price
    } = useSelector<State, State['product']>(state => state.product)

    const [ isFull, setIsFull ] = useState(true)

    return (
        <div className="cart">
            <div className={cn("cart__content", !isFull && 'cart__content_hidden')}>
                <div className="cart__content-header">
                    <div>{ organizationName }</div>
                </div>
                <div className="cart__title">
                    { productName }
                </div>
                {
                    bookmarks ? (
                        <div className="cart__my-marks">
                            <HeartRedIcon className="heart"/>
                            <div>В закладках</div>
                        </div>
                    ) : (
                        <div className="cart__add-marks">
                            <HeartIcon className="heart"/>
                            <div>Добавить в закладки</div>
                        </div>
                    )
                }
                <div>{ productDescription }</div>
                <div onClick={ () => setIsFull(!isFull) } className="cart__description">{ isFull ? ('Скрыть') : ('Полное описание') }</div>
                <div className="cart__prices">
                    { !isNil(lastPrice) && <div className="cart__price-line">{ numberWithSpaces(lastPrice) + ' ₽' }</div> }
                    { !isNil(price) && <div className="cart__price">{ numberWithSpaces(price) + ' ₽' }</div> }
                </div>
            </div>
            <div className="cart__right">
                <div className="cart__actions">
                    <div className="cart__options">
                        {
                            !isNil(clientCount) && (
                                <div>
                                    { clientCount + ' ' + getWordWithNumberInRightCase(clientCount, [ 'клиент', 'клиента', 'клиентов' ]) }
                                </div>
                            )
                        }
                        <div>{ isProtectedDeal ? 'Без риска' : 'Есть риски' }</div>
                        {
                            trust && <div>{ trust }</div>
                        }
                    </div>
                    <div className="cart__buttons">
                        <Button onClick={ () => {
                            // TODO:
                        } } className="cart__submit">
                            Оформить
                        </Button>
                        <Button onClick={ () => {
                            // TODO:
                        } } className="cart__request">
                            Запросить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart