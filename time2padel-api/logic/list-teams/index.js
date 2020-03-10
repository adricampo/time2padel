const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { User, Team } } = require('time2padel-data')

/**
 * It calls the API to return the list of teams.
 * 
 * @param {string} id, user id
 */

module.exports = function (id) { 
    validate.string(id)
    validate.string.notVoid('id', id)
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => { 
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} not found`)

        await Team.updateMany({ player1: id })
        
        const teams = await Team.find({ player1: id }, { __v: 0 }).populate('player1', 'name surname username').populate('player2','name surname username').lean()

        teams.forEach(team => {
            team.id = team._id.toString()
            delete team._id
            delete team.player1._id
            delete team.player2._id
            team.id = id
        })

        return teams
    })()
}