const { validate, errors: { NotFoundError } } = require('time2padel-util')
const { models: { Team, League, User } } = require('time2padel-data')

/**
 * 
 * TODO
 * 
 */

module.exports = function (leagueId) {
    validate.string(leagueId)
    validate.string.notVoid('leagueId', leagueId)

    return (async () => {
         const league = await League.findById(leagueId)
        if (!league) throw new NotFoundError(`league not found`)

        if (league.status !== 'COMPLETED') throw new Error(`League status not COMPLETED`)

        await Promise.all(league.teams.map(async teamId => {
            const team = await Team.findOne({ _id: teamId.toString() })
            if (!teamId) throw new NotFoundError(`Team with id ${teamId} not found on that league`)
            const p1 = await User.findOne({ _id: team.player1 })
            const p2 = await User.findOne({ _id: team.player2 })
            if (!p1) throw new NotFoundError(`player not found`)
            if (!p2) throw new NotFoundError(`player not found`)

            if (p1.leagues.includes(leagueId) === false) {
                p1.leagues.push(leagueId)
            }
            await p1.save()

            if (p2.leagues.includes(leagueId) === false) {
                p2.leagues.push(leagueId)
            }
            await p2.save()
        }))

    })()
}
