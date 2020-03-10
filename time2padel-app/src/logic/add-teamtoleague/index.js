const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * This function add a team to a league, using the id's of each one searched in the API. The team should be validated (status: ACCEPTED), and the league should have availability,
 * that means to have less than 6 teams (status: AVAILABLE). If you add the 6th team and the league status change to COMPLETED, an schedule is generated showing the
 * playingdays with the corresponding matches and the teams involved in each match. 
 * 
 * @param {string} leagueId, the id of the league
 * @param {string} teamId, the id of the team 
 */

export default function (leagueId, teamId) {
    validate.string(leagueId)
    validate.string.notVoid('leagueId', leagueId)

    validate.string(teamId)
    validate.string.notVoid('teamId', teamId)

    return (async () => {
        const res = await call(`${API_URL}/leagues/${leagueId}/team/${teamId}`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            }
        })

        if (res.status === 201)  return
          
        if (res.status === 400) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 409) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}