import React from 'react'
import './index.sass'

export default function ({team}) { 
    const {title, player1, player2, status} = team
    return <section className="team">
                {team && status === 'ACCEPTED' &&
                <><div className="team__box box">
                        <h3 className="box__title">Team {title}</h3>
                        <div className="box__info info">
                            <p className="info__player1">Player 1 {player1.username}</p>
                            <p className="info__player2">Player 2 {player2.username}</p>
                        </div>
                    </div>
                    </>}
            </section>
}
