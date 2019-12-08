import * as React from 'react'

import './NotFound.css'
import { Link } from 'react-router-dom'
import { Routes } from '../../routing'
// import img from '../../images/img-not-found.svg'


class NotFound extends React.Component {
    render() {
        return (
            <div className="not-found">
                <div className="not-found__title">
                    <p>{ 'Страница не найдена' } <br/> { 'Вы можете вернуться ' }
                        <Link to={ Routes.HOME } className="message-link">
                            на главную
                        </Link>
                    </p>
                </div>

            </div>
        )
    }
}

export default NotFound