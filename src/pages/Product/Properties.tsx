import React from 'react'

import './Properties.css'
import { useSelector } from 'react-redux'
import { State } from '../../reducers'


export default function Properties() {
    const propertiesList =
        useSelector<State, string[]>(state => state.product.properties)

    return (
        <div className="properties">
            <h1 className="properties__header">
                Характеристики
            </h1>
            {
                propertiesList.map(item => (
                    <div key={item} className="properties__list-item">{ item }</div>
                ))
            }
        </div>
    )
}