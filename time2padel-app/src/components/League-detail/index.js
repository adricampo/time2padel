import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import DetailTeam from '../Detail-team'
import PlayingDay from '../Playingday'

export default function ({error, onClose, onBack, league}) { 
    const { playingDays, startDate, status, level, date, time, teams} = league
    let counter = 1
    return <section className="league-detail">
            <div className="league-detail__container container">
                <h2 className="container__league-info league-info">Level: {level} / {date} {time}</h2>
                <ul className="container__teams">
                    {teams && teams.map(team => <li className="teamdetail" key={team.id}><DetailTeam team={team} /></li>)}  
                </ul>
                <div className="container__status league-status">                
                    <p className="league-status__start-date">League Start Date: {startDate}</p>
                </div>
                <ul className="container__playingday">
                    {playingDays && playingDays.map(playingDay => <li className="playingday__box" key={playingDay.id}><h2 className="playingday__title">PLAYING DAY {counter++}</h2><PlayingDay playingDay={playingDay} /></li>)}  
                </ul>
                <div className="container__back-button back-button">
                    <button className="back-button__button" onClick={event => {
                        event.preventDefault()

                        onBack()
                    }}>Go Back</button>
                </div>
            </div>

            {error && <Feedback message={error} onClose={onClose} />}
    </section>
}