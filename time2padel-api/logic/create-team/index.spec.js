require('dotenv').config
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const createTeam = require('.')
const { random } = Math
const { database, models: { Team, User } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')

describe('logic - create team', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let title, wins, loses, status, id1, id2, username

    beforeEach(async () => {
        await Promise.all([Team.deleteMany(), User.deleteMany()])
        
        const p1 = await User.create({username : `a-${random()}`, email : `email1-${random()}@mail.com` })
        const p2 = await User.create({username : `b-${random()}`, email : `email1-${random()}@mail.com` })
        title = `title-${random()}`
        id1 = p1.id
        username = p2.username
        wins = `wins-${random()}`
        loses = `loses-${random()}`
        status = 'PENDING'
    })

    it('should succeed on correct team data', async () => { 
        
        let player1 = await User.findById(id1)
        let player2 = await User.findOne( { username } )

        const teamId = await createTeam(id1, username, title) 
        expect(teamId).not.to.exist
        // expect(leagueId).to.have.length.greaterThan(0)
        
        const team = await Team.findOne( { title, player1, player2 } )
        
        expect(team).to.exist
        expect(team.title).to.equal(title)
        expect(team.player1.toString()).to.equal(player1.id)
        expect(team.player2.toString()).to.equal(player2.id)

    })

    it('should fail on already existing team', async () => {
        let player1 = await User.findById(id1)
        let player2 = await User.findOne( { username } )
        const _team = await Team.create({ title, player1, player2, wins, loses, status })
        try {
            await createTeam(id1, username, title)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).to.exist

            expect(error.message).to.exist
            expect(typeof error.message).to.equal('string')
            expect(error.message.length).to.be.greaterThan(0)
            expect(error.message).to.equal(`Team ${_team.title} already exists`)
        }
    })

    after(() => Promise.all([Team.deleteMany(), User.deleteMany()]).then(database.disconnect))
})