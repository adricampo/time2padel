// const call = require('../../utils/call')
// const { validate, errors: { CredentialsError, NotFoundError } } = require('time2padel-util')
// const API_URL = process.env.REACT_APP_API_URL

// module.exports = function (teamId) {
//     validate.string(teamId)
//     validate.string.notVoid('teamId', teamId)
//     return (async () => { 
//         const res = await call(`${API_URL}/teams`, {
//             method: 'DELETE',
//             body: JSON.stringify({ teamId })
//         })

//         if (res.status === 200)  return
          
//         if (res.status === 404) throw new CredentialsError(JSON.parse(res.body).message)
        
//         if (res.status === 409) throw new NotFoundError(JSON.parse(res.body).message)

//         throw new Error(JSON.parse(res.body).message)
//     })()

// }