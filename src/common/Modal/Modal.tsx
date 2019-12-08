import React from 'react'
import Popup from 'reactjs-popup'

import './Modal.css'


interface Props {
    trigger?: JSX.Element | ((isOpen: boolean) => JSX.Element)
    children: JSX.Element
    isOpen?: boolean
    closeOnDocumentClick?: boolean
    closeOnEscape?: boolean
    onClose?: any
}


export default function Modal({
      trigger,
      isOpen,
      children,
      closeOnDocumentClick,
      closeOnEscape,
      onClose
}: Props) {

    return (
        <Popup
            modal
            className="modal"
            open={ isOpen }
            trigger={ trigger }
            closeOnDocumentClick={ closeOnDocumentClick }
            closeOnEscape={ closeOnEscape }
            onClose={ onClose }
        >
            { children }
        </Popup>
    )
}