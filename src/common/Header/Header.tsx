import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import './Header.css'
import Button from '../Button'
import { empty } from '../../utils'
import { UploadFile } from '../../pages/UploadFile'
import { Routes } from '../../routing'
import { useSelector } from 'react-redux'
import { selectLocation } from '../../selectors/routes'
import queryString from 'query-string'
import { isNil } from 'ramda'
import {RouteComponentProps, withRouter} from 'react-router'


function Header({history}: RouteComponentProps) {
    const [ searchInFocus, setSearchInFocus ] = useState(false)
    const [ uploadIsOpen, setUploadIsOpen ] = useState(false)
    const [ query, setQuery ] = useState<string>('')
    const location = useSelector(selectLocation)

    const parsedParams = queryString.parse(location.search)
    const { q } = parsedParams

    useEffect(() => {
        if (location.pathname.indexOf('search') !== -1 && !isNil(q) && q !== '' && typeof q === 'string') {
            setQuery(q)
        }
    }, [ location.pathname, q ])

    return (
        <div className="header">
            <div className="header__center">
                <div className="header__left-panel">
                    <div className="header__logo" onClick={ () => history.push(Routes.PRODUCTS)} />
                    <input
                        value={ query }
                        onChange={ event => setQuery(event.target.value) }
                        onFocus={ () => setSearchInFocus(true) }
                        onBlur={ () => setSearchInFocus(false)}
                        className={cn("header__search", searchInFocus && "header__search_focus")}
                        placeholder="Поиск"
                        onKeyDown={ event => {
                            if (event.key === 'Enter' && query !== '') {
                                window.location.href = Routes.SEARCH + '?q=' + query
                            }
                        } }
                    />
                    <div className={cn('header__buttons', searchInFocus && 'header__buttons_hide')}>
                        <RedButton
                            text={ 'Загрузить отчёт' }
                            onClick={ () => setUploadIsOpen(true) }
                        />
                        <RedButton text={ 'продавай с нами' }/>
                        <RedButton
                            text={ 'интернет-банк' }
                            className="header-red-button__with-arrow"
                        />
                    </div>
                </div>
                <div className="header__user-container">
                    <div className="header__user-text">
                        ИП ТЕСЛА<br/>
                        Илон Маскович
                    </div>
                    <div className="header__user-circle" />
                    <div className="header__user-back">
                        <div className="icon header__user-back-icon" />
                        Выйти
                    </div>
                </div>
            </div>
            <UploadFile isOpen={ uploadIsOpen } onClose={ () => setUploadIsOpen(false) } />
        </div>
    )
}

export default withRouter(Header)

interface RedButtonProps {
    text: string
    onClick?: any
    className?: any
}

function RedButton({ text, onClick = empty, className } : RedButtonProps) {
    return (
        <Button
            className={cn('header-red-button', className)}
            onClick={ onClick }>
            { text }
        </Button>
    )
}