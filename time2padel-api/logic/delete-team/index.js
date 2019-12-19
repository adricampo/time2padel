const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { Team } } = require('time2padel-data')

/**
 * 
 * TODO
 * 
 */

module.exports = function (teamId) {
    validate.string(teamId, 'teamId')
    if (!ObjectId.isValid(teamId)) throw new ContentError(`${teamId} is not a valid id`)
    
    return (async () => {
        const team = await Team.findById(teamId)
        if (!team) throw new NotFoundError(`team not exist`)

        await Team.deleteOne({ _id: teamId })

    })()
}