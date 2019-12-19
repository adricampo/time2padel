const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 *  It calls the API to recover a user (using their id), and their teams.
 * 
 * @param {string} is, user id
 */

module.exports = function (token) {
    validate.string(token)
    validate.string.notVoid('token', token)


    return (async () => {
        const res = await call(`${API_URL}/users/teams`, {
            method: 'GET',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' 
            }
     
        })

        if (res.status === 200) {
            const user = JSON.parse(res.body)

            return user
        }
          
        if (res.status === 400) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}