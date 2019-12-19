import React from 'react'
import './index.sass'
export default function ({team}) { 
    const {title, player1, player2} = team
    return <div className="detailteam">
                <p className="detailteam__title">Team: {title}</p>
                <p className="detaiteam__players">{player1.username} {player2.username}</p>
            </div>
}