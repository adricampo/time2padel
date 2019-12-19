const call = require('../../utils/call')
const { validate, errors: { ConflictError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * It calls the API to recover user info, if user not exists creates a new one.
 * 
 * @param {string} name, user name
 * @param {string} surname, user surname
 * @param {string} email, user email
 * @param {string} username, user username
 * @param {string} password, user password 
 * @param {string} gender, user gender 
 */

module.exports = function (name, surname, username, gender, email, password) {
    validate.string(name)
    validate.string.notVoid('name', name)
    validate.string(surname)
    validate.string.notVoid('surname', surname)
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(gender)
    validate.string.notVoid('gender', gender)
    validate.string(email)
    validate.string.notVoid('e-mail', email)
    validate.email(email)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const res = await call(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, username, gender, email, password })
        })
        if (res.status === 201) return

        if (res.status === 409) throw new ConflictError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}