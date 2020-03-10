const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * It calls the API to recover user info and then give the user the opportunity to modify the username & password.
 * 
 * @param {string} id, user id
 * @param {string} username, user username
 * @param {string} password, user password
 */

export default function (token, username, password) {
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(username)
    validate.string.notVoid('username', username)

    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const res = await call(`${API_URL}/users/update`, {
            method: 'PATCH',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ username, password })
        })

        if (res.status === 201)  return
          
        if (res.status === 400) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()

}