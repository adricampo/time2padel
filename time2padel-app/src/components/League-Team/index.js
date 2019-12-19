import React from 'react'
import './index.sass'

export default function ({team, onAddTeamToLeague, league}) { 
    const {_id: teamId, title, player1, player2, status} = team
    const { id: leagueId } = league
    return <section className="leagueteam">
                {team && status === 'ACCEPTED' &&
                <><div className="leagueteam__box box">
                        <h3 className="box__title">Team {title}</h3>
                        <div className="box__info info">
                            <div className="info__players">
                                <p className="info__player1">Player 1 {player1.username}</p>
                                <p className="info__player2">Player 2 {player2.username}</p>
                            </div>
                            <div className="info__button button">
                                <button className="button__addteam" onClick={event => {
                                event.preventDefault()

                                onAddTeamToLeague(leagueId, teamId)
                            }}>Add Team</button>
                            </div>
                        </div>
                    </div>
                    </>}
            </section>
}
