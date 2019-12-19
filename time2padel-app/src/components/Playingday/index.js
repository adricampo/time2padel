import React from 'react'
import './index.sass'
export default function ({playingDay}) { 
    const { matches } = playingDay 
    return <> <div className="playingday">
                <div className="playingday__match match">
                    <p className="match__match-number">{matches[0].teams[0].title} VS {matches[0].teams[1].title}</p>
                    <p className="match__match-result">RESULT:    </p>
                </div>
                <div className="playingday__match match">
                    <p className="match__match-number">{matches[1].teams[0].title} VS {matches[1].teams[1].title}</p>
                    <p className="match__match-result">RESULT:    </p>
                </div>
                <div className="playingday__match match">
                    <p className="match__match-number">{matches[2].teams[0].title} VS {matches[2].teams[1].title}</p>
                    <p className="match__match-result">RESULT:    </p>
                </div>
            </div>  
        </>
}