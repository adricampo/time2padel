const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const createTeam = require('.')
const { random } = Math
const { database, models: { Team, User } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')
const jwt = require('jsonwebtoken')
require('../../helpers/jest-matchers')

describe('logic - create team', () => {
    beforeAll(() => database.connect(TEST_DB_URL))
    
    let title, wins, loses, status, id1, token, username

    beforeEach(async () => {
        await Promise.all([Team.deleteMany(), User.deleteMany()])
        
        const p1 = await User.create({username : `a-${random()}`, email : `email1-${random()}@mail.com` })
        const p2 = await User.create({username : `b-${random()}`, email : `email1-${random()}@mail.com` })
        title = `title-${random()}`
        id1 = p1.id
        token = jwt.sign({ sub:id1 }, TEST_SECRET) 
        username = p2.username
        wins = `wins-${random()}`
        loses = `loses-${random()}`
        status = 'PENDING'
    })

    it('should succeed on correct team data', async () => { 
        
        let player1 = await User.findById(id1)
        let player2 = await User.findOne( { username } )

        const teamId = await createTeam(token, username, title) 
        expect(teamId).toBeUndefined()
        // expect(leagueId).to.have.length.greaterThan(0)
        
        const team = await Team.findOne( { title, player1, player2 } )
        
        expect(team).toBeDefined()
        expect(team.title).toBe(title)
        expect(team.player1.toString()).toBe(player1.id)
        expect(team.player2.toString()).toBe(player2.id)

    })

    it('should fail on already existing team', async () => {
        let player1 = await User.findById(id1)
        let player2 = await User.findOne( { username } )
        const _team = await Team.create({ title, player1, player2, wins, loses, status })
        try {
            await createTeam(token, player2.username, title)

            throw Error('should not reach this point')
        } catch (error) {
            expect(error).toBeDefined()

            expect(error.message).toBeDefined()
            expect(typeof error.message).toBe('string')
            expect(error.message.length).toBeGreaterThan(0)
            expect(error.message).toBe(`Team ${_team.title} already exists`)
        }
    })

    afterAll(() => Promise.all([Team.deleteMany(), User.deleteMany()]).then(database.disconnect))
})