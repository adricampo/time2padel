const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { User } } = require('time2padel-data')
const bcrypt = require('bcryptjs')

/**
 * It calls the API to recover user info and then give the user the opportunity to modify the username & password.
 * 
 * @param {string} id, user id
 * @param {string} username, user username
 * @param {string} password, user password
 */

export default function (id, username, password) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    if (username) {
        validate.string(username)
        validate.string.notVoid('username', username)
    }
    if (password) {
        validate.string(password)
        validate.string.notVoid('password', password)
    }

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        const update = {}
   
        username && (update.username = username)
        password && (update.password = password)

        if (password) {
            const hash = await bcrypt.hash(password, 10)
            update.password = hash
        }
    
        await User.updateOne({ _id: id }, { $set: update })

    })()
}