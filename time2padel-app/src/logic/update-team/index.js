const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * It calls the API to recover the user related to the id, the team associated to the teamId and then an answer is written to follow one 
 * of the options we have: true = ACCEPTED team, false = DENNIED team.
 * 
 * @param {string} id, user id
 * @param {string} teamId, team id
 * @param {string} answer, answer provided by the user 
 * 
 */

export default function (token, teamId, answer) { 
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(teamId)
    validate.string.notVoid('teamId', teamId)

    validate.string(answer)
    validate.string.notVoid('answer', answer)
 

    return (async () => { 
        const res = await call(`${API_URL}/teams/teamId`, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ teamId, answer })
        })

        if (res.status === 200)  return
          
        if (res.status === 404) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 409) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}