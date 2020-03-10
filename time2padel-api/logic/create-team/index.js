const { validate, errors: { NotFoundError, ConflictError } } = require('time2padel-util')
const { models: { User, Team } } = require('time2padel-data')

/**
 * It calls the API to verificate if the team already exists or not. If not, it generates a new one
 * with status PENDING.
 * 
 * @param {string} id, user's id
 * @param {string} username, username of the user you want to play with
 * @param {title} title, team title
 * 
 */

export default function (id, username, title) {
    validate.string(id)
    validate.string.notVoid('id', id)

    validate.string(username)
    validate.string.notVoid('username', username)

    validate.string(title)
    validate.string.notVoid('title', title)


    return (async () => { 
            let player1 = await User.findById(id)
            if(!player1) throw new NotFoundError(`player1 with username ${username} does not exist`)
            const player1Id = player1._id

            let player2 = await User.findOne( { username } )
            if(player1 === player2) throw new ConflictError(`player ${player2} already exists`)
            if(!player2) throw new NotFoundError(`player2 with username ${username} does not exist`)
            const player2Id = player2._id
        
            const retrievedTeam = await Team.findOne({ title, player1: player1Id, player2: player2Id })
            if (retrievedTeam) throw new ConflictError(`Team ${retrievedTeam.title} already exists`)
            const team = await Team.create({ title, player1: player1Id, player2: player2Id, status: 'PENDING' }) 
            
            const player1Teams = player1.teams.indexOf(player1Id)
            const player2Teams = player2.teams.indexOf(player2Id)
            
            if (player1Teams === -1) {
                player1.teams.push(team.id)
            } else {
                player1.teams.splice(player1Teams, 1)
            }
            await player1.save()

            if (player2Teams === -1) {
                player2.teams.push(team.id)
            } else {
                player2.teams.splice(player2Teams, 1)
            }
            await player2.save() 

    })()
}