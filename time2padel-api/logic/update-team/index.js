const { validate, errors: { NotFoundError, ConflictError } } = require('time2padel-util')
const { models: { User, Team } } = require('time2padel-data')

/**
 * It calls the API to recover the user related to the id, the team associated to the teamId and then an answer is written to follow one 
 * of the options we have: true = ACCEPTED team, false = DENNIED team.
 * 
 * @param {string} id, user id
 * @param {string} teamId, team id
 * @param {string} answer, answer provided by the user 
 * 
 */

module.exports = function (id, teamId, answer) {
    validate.string(teamId)
    validate.string.notVoid('teamId', teamId)

    // validate.boolean(answer)

    return (async () => { 
        const user = await User.findById(id)
        if (!user) throw new NotFoundError(`user not exists`)
        const team = await Team.findById(teamId)
        if (!team) throw new NotFoundError(`team not exists`)

        if (team.status === 'PENDING') {
            let status 
            if (answer === 'true'){ 
                answer = true 
            } else {
                answer = false
            }

            answer ? status = 'ACCEPTED' :  status = 'DENNIED' 
            team.status = status
            
        } else {
            throw new ConflictError(`this team ${team.title} has already been accepted or dennied`)
        }
        await team.save() 
        return team
    })()
}