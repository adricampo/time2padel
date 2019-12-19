import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import PendingTeam from '../Pendingteam'

export default function ({error, onBack, teams, id , onConfirmTeam, onCancelTeam}) {
    return <section className="mypendingteams">
        <ul className="mypendingteams__box">
            {teams && teams.map(team => <li className="item" key={team.id}><PendingTeam team={team} id={id} onConfirmTeam={onConfirmTeam} onCancelTeam={onCancelTeam} /></li>)}
        </ul>
        <div className="mypendingteams__back-button back-button">
            <button className="back-button__button" onClick={event => {
            event.preventDefault()

            onBack()
        }}>Go Back</button>
        </div>

        {error && <Feedback message={error} />}
    </section>
}