import React from 'react'
import { useSelector } from 'react-redux'
import { isNil } from 'ramda'

import closeIcon from '../../images/icons/close.svg'
import './ErrorHandler.css'
import { State } from '../../reducers'
import Modal from '../../common/Modal'
import Button from '../../common/Button'
import { errorHandle } from '../../actions'


export default function ErrorHandler() {
    const error = useSelector<State, string | null>(state => state.errorHandle.error)

    if (isNil(error)) {
        return null
    }

    return (
        <Modal isOpen={ true }>
            <div className="modal-content__failure-result">
                <img src={ closeIcon } alt="close-icon"/>
                <div className="modal-content__failure-text">{ error }</div>
                <Button onClick={ () => errorHandle.clear() } className="step-modal__failure-close-button">
                    Закрыть
                </Button>
            </div>
        </Modal>
    )
}