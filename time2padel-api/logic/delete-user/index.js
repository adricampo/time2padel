const { validate, errors: { NotFoundError, ConflictError, ContentError } } = require('time2padel-util')
const { ObjectId, models: { User } } = require('time2padel-data')

/**
 * 
 * TODO
 * 
 */

export default function (id) {
    validate.string(id, 'id')
    if (!ObjectId.isValid(id)) throw new ContentError(`${id} is not a valid id`)
    
    return (async () => {
        const user = await User.findById(id)

        if (!user) throw new NotFoundError(`user with id ${id} does not exist`)

        await User.deleteOne({ _id: id })

})()
}