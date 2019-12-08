import React, {useEffect} from 'react'

import './Products.css'
import ProductItem from './ProductItem'
import CompanyGroup from './CompanyGroup'
import {searching} from '../../actions'
import {OrganizationType} from '../../dto/Product'
import {useSelector} from 'react-redux'
import { selectSearchProducts} from '../../selectors/search'
import {filterByType} from '../../utils'


export default function Products() {
    useEffect(() => {
        searching('')
    },[ ])

    const products = useSelector(selectSearchProducts)

    return (
        <div className="products">
            { Object.values(products).map((product) => {
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
