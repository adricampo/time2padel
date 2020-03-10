const call = require('../../utils/call')
const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

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
        const res = await call(`${API_URL}/leagues`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ level, gender, date, time })
        })

        if (res.status === 201)  return
          
        if (res.status === 400) throw new CredentialsError(JSON.parse(res.body).message)
        
        if (res.status === 409) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}