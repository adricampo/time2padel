require('dotenv').config
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const updateTeam = require('.')
const { random, floor } = Math
const { database, models: { Team, User } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')

describe('logic - update team', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let title, wins, loses, status, id1, id2, username
    

    beforeEach(async () => {
        const p1 = await User.create({username : `a-${random()}`, email : `email1-${random()}@mail.com` })
        const p2 = await User.create({username : `b-${random()}`, email : `email1-${random()}@mail.com` })
        title = `title-${random()}`
        player1 = p1.id
        player2 = p2.id
        wins = `wins-${random()}`
        loses = `loses-${random()}`
        status = 'PENDING'

        await Promise.all([Team.deleteMany(), User.deleteMany()])

        const team = await Team.create({ title, player1, player2, wins, loses, status })
        teamId = team.id

        const user = await User.create({username})
        id = user.id
    })

    it('should succeed if answer is true(ACCEPTED)', async () => {
        let user = await User.findById(id)
        let team = await Team.findById(teamId)
        const answer = "true"
        
        let teamOk = await updateTeam(user.id, team.id, answer)
    
        expect(teamOk.status).to.be.equal('ACCEPTED')

    })

    it('should succeed if answer is false(DENNIED)', async () => {
        let user = await User.findById(id)
        let team = await Team.findById(teamId)
        const answer = "false" 
        
        const teamOk = await updateTeam(user.id, team.id, answer)
    
        expect(teamOk.status).to.be.equal('DENNIED')

    })

    after(() => Promise.all([Team.deleteMany(), User.deleteMany()]).then(database.disconnect))
})