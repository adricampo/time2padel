const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { League } } = require('time2padel-data')

/**
 * 
 * TODO
 * 
 */

module.exports = function (id) {
    validate.string(id, 'id')
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)

    return (async () => {
        const league = await League.findById(id)

        if (!league) throw new NotFoundError(`league with id ${id} does not exist`)

        await League.deleteOne({ _id: id })

    })()
}