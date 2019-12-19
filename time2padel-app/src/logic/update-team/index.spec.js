const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const updateTeam = require('.')
const { random, floor } = Math
const { database, models: { Team, User } } = require('time2padel-data')
const { errors: { ContentError } } = require('time2padel-util')
const jwt = require('jsonwebtoken')

describe('logic - update team', () => {
    beforeAll(() => database.connect(TEST_DB_URL))
    
    let id, teamId, token, title, wins, loses, status, player1, player2, username
    

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

    })
    
    it('should succeed if answer is true(ACCEPTED)', async () => {
        const team = await Team.create({ title, player1, player2, wins, loses, status })
        teamId = team.id
    
        const user = await User.create({username})
        id = user.id
        token = jwt.sign({ sub:id }, TEST_SECRET) 
        
        const answer = "true"

        await updateTeam(token, teamId, answer)

        const team2 = await Team.findById(teamId)
        
        expect(team2.status).toBe('ACCEPTED')

    })

    it('should succeed if answer is false(DENNIED)', async () => {
        const team = await Team.create({ title, player1, player2, wins, loses, status })
        teamId = team.id
    
        const user = await User.create({username})
        id = user.id
        token = jwt.sign({ sub:id }, TEST_SECRET) 

        const answer = "false" 

        await updateTeam(token, teamId, answer)

        const team3 = await Team.findById(teamId)
        
        expect(team3.status).toBe('DENNIED')

    })

    afterAll(() => Promise.all([Team.deleteMany(), User.deleteMany()]).then(database.disconnect))
})