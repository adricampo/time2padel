const { validate, errors: { NotFoundError } } = require('time2padel-util')
const { ObjectId, models: { League } } = require('time2padel-data')

/**
 * It calls the API to find a league, extracts the teams array inside and returns it.
 * 
 * @param {string} id, league id
 */

module.exports = function (id) {
    validate.string(id)
    validate.string.notVoid('id', id)

    return (async () => {
        const league = await League.findById(id)
        if (!league) throw new NotFoundError(`league ${id} not found`)
        await league.save()
        
        const { teams } = league.toObject()
        return { teams }
    
    })()
}