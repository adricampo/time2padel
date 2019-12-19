const call = require('../../utils/call')
const { validate, errors: { NotFoundError } } = require('time2padel-util')
const API_URL = process.env.REACT_APP_API_URL

/**
 * It calls the API to recover leagues info and return all.
 */

module.exports = function () {
    return (async () => {
        const res = await call(`${API_URL}/leagues`, {
            method: 'GET',
        })

        if (res.status === 200) {
            const leagues = JSON.parse(res.body)
            return leagues
        }
        
        if (res.status === 404) throw new NotFoundError(JSON.parse(res.body).message)
        
        // if (res.status === 409) throw new NotFoundError(JSON.parse(res.body).message)

        throw new Error(JSON.parse(res.body).message)
    })()
}
