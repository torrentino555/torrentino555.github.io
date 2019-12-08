import { isNil } from 'ramda'
import React, { useEffect } from 'react'
import queryString from 'query-string'
import { RouteComponentProps } from 'react-router'
import {useSelector} from 'react-redux'

import './Search.css'
import { searching } from '../../actions'
import {filterByType} from '../../utils'
import {OrganizationType} from '../../dto/Product'
import ProductItem from '../Products/ProductItem'
import CompanyGroup from '../Products/CompanyGroup'
import {selectSearchProducts} from '../../selectors/search'


interface Props extends RouteComponentProps<any> {

}

export default function Search({ location } : Props) {
    const parsedParams = queryString.parse(location.search)
    const { q } = parsedParams
    const isNotValidQuery = isNil(q) || q === ''

    useEffect(() => {
        if (!isNotValidQuery) {
            searching(q)
        }
    }, [ q, isNotValidQuery ])
    const products = useSelector(selectSearchProducts)

    if (isNotValidQuery) {
        return (
            <div className="search__empty-query">
                Введен пустой поисковый запрос
            </div>
        )
    }

    if (products.length === 0) {
        return (
            <div className="search__empty-query">
                Ничего не найдено
            </div>
        )
    }
    return (
        <div className="products">
            { products.map((product) => {
                const companiesOrg = filterByType(product.companies, OrganizationType.ORG)
                const companiesIP = filterByType(product.companies, OrganizationType.IP)
                const companiesSAM = filterByType(product.companies, OrganizationType.SAM)

                return (
                    <div className="products-item" key={product.id}>
                        <ProductItem product={product}/>
                        {companiesOrg.length > 0 && <CompanyGroup title="Организации" companies={companiesOrg}/> }
                        {companiesIP.length > 0 && <CompanyGroup title="Индивидуальные предприниматели" companies={companiesIP}/> }
                        {companiesSAM.length > 0 && <CompanyGroup title="Самозанятые" companies={companiesSAM}/> }
                    </div>
                )})
            }
        </div>
    )
}