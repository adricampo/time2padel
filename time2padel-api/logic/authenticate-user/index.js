const { validate, errors: { CredentialsError } } = require('time2padel-util')
const { models: { User } } = require('time2padel-data')
const bcrypt = require('bcryptjs')

/**
 * It calls to the API and verificates the username & password. If credentials are OK, returns the id and the APP generates the token associated
 * 
 * @param {string} username, user username 
 * @param {string} password, user password
 */

module.exports = function (username, password) {
    validate.string(username)
    validate.string.notVoid('username', username)
    validate.string(password)
    validate.string.notVoid('password', password)

    return (async () => {
        const user = await User.findOne({ username })
        if (!user) throw new CredentialsError('wrong username')
        
        const match = await bcrypt.compare(password, user.password)
        if(!match) throw new CredentialsError ('wrong password')

        return user.id
    })()
}