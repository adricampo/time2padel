const { validate, errors: { ConflictError } } = require('time2padel-util')
const { models: { League } } = require('time2padel-data')

/**
 * It calls the API to verificate if the league already exists or not. If not, it generates a new one with the combination of information
 * you write with the params below.
 * 
 * @param {string} level, league level from D (lower) to A (higher)
 * @param {string} gender, could be MALE or FEMALE
 * @param {string} date, the week day from Monday to Friday
 * @param {string} time, the hour of the day
 * 
 */

export default function (level, gender, date, time) {
    validate.string(level)
    validate.string.notVoid('level', level)

    validate.string(gender)
    validate.string.notVoid('gender', gender)

    validate.string(date)
    validate.string.notVoid('date', date)

    validate.string(time)
    validate.string.notVoid('time', time)
    
    return (async () => {
        const league = await League.findOne({ level, gender, date, time })

        if (league) throw new ConflictError(`This league already exists`)

        await League.create({ level, gender, date, time })
        
    })()
}