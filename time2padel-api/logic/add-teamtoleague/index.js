const { validate } = require('time2padel-util')
const { models: { Team, League, PlayingDay, Match } } = require('time2padel-data')
const robin = require('../../helpers/round-robin');

/**
 * This function add a team to a league, using the id's of each one searched in the API. The team should be validated (status: ACCEPTED), and the league should have availability,
 * that means to have less than 6 teams (status: AVAILABLE). If you add the 6th team and the league status change to COMPLETED, an schedule is generated showing the
 * playingdays with the corresponding matches and the teams involved in each match. 
 * 
 * @param {string} leagueId, the id of the league
 * @param {string} teamId, the id of the team 
 */

export default function (leagueId, teamId) {
    validate.string(leagueId)
    validate.string.notVoid('leagueId', leagueId)

    validate.string(teamId)
    validate.string.notVoid('teamId', teamId)
    return (async () => {
        const league = await League.findById(leagueId)
        if (!league) throw new NotFoundError(`league with id ${leagueId} not found`)
        const addTeam = await Team.findById(teamId)
        if (!addTeam) throw new NotFoundError(`league with id ${addTeam} not found`)

        if (addTeam.status !== 'ACCEPTED') throw new Error(`You should validate your team ${addTeam.id} to continue`)
        if (league.teams.length >= 6) throw new Error(`Sorry, this league is complete`)
        if (league.teams.toString().includes(addTeam._id.toString())) throw new Error (`This team has been already registered on that league`)

        league.teams.push(teamId)
        addTeam.leagues.push(leagueId)

        if (league.teams.length === 6) {
            league.status = 'COMPLETED'
            const myTeams = league.teams.map(team => team._id.toString())

            let schedule = robin(myTeams)

            for (let i = 0; i < schedule.length; i++) {
                const playingDay = new PlayingDay
                for (let j = 0; j < schedule[i].length; j++) {
                    const match = new Match
                    match.teams.push(schedule[i][j][0], schedule[i][j][1])
                    playingDay.matches.push(match)
                }
                league.playingDays.push(playingDay)
            }
            league.startDate = new Date
           
        }
        await addTeam.save()
        await league.save()

    })()
}