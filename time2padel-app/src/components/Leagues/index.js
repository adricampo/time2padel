import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import League from '../League'

export default function ({ error, onClose, onBack, onCreateLeague, leagues, onLeagueDetail, onGoToAddTeamToLeague }) {
    return <main className="leagues">
        <ul className="leagues__list">
            {leagues && leagues.map(league => <li className="league" key={league.id}><League league={league} onLeagueDetail={onLeagueDetail} onGoToAddTeamToLeague={onGoToAddTeamToLeague} /></li>)}
        </ul>
        <div className="leagues__buttons buttons">
            <div className="buttons__create-league create-league">
                <button className="create-league__button" onClick={event => {
                event.preventDefault()

                onCreateLeague()
            }}>Create League</button>
            </div>
            <div className="buttons__back-button back-button">
                <button className="back-button__button" onClick={event => {
                event.preventDefault()

                onBack()
            }}>Go Back</button>
            </div>
        </div>

        {error && <Feedback message={error} onClose={onClose} />}
    </main>
}