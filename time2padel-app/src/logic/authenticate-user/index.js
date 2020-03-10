const call = require('../../utils/call')
const { validate, errors: { CredentialsError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * It calls to the API and verificates the username & password. If credentials are OK, returns the id and the APP generates the token associated
 * 
 * @param {string} username, user username 
 * @param {string} password, user password
 */

export default function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const res = await call(`${API_URL}/users/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })

		if (res.status === 200) return JSON.parse(res.body).token
        
        if (res.status === 401) throw new CredentialsError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}