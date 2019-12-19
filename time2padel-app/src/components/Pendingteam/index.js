import React from 'react'
import './index.sass'

export default function ({team, id, onConfirmTeam, onCancelTeam}) { 
    const {title, player1, player2, status} = team
    
    return <section className="pendingteam">
                {team && status === 'PENDING' && player2._id === id &&
                <>  <div className="pendingteam__box box">
                        <p className="box__title">You received an invitation from {player1.username}. Do you want to join team {title}? 🎾🎾</p>
                        <div className="box__buttons buttons">
                            <button className="buttons__confirm" onClick={event => {
                                event.preventDefault()

                                onConfirmTeam(team._id)
                            }}>Confirm</button>
                            <button className="buttons__cancel" onClick={event => {
                                event.preventDefault()

                                onCancelTeam(team._id)
                            }}>Cancel</button>
                        </div>                   
                    </div>
                </>}
            </section>
       
}