const { validate, errors: { NotFoundError, ContentError } } = require('time2padel-util')
const { models: { League, Team } } = require('time2padel-data')

/**
 * It calls the API to recover a league by id.
 * 
 * @param {string} leagueId, league id 
 */

module.exports = function (leagueId) { 
    validate.string(leagueId)
    validate.string.notVoid('leagueId', leagueId)

    return (async () => { 
        const league = await League.findById(leagueId).populate({
            path: 'teams',
            model: 'Team',
            populate: {
                path : 'player1 player2',
                model: 'User'
            }
        })

        if (!league) throw new NotFoundError(`League not found`)

        await league.save()
       
        const { _id: id, level, date, time, teams, status, playingDays, startDate } = league.toObject()

        await Promise.all(playingDays.map(async playingDay => {
            await Promise.all(playingDay.matches.map(async match =>{
                match.teams[0] = await Team.findOne({ _id: match.teams[0]})
                match.teams[1] = await Team.findOne({ _id: match.teams[1]})
            }))
            
        }))
        
        return { id, level, date, time, teams, status, playingDays, startDate }
    })()
}