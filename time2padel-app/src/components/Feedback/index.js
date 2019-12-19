import React from 'react'
import './index.sass'

export default function({ message, onClose }) {
    return <section className="feedback"> 
        <div className="feedback__container">
            <i className="close fas fa-times" onClick={ event => {
                event.preventDefault()

                onClose()
            }}></i> 
            <span className="feedback__icon">❌</span>
            <p className="feedback__message">{message}</p>
            <span className="feedback__icon">❌</span>
        </div>
    </section>
}