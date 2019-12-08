import React, {Fragment} from 'react'
import {times, identity} from 'ramda'
import cn from 'classnames'

import './Starts.css'
import { ReactComponent as StarIcon } from '../../images/icons/star.svg'
import { ReactComponent as FullStarIcon } from '../../images/icons/full-star.svg'

interface Props {
    score: number
    isWhite?: boolean
}

export default function Stars({score, isWhite}: Props) {
    return (
        <div className={cn("stars", isWhite && "stars-white")}>
            { times(identity, 5).map((i) => (
                    <Fragment key={i}>
                        {i < score ? (<FullStarIcon/>) : (<StarIcon/>)}
                    </Fragment>
                )
            )}
        </div>
    )
}