const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * It calls the API to return the list of teams.
 * 
 * @param {string} id, user id
 */

module.exports = function (token) { 
    validate.string(token)
    validate.string.notVoid('token', token)

    return (async () => {
        const res = await call(`${API_URL}/teams`, {
            method: 'GET',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
        })

        if (res.status === 200) {
            const teams = JSON.parse(res.body)
            return teams
        }
          
        if (res.status === 404) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 409) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}