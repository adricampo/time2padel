import authenticateUser from './authenticate-user'
import registerUser from './register-user'
import retrieveUser from './retrieve-user'
import modifyUser from './modify-user'
import deleteUser from './delete-user'
import createLeague from './create-league'
import deleteLeague from './delete-league'
import retrieveLeagues from './retrieve-leagues'
import createTeam from './create-team'
import updateTeam from './update-team'
import deleteTeam from './delete-team'
import retrieveTeam from './retrieve-team'
import retrieveTeamByLeague from './retrieve-teambyleague'
import addTeamToLeague from './add-teamtoleague'
import retrieveLeaguebyTeam from './retrieve-leaguebyteam'
import retrieveLeague from './retrieve-league'
import retrieveTeamByLeague from './retrieve-teambyleague'
import updateLeagueUsers from './update-leagueusers'
import retrieveUserTeams from './retrieve-userteams'
import listTeams from './list-teams'


export default {
    authenticateUser,
    registerUser,
    retrieveUser,
    modifyUser,
    deleteUser, 
    createLeague,
    deleteLeague,
    retrieveLeagues,
    createTeam,
    updateTeam,
    deleteTeam,
    retrieveTeam,
    retrieveTeamByLeague,
    addTeamToLeague,
    retrieveLeaguebyTeam,
    retrieveLeague,
    retrieveTeamByLeague,
    updateLeagueUsers,
    retrieveUserTeams,
    listTeams
}