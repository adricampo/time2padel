const { validate, errors: { NotFoundError } } = require('time2padel-util')
const { ObjectId, models: { Team } } = require('time2padel-data')

/**
 * It calls the API to get info about a concrete team searched by title. 
 * 
 * @param {title} title, team title 
 */

module.exports = function (title) {
    validate.string(title)
    validate.string.notVoid('title', title)

    return (async () => {
        const team = await Team.findOne({title})
        if (!team) throw new NotFoundError(`Team ${title} not found`)
        await team.save()

        const { id, title: _title, player1, player2, wins, loses, status, leagues } = team
        return { id, title: _title, player1, player2, wins, loses, status, leagues }
    })()
}