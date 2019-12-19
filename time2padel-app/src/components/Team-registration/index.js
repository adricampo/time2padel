import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import LeagueTeam from '../League-Team'

export default function ({ onBack, error, onClose, teams, onAddTeamToLeague, league }) { 
    return <section className="teamregistration">
                <ul className="teamregistration__box"> 
                    {teams && teams.map(team => <li className="leagueteam" key={team.id}><LeagueTeam team={team} onAddTeamToLeague={onAddTeamToLeague} league={league} /></li>)}
                </ul>
                <div className="teamregistration__back-button back-button">
                    <button className="back-button__button" onClick={event => {
                    event.preventDefault()

                    onBack()
                }}>Go Back</button>
                </div>

                {error && <Feedback message={error} onClose={onClose} />}
            </section> 
}