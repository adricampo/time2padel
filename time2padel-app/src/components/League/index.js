import React from 'react'
import './index.sass'
export default function ({league, onLeagueDetail, onGoToAddTeamToLeague}) { 
    const { _id: leagueId, level, gender, date, time, teams, status, playingDays, startDate } = league
    return <div className="league">
                <div className="league__container container">
                    <a className="container__item"><img className="container__img" src={process.env.PUBLIC_URL + '/img/iconopelotapadel.png'}/><p>Level {level}/{date} {time}/Teams:{teams.length}</p></a>
                    <div className="container__buttons buttons">
                        <button className="buttons__addteamtoleague" onClick={event => {
                            event.preventDefault()
                            
                            onGoToAddTeamToLeague(leagueId)
                        }}>Add Team</button> 
                        <button className="buttons__leaguedetail" onClick={event => {
                            event.preventDefault()

                            onLeagueDetail(leagueId)
                        }}>League Detail</button>
                    </div>
                </div>
            </div>
}