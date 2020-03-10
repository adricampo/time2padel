const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { User } } = require('time2padel-data')

/**
 *  It calls the API to recover a user (using their id), and their teams.
 * 
 * @param {string} is, user id
 */

export default function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => { 
        const user = await User.findById(id).populate({
            path: 'teams',
            model: 'Team',
            populate: {
                path : 'player1 player2',
                model: 'User'
            }
        })

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        const { teams } = user
        
        return teams

    })()
}