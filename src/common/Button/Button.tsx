import React, { MutableRefObject } from 'react'
import cn from 'classnames'

import './Button.css'
import { empty } from '../../utils'


interface Props {
    className: string
    onClick: Function
    children?: any
    disabled: boolean
    inputRef?: MutableRefObject<HTMLButtonElement | null>
    style?: HTMLStyleElement
    onMouseDown?: () => void
    isPreventDefault: boolean
    name?: string
    isSubmit: boolean
}


export default function Button(props: Props) {
    const { children, className, onClick, inputRef, isPreventDefault, isSubmit, ...rest } = props

    const newProps: any = {
        onClick: (e: any) => {
            isPreventDefault && e.preventDefault()
            e.target.blur()
            onClick()
        }
    }

    return (
        <button
            type={ isSubmit ? 'submit' : undefined }
            className={ cn(className, 'button') }
            ref={ inputRef }
            { ...newProps }
            { ...rest }
        >
            { children }
        </button>
    )
}

Button.defaultProps = {
    disabled: false,
    onClick: empty,
    className: '',
    isPreventDefault: false,
    isSubmit: false
}