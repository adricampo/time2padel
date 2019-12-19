const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * It calls the API to recover a league by id.
 * 
 * @param {string} leagueId, league id 
 */

module.exports = function (leagueId) { 
    validate.string(leagueId)
    validate.string.notVoid('leagueId', leagueId)

    return (async () => { 
        const res = await call(`${API_URL}/leagues/${leagueId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (res.status === 200) {
            const league = JSON.parse(res.body)

            return league
        }

        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)
            
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}