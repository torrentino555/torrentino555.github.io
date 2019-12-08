import React, { useState } from 'react'
import cn from 'classnames'
import {isNil, min} from 'ramda'

import './CompanyGroup.css'
import Stars from '../../../common/Starts'
import { numberWithSpaces } from '../../../utils'
import {ICompany} from '../../../selectors/search'
import {NavLink} from 'react-router-dom'
import {mapTrustToTrustLevel} from '../../../sagas/mappers'

interface Props {
    title: string
    companies: ICompany[]
    price?: number
}

export default function CompanyGroup({title, companies, price}: Props) {
    const [ isActive, setIsActive ] = useState(false)

    const allPrices = companies.map((i) => i.price)
    const minPrice = !isNil(allPrices) && allPrices.length > 0 ? allPrices.reduce(min) : null
    const isViewMinPrice = !isNil(minPrice) && (!price || (price && price > minPrice))
    return (
        <div className={ cn('company-group', isActive && 'company-group_active') }>
            <div className="company-group__title">
                {title}
                {isViewMinPrice && (
                    <span className="company-group__better-offer">
                        лучшее предложение
                        <span className="company-group__better-price">{numberWithSpaces(minPrice!)} ₽</span>
                    </span>
                )}
            </div>
            { isActive && (
                <div className={cn("company-group__list", isActive && 'company-group__list_active')}>
                    {companies.map((company) => (
                        <Company company={company} key={company.id}/>
                    ))}
                </div>
            )}
            { companies.length > 0 && (
                <div className="company-group__spoiler" onClick={ () => setIsActive(!isActive) }>
                    {isActive ? 'Меньше' : 'Больше'}
                </div>
            )}
        </div>
    )
}

function Company({company}: {company: ICompany}) {
    const {name, price, score, trust, location} = company

    return (
        <div className="company">
            <NavLink className="offer__name" to={'/product/' + company.id }> {name} </NavLink>
            <Stars score={score}/>
            <div className="company__price">{numberWithSpaces(price)}</div>
            <div className="company__location">{location}</div>
            <div className="company__location">{ mapTrustToTrustLevel(trust) }</div>
        </div>
    )
}