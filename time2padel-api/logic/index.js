const authenticateUser = require('./authenticate-user')
const registerUser = require('./register-user')
const retrieveUser = require('./retrieve-user')
const modifyUser = require('./modify-user')
// const deleteUser = require('./delete-user')
const createLeague = require('./create-league')
// const deleteLeague = require('./delete-league')
const retrieveLeagues = require('./retrieve-leagues')
const createTeam = require('./create-team')
const updateTeam = require('./update-team')
const deleteTeam = require('./delete-team')
// const retrieveTeam = require('./retrieve-team')
// const retrieveTeamByLeague = require('./retrieve-teambyleague')
const addTeamToLeague = require('./add-teamtoleague')
// const retrieveLeaguebyTeam = require('./retrieve-leaguebyteam')
const retrieveLeague = require('./retrieve-league')
// const retrieveTeamByLeague = require('./retrieve-teambyleague')
// const updateLeagueUsers = require('./update-leagueusers')
const retrieveUserTeams = require('./retrieve-userteams')
// const listTeams = require('./list-teams')


module.exports =  {
    authenticateUser,
    registerUser,
    retrieveUser,
    modifyUser,
    //deleteUser, 
    createLeague,
    //deleteLeague,
    retrieveLeagues,
    createTeam,
    updateTeam,
    deleteTeam,
    //retrieveTeam,
    //retrieveTeamByLeague,
    addTeamToLeague,
    //retrieveLeaguebyTeam,
    retrieveLeague,
    //retrieveTeamByLeague,
    //updateLeagueUsers,
    retrieveUserTeams,
    //listTeams
}