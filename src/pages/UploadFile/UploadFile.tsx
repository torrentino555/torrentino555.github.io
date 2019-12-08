import React, { useState, Fragment } from 'react'
import { Redirect } from 'react-router'
import cn from 'classnames'

import './UploadFile.css'
import { Routes } from '../../routing'
import Modal from '../../common/Modal'
import SuccessLoadingAnimation from './SuccessLoadingAnimation'

interface UploadFileProps {
    isOpen: boolean
    onClose: any
}

export default function UploadFile({ isOpen, onClose } : UploadFileProps) {
    const [ needRedirect, setNeedRedirect ] = useState(false)
    const [ startAnimation, setStartAnimation ] = useState(false)
    const [ successAnimation, setSuccessAnimation ] = useState(false)

    if (needRedirect) {
        onClose()
        return <Redirect to={ Routes.PRODUCTS } />
    }

    return (
        <Modal
            closeOnDocumentClick={ true }
            closeOnEscape={ true }
            isOpen={ isOpen }
            onClose={ onClose }
        >
            <div className="upload-file">
                {
                    successAnimation ? (
                        <SuccessLoadingAnimation />
                    ) : (
                        <Fragment>
                            Загрузить отчёт для анализа возможной выгоды
                            <label className={cn("icon upload-file__label", startAnimation && 'upload-file__label_hide')}>
                                <input
                                    className="upload-file__input"
                                    type="file"
                                    placeholder="Загрузите файл"
                                    onChange={ onUpload }
                                />
                            </label>
                        </Fragment>
                    )
                }
            </div>
        </Modal>
    )

    function onUpload() {
        setStartAnimation(true)
        setTimeout(() => {
            setSuccessAnimation(true)
        }, 1000)
        setTimeout(() => {
            setNeedRedirect(true)
        }, 4000)
    }
}