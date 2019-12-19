require('dotenv').config()
const { env: { DB_URL_TEST } } = process
const { expect } = require('chai')
const deleteTeam = require('.')
const { random, floor } = Math
const { errors: { NotFoundError, ConflictError } } = require('time2padel-util')
const { database, ObjectId, models: { Team, User } } = require('time2padel-data')

describe('logic - delete team', () => {
    before(() => database.connect(DB_URL_TEST))
    
    let title, player1, player2, wins, loses, status, index, statuses
    statuses = ['ACCEPTED', 'DENNIED']
    index = floor(random()* 2)

    beforeEach(async () => {
        const p1 = await User.create({username : `username1-${random()}`, email : `email1-${random()}@mail.com` })
        const p2 = await User.create({username : `username2-${random()}`, email : `email1-${random()}@mail.com` })
        title = `title-${random()}`
        player1 = p1.id
        player2 = p2.id
        wins = `wins-${random()}`
        loses = `loses-${random()}`
        status = statuses[index]

        await Promise.all([Team.deleteMany(), User.deleteMany()])

        const team = await Team.create({ title, player1, player2, wins, loses, status })
        id = team.id
    })

    it('should succeed on correct data', async () => {
        await deleteTeam(id)

        const team = await Team.findById(id)

        expect(team).not.to.exist
      
    })


    it('should fail on wrong league id or not existing', async () => {
        const id = '012345678901234567890123'

        try {
            await deleteTeam(id)
            throw Error('should not reach this point')

        } catch (error) {
            expect(error).to.exist
            expect(error).to.be.an.instanceOf(NotFoundError)
            expect(error.message).to.equal(`team not exist`)
        }
    })

    after(() => Promise.all([Team.deleteMany(), User.deleteMany()]).then(database.disconnect))
})

    