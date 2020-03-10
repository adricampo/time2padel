const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { Team } } = require('time2padel-data')

/**
 * 
 * TODO
 * 
 */

export default function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => {
        const team = await Team.findById(id)
        if (!team) throw new NotFoundError(`team ${id} not found`)
        await team.save()
        
        const { leagues } = team.toObject()
        return { leagues }
    
    })()
}