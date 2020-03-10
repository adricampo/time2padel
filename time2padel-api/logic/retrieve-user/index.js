const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { User } } = require('time2padel-data')

/**
 * It calls the API and returns the users info associated to the id wrote.
 * 
 * @param {string} id, user id
 */

export default function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        await user.save()

        const { name, surname, username, gender, email } = user.toObject()

        return { id, name, surname, username, gender, email, username }
    })()
}