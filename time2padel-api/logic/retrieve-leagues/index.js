const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { League } } = require('time2padel-data')

/**
 * It calls the API to recover leagues info and return all.
 */

module.exports = function () {
    return (async () => {
        const leagues = await League.find().lean()
        if (!leagues) throw new NotFoundError(`no leagues on that moment`)

        return leagues
    })()
}
