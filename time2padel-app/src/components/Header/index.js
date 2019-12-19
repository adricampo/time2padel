import React, { useState } from 'react'
import './index.sass'

export default function ({onLogout, name, onUserInfo, onMyTeams, onLeagues, onMyPendingTeams}) {
    const [toggleMenu, setToggleMenu] = useState(false)

    function onToggleMenu() {
        setToggleMenu(!toggleMenu)        
    }

    return <header className="header">
                <img className="header__logo" src={process.env.PUBLIC_URL + '/img/iconopalapadel.png'}/>
                <h1 className="header__title">Time2Padel</h1>
                <span className="header__welcome">👋🏻 {name}</span>
                <input type="checkbox" id="show-menu"/>
                <label className="header__hamburguer" htmlFor="show-menu"><i onClick={onToggleMenu} className="fas fa-bars"></i></label>
                <nav className={toggleMenu ? 'header__nav nav-show' : 'header__nav nav'}>
                    <ul className="menu__list list">
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onToggleMenu(); onMyTeams()
                        }}>My Teams</a></li>
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onToggleMenu(); onMyPendingTeams()
                        }}>Requests</a></li>
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onToggleMenu(); onUserInfo()
                        }}>User Info</a></li>
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onToggleMenu(); onLeagues()
                        }}>Leagues</a></li>
                        <li><a href="#" className="list__item" onClick={event => {
                        event.preventDefault()

                        onLogout()
                        }}>Logout</a></li>
                    </ul>
                </nav>
            </header>
}