const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * It calls the API to verificate if the team already exists or not. If not, it generates a new one
 * with status PENDING.
 * 
 * @param {string} id, user's id
 * @param {string} username, username of the user you want to play with
 * @param {title} title, team title
 * 
 */

module.exports = function (token, username, title) { 
    validate.string(token)
    validate.string.notVoid('token', token)

    validate.string(username)
    validate.string.notVoid('username', username)

    validate.string(title)
    validate.string.notVoid('title', title)


    return (async () => {
        const res = await call(`${API_URL}/teams`, {
            method: 'POST',
            headers: { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ username, title })
        })

        if (res.status === 201)  return
          
        if (res.status === 400) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 409) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}