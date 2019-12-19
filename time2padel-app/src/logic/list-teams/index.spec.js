const { env: { REACT_APP_TEST_DB_URL: TEST_DB_URL, REACT_APP_TEST_SECRET: TEST_SECRET } } = process
const listTeams = require('.')
const { random, floor } = Math
const { database, ObjectId, models: { User, Team } } = require('time2padel-data')
const jwt = require('jsonwebtoken')
const { errors: { ContentError } } = require('time2padel-util')

describe('logic - list teams', () => {
    beforeAll(() => database.connect(TEST_DB_URL))

    let id, token, name, surname, email, username, password, teamIds, titles, player1s, player2s, winsTotal, losesTotal
    
    beforeEach(async () => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        username = `username-${random()}`
        password = `password-${random()}`

        await Promise.all([Team.deleteMany(), User.deleteMany()])

        const user = await User.create({ name, surname, email, username, password })
        id = user.id

        token = jwt.sign({ sub:id }, TEST_SECRET)

        teamIds = []
        titles = []
        player1s = []
        player2s = []
        winsTotal = []
        losesTotal = []

        const insertions = []

        for (let i = 0; i < 3; i++) {
            const team = {
                user: id,
                title : `title-${random()}`,
                player1 : user.id,
                player2 : user.id,
                wins : `wins-${random()}`,
                loses : `loses-${random()}`
            }

            // const {user, title, player1, player2, wins, loses} = team

            insertions.push(Team.create(team).then(team => teamIds.push(team.id)))

            titles.push(team.title)
            winsTotal.push(team.wins)
            losesTotal.push(team.loses)

        }

        for (let i = 0; i < 3; i++)
            insertions.push(Team.create({
                user : ObjectId(),
                title : `title-${random()}`,
                player1 : user.id,
                player2 : user.id,
                wins : `wins-${random()}`,
                loses : `loses-${random()}`
            }))

        await Promise.all(insertions)
    })

    it('should succeed on correct user and team data', async () => { 
        const teams = await listTeams(token)

        expect(teams).toBeDefined()

        teams.forEach(team => { 
            expect(team.id).toBeDefined()
            expect(typeof(team.id)).toBe('string')

            expect(team.title).toBeDefined()
            expect(typeof(team.title)).toBe('string')

            expect(team.player1).toBeDefined()
            expect(team.player2).toBeDefined()

            expect(team.wins).toBeDefined()
            expect(typeof(team.wins)).toBe('string')

            expect(team.loses).toBeDefined()
            expect(typeof(team.loses)).toBe('string')
        })
    })

    afterAll(() => Promise.all([User.deleteMany(), Team.deleteMany()]).then(database.disconnect))
})